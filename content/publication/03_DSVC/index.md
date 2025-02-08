---
title: "Dual Social View Enhanced Contrastive Learning for Social Recommendation"
authors:
  - Shixiao Yang
  - "Zhida Qin*"
  - admin
  - Pengzhan Zhou
  - Tianyu Huang

# Author notes (optional)
author_notes:
  - ''
  - 'Corresponding Author'
  - ''
  - ''
  - ''
date: '2024-12-31'
doi: '10.1109/TCSS.2024.3496774'

# Schedule page publish date (NOT publication's date).
publishDate: '2025-01-19'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: In **IEEE Transactions on Computational Social Systems**
publication_short: In **TCSS**

abstract: 'Social recommendation (SocialRS), which utilizes user social information to improve recommendation performance, has received increasing attention. Graph neural networks (GNNs) facilitate the integration of both user preference and social features in SocialRS. However, existing techniques face two challenges: i) the inherent sparse supervision signals and noise issues in real-world social networks; ii) current social recommendation methods suffer from the neglect of user preference and social attribute heterogeneity, which hinders the extraction of preference-related information from social networks. Taking inspiration from social enhancement and contrastive learning methods, we propose a social recommendation model DSVC based on dual social view contrastive learning. Specifically, in response to the first challenge, our model derives the consistency factors of users in different augmented social views, which are used to highlight noise-resistant users and jettison preference-independent social relationships in social views. To address the second challenge, we adopt probability vectors generated from consistency factors. These vectors guide the cross-view augmentation process of the interaction graph, which helps supplement social self-supervised signals and effectively avoid noise retained due to indiscriminate augmentation. The baseline model comparison experiment, ablation experiment, parameter adjustment experiment and robustness experiment conducted on three different real-world datasets consistently validated the effectiveness of our model in improving recommendation performance.'

# Summary. An optional shortened abstract.
#summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

tags:
  - Graph Neural Network
  - Contrastive Learning
  - Recommendation System

# links:
# - name: ""
#   url: ""
url_pdf: ''
url_code: 'https://ieeexplore.ieee.org/abstract/document/10769506/'
url_dataset: 'https://ieeexplore.ieee.org/abstract/document/10769506/'
url_poster: 'https://ieeexplore.ieee.org/abstract/document/10769506/'
url_project: 'https://ieeexplore.ieee.org/abstract/document/10769506/'
url_slides: 'https://ieeexplore.ieee.org/abstract/document/10769506/'
url_source: 'https://ieeexplore.ieee.org/abstract/document/10769506/'
url_video: 'https://ieeexplore.ieee.org/abstract/document/10769506/'

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

