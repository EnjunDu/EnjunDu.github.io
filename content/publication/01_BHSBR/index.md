---
title: "Behavior Habits Enhanced Intention Learning for Session Based Recommendation"
authors:
  - Wenhao Xue
  - "Zhida Qin*"
  - Haoyao Zhang
  - Shixiao Yang
  - admin
  - Shuang Li
  - Haoyan Fu
  - Tianyu Huang
  - Iohn C.S. Lui

# Author notes (optional)
author_notes:
  - ''
  - 'Corresponding Author'
  - ''
  - ''
  - ''
  - ''
  - ''
  - ''
  - ''
date: '2024-12-28'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2025-01-18'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: In **IEEE Transactions on Big Data**
publication_short: In **TBD**

abstract: >
  Multi-behavior Session Based Recommendations (MBSBRs) have achieved remarkable results due to considering behavioral heterogeneity in sessions. Yet most existing works only consider binary or continuous behavior dependencies and aim to predict the next item under the target behavior, neglecting users' inherent behavior habits, resulting in learning inaccurate intentions. To tackle the above issues, we propose a novel Behavior Habits Enhanced Intention Learning framework for Session Based Recommendation (BHSBR) framework. Specifically, we focus on the next item recommendation and design a global item transition graph to learn the behavior-aware semantic relationships between items, in order to mine the underlying similarity between items beyond the session. In addition, we construct a hypergraph to extract the diverse behavior habits of users and break through the limitations of temporal relationships in the session. Compared to the existing works, our behavior habit learning method learns behavior dependencies at the user level, which could capture the user's more accurate long-term intentions and reduce the impact of noise behaviors. Extensive experiments on three datasets demonstrate that the performance of our proposed BHSBR is superior to SOTA. Further ablation experiments fully illustrate the effectiveness of our various modules.

# Summary. An optional shortened abstract.
#summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

tags:
  - Graph Neural Network
  - Recommendation System

# links:
# - name: ""
#   url: ""
url_pdf: 'https://enjundu.com/publication/01_bhsbr/BHSBR.pdf'
url_code: 'https://github.com/EnjunDu/BHSBR'
url_dataset: 'https://github.com/EnjunDu/BHSBR/tree/main/data'
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/jdD8gXaTZsc)'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---

{{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

