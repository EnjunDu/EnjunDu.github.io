# Enjun Du's Personal Homepage

I use [Hugo Academic CV Theme](https://github.com/HugoBlox/theme-academic-cv) as my personal homepage, and using [map](https://clustrmaps.com/) to record my visitors.

## Private Working Agents preview

`/blog/working_agents/` is an unlisted, encrypted static preview. Its public
directory contains only the password screen, `unlock.js`, and authenticated
ciphertext files. The figures, fonts, styles, and original page are inside the
password-encrypted preview bundle; the manuscript is a separate encrypted file
downloaded only when a reader opens a paper link. Its random decryption key is
inside the password-encrypted bundle. Decrypted assets use browser-local Blob URLs.
The previous monolithic bundle is retained for browsers with the older loader.
The page is excluded from indexing, and no password is stored by the page.

Keep plaintext inputs and passwords outside this repository. To update the bundle,
run `scripts/encrypt-private-preview.mjs` locally with `--html`, `--assets`, and
`--output static/blog/working_agents/encrypted-preview.bin`, plus `--defer-pdf`.
Keep the generated `encrypted-document-*.bin` beside the preview bundle.
It generates a strong password unless `--password-stdin` is used.
Never run the packager in public CI or commit its password output. After changing
the bundle, increment the payload query version in `unlock.js` and the script query
version in `index.html` to refresh CDN caches. This preview has no public blog entry.
Only encrypted files are cached. Download progress, stalled-download retries,
and distinct network/password errors are shown on the password screen.

## Travelling pages

The unlisted travel directory lives at `/travelling/`. Its standalone pages are
under `static/travelling/`: `Australia/` contains the existing travel handbook and
`ToHKU/` contains the daily HKU commute. The directory and commute page share
`static/travelling/travel.css`.

When adding a handbook, add its card to `static/travelling/index.html`, update the
entry count, and include a return link to `/travelling/`. Keep the `noindex,
nofollow, noarchive` robots metadata and `data-pagefind-ignore="all"` attributes on
both the HTML and body elements of every page. These static pages stay outside
Hugo's sitemap, feeds, and public navigation. Do not disallow their crawling in
robots.txt: search engines need to read the `noindex` directive.

This is an unlisted section, not authenticated access: anyone with a URL can open
it. Commute times and fares are reference values; official sources are linked on
the page. The outbound route uses B2P and MTR; the return route uses MTR to
Sheung Wan, then 962X and B3X, with the applicable interchange conditions and
direction-specific stop coordinates.

---

## How to Add New News Items

News items are stored in **`data/news.yaml`**. To add a new news item, simply open this file and add a new entry **at the TOP** of the `news:` list.

### Template

```yaml
  - date: "[Mon. Year]"
    content: "Your news text here"
    highlight: "Optional pink bold text"
    link_text: "Optional clickable text"
    link_url: "https://optional-link"
    extra: "Optional text after the highlight"
    highlight2: "Optional second highlight"
```

### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `date` | Yes | Date prefix, e.g., `"[May. 2026]"` |
| `content` | No | Main text content (supports **bold** markdown) |
| `highlight` | No | Pink bold highlighted text |
| `link_text` | No | Clickable link text (requires `link_url`) |
| `link_url` | No | URL for the link |
| `extra` | No | Additional text after the highlight |
| `highlight2` | No | Second pink bold highlighted text |

### Examples

**Simple award news:**
```yaml
  - date: "[Oct. 2026]"
    content: "I received the"
    highlight: "Best Paper Award"
    extra: "at NeurIPS 2026!"
```

**Paper acceptance with link:**
```yaml
  - date: "[Jun. 2026]"
    link_text: "MyPaper"
    link_url: "https://arxiv.org/abs/xxxx.xxxxx"
    content: "accepted by"
    highlight: "ICML 2026"
    extra: ", thanks to all co-authors!"
```

**Simple text announcement:**
```yaml
  - date: "[Sep. 2026]"
    content: "I started my Ph.D. at HKU. Excited for the journey ahead!"
```

---

## How to Add New Patents

Patents are stored in **`data/patents.yaml`**. To add a new patent, simply open this file and add a new entry to the `patents:` list.

### Template

```yaml
  - title: "Your Patent Title"
    authors: "Author1, **Your Name**, Author2"
    note: "Optional note (e.g., patent number, date)"
    url: "https://optional-link-to-patent"
```

### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The patent title |
| `authors` | Yes | Author list (use `**Name**` to bold your name) |
| `note` | No | Additional info like patent number and date |
| `url` | No | Link to the patent (title becomes clickable) |

### Configuration

At the top of `data/patents.yaml`, you can change:
```yaml
show_count: 2  # Number of patents shown before "Show more" button
```

### Example

```yaml
  - title: "A Novel Method for Graph Neural Network Optimization"
    authors: "**Enjun Du**, Yongqi Zhang, Xinyu Zuo"
    note: "Chinese National Invention Patent, CN12345678A, published June 2026."
    url: "https://patents.google.com/patent/CN12345678A/en"
```

---

## Project Structure

```
homepage/
├── content/
│   ├── _index.md              # Main page layout (sections order)
│   ├── authors/admin/_index.md # Bio, education, awards, skills
│   ├── publication/           # Paper entries (one folder each)
│   ├── event/                 # Talk entries
│   └── blog/                  # Blog posts
├── data/
│   ├── news.yaml              # News items (edit this to add news)
│   └── patents.yaml           # Patent entries (edit this to add patents)
├── layouts/
│   ├── partials/blox/patents.html    # Patents rendering template
│   ├── shortcodes/news-list.html     # News rendering template
│   └── partials/hooks/body-end/      # JS for publications toggle
├── assets/media/              # Images and icons
├── config/                    # Hugo configuration
└── static/                    # Static files (uploads, etc.)
```

## Quick Tips

- **Add a publication**: Create a new folder under `content/publication/` with an `index.md` file
- **Add a talk**: Create a new folder under `content/event/` with an `index.md`
- **Change bio**: Edit `content/authors/admin/_index.md`
- **Change section order**: Edit the `sections:` list in `content/_index.md`

## How to modify logos

```
layouts/partials/hooks/head-end/github-button.html
```



```
var logoMap = {
  "Project Up": "/images/logos/tencent_project_up.png",
  "YuanBao": "/images/logos/yuanbao.png",
  "Tencent": "/images/logos/tencent.png",
  "Beijing Institute": "/images/logos/bit.png",
  "Hong Kong University": "/images/logos/hkust-gz.svg",
  "HKUST": "/images/logos/hkust-gz.svg"
};
```

