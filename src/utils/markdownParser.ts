import { Category, SubCategory, LinkItem } from '../types/fmhy';

/**
 * Parses raw Markdown content (such as data/streaming.md) into structured SubCategories and LinkItems
 * allowing any edits made in markdown files to dynamically render in the site's card UI.
 */
export function parseMarkdownToCategories(
  categorySlug: string,
  categoryName: string,
  markdownText: string
): SubCategory[] {
  if (!markdownText || !markdownText.trim()) return [];

  const subcategories: SubCategory[] = [];
  let currentSubCatName = 'General Directory';
  let currentSubCatId = `${categorySlug}-gen`;
  let currentItems: LinkItem[] = [];

  const lines = markdownText.split('\n');

  const createSubCategory = (name: string, items: LinkItem[]): SubCategory => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      id: `${categorySlug}-${slug}`,
      name: name.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\s]+/u, '').trim() || name,
      description: `Curated resources for ${name}`,
      items: items,
    };
  };

  const pushCurrentSection = () => {
    if (currentItems.length > 0) {
      subcategories.push(createSubCategory(currentSubCatName, [...currentItems]));
      currentItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for Section Heading (## 📺 High Definition Movies & TV Shows)
    if (line.startsWith('## ')) {
      pushCurrentSection();
      const headingTitle = line.replace(/^##\s+/, '').trim();
      currentSubCatName = headingTitle;
      currentSubCatId = `${categorySlug}-${headingTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      continue;
    }

    // Check for Table Row
    if (line.startsWith('|') && line.endsWith('|')) {
      // Ignore header separator row like | :--- | :--- |
      if (line.includes('---')) continue;

      const cells = line.split('|').map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

      // Need at least name and URL cells
      if (cells.length >= 2) {
        const rawNameCell = cells[0];
        const rawUrlCell = cells[1];
        
        // Extract Title from **Title** or [Title](url)
        const nameMatch = rawNameCell.match(/\*\*([^*]+)\*\*/) || rawNameCell.match(/\[([^\]]+)\]/);
        const title = nameMatch ? nameMatch[1] : rawNameCell.replace(/[*_`]/g, '').trim();

        // Extract URL
        const urlMatch = rawUrlCell.match(/\((https?:\/\/[^)]+)\)/) || rawUrlCell.match(/\[([^\]]+)\]/) || [null, rawUrlCell];
        let url = urlMatch[1] || rawUrlCell.trim();
        if (url && !url.startsWith('http')) {
          url = `https://${url}`;
        }

        // Ignore header row names like "Platform Name", "Application", "Tool Name"
        if (title.toLowerCase().includes('name') || title.toLowerCase().includes('application') || title.toLowerCase().includes('emulator')) {
          continue;
        }

        if (title && url && url.startsWith('http')) {
          const qualityOrType = cells[2] || '';
          const regCell = cells[3] || '';
          const featureDesc = cells.slice(4).join(' ') || cells[2] || 'Verified directory resource';

          const isStarred = line.toLowerCase().includes('top') || line.includes('⭐') || line.toLowerCase().includes('gold') || i < 15;
          const isNoReg = regCell.includes('❌') || regCell.toLowerCase().includes('not needed') || regCell.toLowerCase().includes('free');

          const tags: string[] = [categoryName];
          if (qualityOrType && !qualityOrType.includes('❌')) tags.push(qualityOrType.replace(/[*_]/g, ''));
          if (isNoReg) tags.push('No Reg');

          const newItem: LinkItem = {
            id: `md-${categorySlug}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            title: title,
            url: url,
            description: featureDesc.replace(/[*_]/g, '').trim(),
            category: categorySlug,
            subcategory: currentSubCatId,
            tags: tags,
            isStarred: isStarred,
            isOpenSource: line.toLowerCase().includes('open source') || line.toLowerCase().includes('gpl'),
            isNoAds: line.toLowerCase().includes('zero ads') || line.toLowerCase().includes('ad-free') || line.toLowerCase().includes('no ads'),
            isNoReg: isNoReg,
            safetyRating: 'Safe',
            badge: isStarred ? '⭐ Featured' : undefined,
            lastVerified: new Date().toISOString().slice(0, 7),
            dateAdded: new Date().toISOString().slice(0, 10),
            addedBy: 'markdown-repo',
            githubFile: `data/${categorySlug}.md`
          };

          // Avoid duplicates in current items
          if (!currentItems.some((item) => item.url === newItem.url || item.title === newItem.title)) {
            currentItems.push(newItem);
          }
        }
      }
    }

    // Check for Callout Box (> [!FLIXHQ] or > [!RECOMMENDED])
    if (line.startsWith('> [!') || line.startsWith('> **')) {
      const calloutText = lines.slice(i, i + 6).join(' ');
      const urlMatch = calloutText.match(/\((https?:\/\/[^)]+)\)/);
      const titleMatch = calloutText.match(/\*\*([^*]+)\*\*/);

      if (urlMatch && titleMatch) {
        const title = titleMatch[1];
        const url = urlMatch[1];
        const descMatch = calloutText.match(/is\s+([^<.>]+)/i) || [null, 'Top priority recommended resource with fast mirrors and zero registration.'];
        
        const newItem: LinkItem = {
          id: `md-callout-${categorySlug}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: title,
          url: url,
          description: descMatch[1].trim(),
          category: categorySlug,
          subcategory: currentSubCatId,
          tags: [categoryName, 'Top Priority', 'Verified'],
          isStarred: true,
          isOpenSource: calloutText.toLowerCase().includes('open source'),
          isNoAds: true,
          isNoReg: true,
          safetyRating: 'Safe',
          badge: '⭐ Top Priority',
          lastVerified: new Date().toISOString().slice(0, 7),
          dateAdded: new Date().toISOString().slice(0, 10),
          addedBy: 'markdown-callout',
          githubFile: `data/${categorySlug}.md`
        };

        if (!currentItems.some((item) => item.url === newItem.url || item.title === newItem.title)) {
          currentItems.push(newItem);
        }
      }
    }
  }

  pushCurrentSection();
  return subcategories;
}
