---
title: 'SimDiff: A Simple yet Efficient Diffusion-based Collaborative Filtering Framework'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - Xufeng Liang
  - Zhida Qin⋆
  - Haoyan Fu
  - admin
  - Haotian He
  - Tianyu Huang
  - Chong Zhang

# Author notes (optional)
author_notes:
  - ''
  - 'Corresponding Author'
  - ''
  - ''
  - ''
  - ''
  - ''

date: ''
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2025-01-19'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *ACM Special Interest Group on Information Retrieval*
publication_short: In *SIGIR*

abstract: Diffusion models have demonstrated promising potential in recommender systems owing to its powerful generative ability. However, due to the inherent sparse nature of real-world recommendation data, existing works suffer two issues: 1) Randomly sampled Gaussian noise addition tends to obscure original user preferences. 2) Relying on static recovery targets with insufficient interaction patterns constrains the model's learning effectiveness and generative ability. To address these issues, we propose SimDiff, a simple and novel diffusion-based recommendation framework. For the first issue, instead of using random Gaussian noise, we leverages rich semantic information by incorporating auxiliary signals from text or image modalities to enhance the input data of denoising model. In response to the second issue, we build a dynamic learning target that iteratively updates throughout the training process, enabling richer information capture. A dual-objective collaborative training strategy is designed to simultaneously optimize reconstruction and BPR losses, which coordinated by a dual-objective balance term. Additionally, we employ multiple GCN layers only during inference to incorporate higher-order co-occurrence information while maintaining training efficiency. Extensive experiments on five real-world datasets demonstrate that SimDiff significantly outperforms state-of-the-art methods. Our SimDiff offers a simple yet effective solution for enhancing recommendation performance and suggests a novel paradigm for applying diffusion method in recommender system.

# Summary. An optional shortened abstract.
#summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

tags:
  - Collaborative Filtering
  - Generative Recommender Model
  - Diffusion Model
  - Recommendation System

# Display this page in the Featured widget?
featured: false

# Custom links (uncomment lines below)
# links:
# - name: Custom Link
#   url: http://example.org

url_pdf: ''
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
  focal_point: ''
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
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}
