---
title: "Causal Disentanglement-Enhanced Diffusion Denoising for Social Recommendation"
authors:
  - Shixiao Yang
  - "Zhida Qin*"
  - admin
  - Haoyan Fu
  - Haoyao Zhang
  - Pengzhan Zhou
  - Tianyu Huang
  - Gangyi Ding

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
date: '2024-12-31'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2025-01-19'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: In **IEEE Transactions on Intelligent Systems and Technology**
publication_short: In **TIST**

abstract: 'In recent years, social recommendation systems have emerged as a pivotal technology for enhancing recommendation accuracy by leveraging user social homophily and influence. Despite that lots of works have been devoted to this area, existing works still struggle to extract the beneficial structural information from social relationships that is beneficial for recommendations and neglect the inherent popularity bias in the social networks, which leads to suboptimal recommendation performances. To address these challenges, we propose a novel framework termed Causal Disentanglement-Enhanced Diffusion Denoising for Social Recommendation (CaDDiSR). This framework first employs causal graphs to disentangle the complexities of social relationships, generating user representations with high-order structures, which are subsequently used as inputs to a diffusion process to effectively denoise social networks and retain social signals beneficial for recommendation tasks. Furthermore, the framework integrates a bidirectional knowledge distillation mechanism, which balances user representations between social and recommendation contexts, thereby facilitating the effective fusion of their respective advantages while simultaneously mitigating noise interference and enhancing overall system performance. Finally, cross-domain contrastive learning is utilized to optimize user and item representations, ensuring consistency in recommendation performance across diverse scenarios. Experimental results on multiple real-world datasets demonstrate that CaDDiSR significantly outperforms existing baseline models, substantiating its superior performance.'

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
url_code: 'https://github.com/EnjunDu/CaDDiSR'
url_dataset: ''
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

