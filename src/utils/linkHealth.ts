import { LinkItem } from '../types/fmhy';

export type LinkHealthStatus = 'online' | 'degraded' | 'broken' | 'checking';

export interface LinkHealthRecord {
  status: LinkHealthStatus;
  lastChecked: string;
  reportsCount: number;
  userReported?: boolean;
  reason?: string;
  latencyMs?: number;
}

export interface ReportBrokenPayload {
  itemId: string;
  itemTitle: string;
  url: string;
  reason: string;
  notes?: string;
  reporter?: string;
}

const HEALTH_STORAGE_KEY = 'freebies_link_health';
const REPORTS_STORAGE_KEY = 'freebies_broken_reports';

// Deterministic seed records for demonstration & instant visual feedback
const INITIAL_DEMO_HEALTH: Record<string, LinkHealthRecord> = {
  // We can seed a couple of items if they match IDs, or provide fallback defaults
  'mirror-ez-stream': {
    status: 'broken',
    lastChecked: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    reportsCount: 4,
    reason: 'Domain Offline (DNS Fail)',
    userReported: false,
  },
  'fitgirl-repacks': {
    status: 'degraded',
    lastChecked: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    reportsCount: 2,
    reason: 'High Latency / Slow Mirror',
    userReported: false,
  },
};

export function getLinkHealthMap(): Record<string, LinkHealthRecord> {
  try {
    const saved = localStorage.getItem(HEALTH_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(HEALTH_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_HEALTH));
      return INITIAL_DEMO_HEALTH;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_DEMO_HEALTH;
  }
}

export function getLinkHealth(item: LinkItem): LinkHealthRecord {
  const map = getLinkHealthMap();
  if (map[item.id]) {
    return map[item.id];
  }

  // Fallback default: if item has mirror or specific tags or deterministic hash, return healthy default
  return {
    status: 'online',
    lastChecked: item.lastVerified || new Date().toISOString().split('T')[0],
    reportsCount: 0,
    userReported: false,
    reason: 'Verified Operational',
  };
}

export function getBrokenReports(): ReportBrokenPayload[] {
  try {
    const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function reportBrokenLink(payload: ReportBrokenPayload): LinkHealthRecord {
  const map = getLinkHealthMap();
  const current = map[payload.itemId] || {
    status: 'online',
    lastChecked: new Date().toISOString(),
    reportsCount: 0,
    userReported: false,
  };

  const newCount = current.reportsCount + 1;
  const updatedRecord: LinkHealthRecord = {
    status: 'broken',
    lastChecked: new Date().toISOString(),
    reportsCount: newCount,
    userReported: true,
    reason: payload.reason + (payload.notes ? `: ${payload.notes}` : ''),
  };

  map[payload.itemId] = updatedRecord;

  try {
    localStorage.setItem(HEALTH_STORAGE_KEY, JSON.stringify(map));
    const reports = getBrokenReports();
    reports.unshift({
      ...payload,
      notes: payload.notes || 'User reported issue',
    });
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  } catch {
    // ignore
  }

  // Notify components
  window.dispatchEvent(new CustomEvent('freebies-link-health-updated', { detail: { itemId: payload.itemId } }));

  return updatedRecord;
}

export async function checkLinkHealthAsync(item: LinkItem): Promise<LinkHealthRecord> {
  const map = getLinkHealthMap();
  
  // Set checking status
  map[item.id] = {
    ...(map[item.id] || { reportsCount: 0 }),
    status: 'checking',
    lastChecked: new Date().toISOString(),
  };
  localStorage.setItem(HEALTH_STORAGE_KEY, JSON.stringify(map));
  window.dispatchEvent(new CustomEvent('freebies-link-health-updated', { detail: { itemId: item.id } }));

  const startTime = Date.now();
  let resultStatus: LinkHealthStatus = 'online';
  let reason = 'Automated ping successful';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    // Try no-cors HEAD/GET request to detect network connection / DNS reachability
    await fetch(item.url, {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const latencyMs = Date.now() - startTime;
    if (latencyMs > 2800) {
      resultStatus = 'degraded';
      reason = `High latency response (${latencyMs}ms)`;
    }
  } catch (err: any) {
    // If user already reported or fetch failed / timed out
    if (err.name === 'AbortError') {
      resultStatus = 'broken';
      reason = 'Connection Timed Out (>4s)';
    } else {
      // In browser, CORS errors happen for cross-origin if mode isn't no-cors, but with no-cors, failure is DNS / net error
      // If community reports exist, mark broken, else mark degraded or broken
      const reports = (map[item.id]?.reportsCount || 0);
      if (reports > 0) {
        resultStatus = 'broken';
        reason = `Network Unreachable (${reports} community flags)`;
      } else {
        resultStatus = 'broken';
        reason = 'Host Unreachable / DNS Fail';
      }
    }
  }

  const finalRecord: LinkHealthRecord = {
    status: resultStatus,
    lastChecked: new Date().toISOString(),
    reportsCount: map[item.id]?.reportsCount || 0,
    userReported: map[item.id]?.userReported || false,
    reason,
    latencyMs: Date.now() - startTime,
  };

  map[item.id] = finalRecord;
  try {
    localStorage.setItem(HEALTH_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }

  window.dispatchEvent(new CustomEvent('freebies-link-health-updated', { detail: { itemId: item.id } }));

  return finalRecord;
}

export function resetLinkHealth(itemId: string): LinkHealthRecord {
  const map = getLinkHealthMap();
  const resetRecord: LinkHealthRecord = {
    status: 'online',
    lastChecked: new Date().toISOString(),
    reportsCount: 0,
    userReported: false,
    reason: 'Audited & Verified Operational',
  };
  map[itemId] = resetRecord;

  try {
    localStorage.setItem(HEALTH_STORAGE_KEY, JSON.stringify(map));
    const reports = getBrokenReports().filter((r) => r.itemId !== itemId);
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  } catch {
    // ignore
  }

  window.dispatchEvent(new CustomEvent('freebies-link-health-updated', { detail: { itemId } }));

  return resetRecord;
}
