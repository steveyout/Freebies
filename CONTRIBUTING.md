# Contributing to RedDirectory (FMHY Hub) 🚀

Thank you for taking the time to contribute! **RedDirectory** is a community-curated, high-density directory of free software, privacy tools, streaming resources, gaming archives, educational content, and developer platforms.

Whether you're fixing a broken link, suggesting a new tool, or improving descriptions, every contribution helps keep this index clean, safe, and up to date.

---

## 📖 Quick Navigation
- [Link Submission Criteria](#-link-submission-criteria)
- [How to Submit a Link](#-how-to-submit-a-link)
  - [Option A: Via Web Directory Interface (Beginner-Friendly)](#option-a-via-web-directory-interface-beginner-friendly)
  - [Option B: Via GitHub Pull Request (Standard Workflow)](#option-b-via-github-pull-request-standard-workflow)
- [Resource Format Schema](#-resource-format-schema)
- [Contributor Profile Recognition](#-contributor-profile-recognition)
- [Code of Conduct & Safety Standards](#-code-of-conduct--safety-standards)

---

## 🛡️ Link Submission Criteria

Before submitting a new resource, please make sure it satisfies our safety and quality guidelines:

1. **No Malicious Content**: No malware, ransomwares, unwanted bundleware, or phishing sites.
2. **Adblocker Compliance**: If a site contains intrusive ads, popups, or redirect loops, tag its safety rating as `Use Adblock`.
3. **Accurate Description**: Provide a concise 1–2 sentence description highlighting what the tool does.
4. **Appropriate Category**: Assign the resource to the correct category and subcategory.
5. **FOSS / Open Source Tagging**: If the tool is Free & Open Source Software (FOSS), set `isOpenSource: true`.

---

## 📥 How to Submit a Link

### Option A: Via Web Directory Interface (Beginner-Friendly)

1. Open the **RedDirectory Web App**.
2. Click the **GitHub PR** or **Contribute Link** button in the top navigation header.
3. Fill out the interactive submission form:
   - Resource Title (e.g., `uBlock Origin`)
   - Website URL
   - Target Category & Subcategory
   - Description
   - Tags & Safety Rating
   - **Your GitHub Username** (e.g., `octocat`)
4. Click **"Copy Snippet"** or **"Open Issue on GitHub"**.
5. Paste the generated JSON snippet into a new GitHub Issue or Pull Request!

---

### Option B: Via GitHub Pull Request (Standard Workflow)

1. **Fork the Repository**:
   Click the **Fork** button at the top right of this GitHub repository to create your own copy.

2. **Branch Your Changes**:
   Create a descriptive branch for your feature or link addition:
   ```bash
   git checkout -b add-resource/ublock-origin
   ```

3. **Edit Category Data**:
   Navigate to `src/data/fmhyData.ts` (or the relevant markdown/json file) and append your resource entry to the corresponding `items` array.

4. **Commit & Push**:
   ```bash
   git commit -m "feat: add uBlock Origin to adblocking category"
   git push origin add-resource/ublock-origin
   ```

5. **Open a Pull Request**:
   Go to the original repository and click **"New Pull Request"**. Include your GitHub handle in the PR body so your profile gets credited on the site!

---

## 📋 Resource Format Schema

All submitted links follow this standardized JSON schema:

```json
{
  "id": "ublock-origin",
  "title": "uBlock Origin",
  "url": "https://ublockorigin.com/",
  "description": "The gold standard open-source content blocker for Firefox, Chrome, and Edge.",
  "category": "adblocking",
  "subcategory": "browsers-ext",
  "tags": ["Extension", "Open Source", "Adblocker"],
  "safetyRating": "Safe",
  "isOpenSource": true,
  "dateAdded": "2026-07-28",
  "addedBy": "your-github-username"
}
```

### Field Definitions:
- `id` *(string, required)*: Unique slug ID (kebab-case).
- `title` *(string, required)*: Official name of the resource.
- `url` *(string, required)*: Direct canonical URL.
- `description` *(string, required)*: Brief overview of capabilities.
- `category` *(string, required)*: Category ID (e.g., `adblocking`, `software`, `games`, `education`, `streaming`, `tools`).
- `subcategory` *(string, required)*: Subcategory ID.
- `tags` *(array of strings)*: Keyword tags for search indexing.
- `safetyRating` *(string)*: `Safe` | `Use Adblock` | `Requires Registration` | `Torrent` | `Freemium`.
- `isOpenSource` *(boolean)*: Set `true` if source code is publicly hosted and licensed.
- `dateAdded` *(string)*: ISO date (`YYYY-MM-DD`).
- `addedBy` *(string)*: Your GitHub handle (without `@`) for profile credit.

---

## 🏆 Contributor Profile Recognition

When your pull request is merged:
- Your GitHub handle (`addedBy`) is permanently linked to the resource entry.
- You will be featured in the **Top Contributors** leaderboard on the live directory homepage.
- Your total contributed links count will update automatically!

---

## 🤝 Code of Conduct & Review Process

We strive to create a welcoming, collaborative community. Please adhere to these standards:
- Be respectful and constructive in pull request comments and issue discussions.
- Double-check links before submitting to verify they are active and secure.
- Maintainers review pull requests on a daily basis.

Thank you for contributing to **RedDirectory**! Happy indexing! 🎉
