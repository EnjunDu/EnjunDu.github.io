# Enjun Du's Personal Homepage

I use [Hugo Academic CV Theme](https://github.com/HugoBlox/theme-academic-cv) as my personal homepage, and using [map](https://clustrmaps.com/) to record my visitors.

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
