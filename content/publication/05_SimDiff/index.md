---
title: 'SimDiff: A Simple yet Efficient Diffusion-based Collaborative Filtering Framework'

authors:
  - Xufeng Liang
  - "Zhida Qin*"
  - Haoyan Fu
  - admin
  - Haotian He
  - Tianyu Huang
  - Chong Zhang

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

publishDate: '2025-01-19'

publication_types: ['paper-conference']

publication: 
publication_short: 

abstract: >-
  Diffusion models have demonstrated promising potential in recommender systems owing to its powerful generative ability. However, due to the inherent sparse nature of real-world recommendation data, existing works suffer two issues: (1) Randomly sampled Gaussian noise addition tends to obscure original user preferences. (2) Relying on static recovery targets with insufficient interaction patterns constrains the model's learning effectiveness and generative ability. To address these issues, we propose SimDiff, a simple and novel diffusion-based recommendation framework. For the first issue, instead of using random Gaussian noise, we leverages rich semantic information by incorporating auxiliary signals from text or image modalities to enhance the input data of denoising model. In response to the second issue, we build a dynamic learning target that iteratively updates throughout the training process, enabling richer information capture. A dual-objective collaborative training strategy is designed to simultaneously optimize reconstruction and BPR losses, which coordinated by a dual-objective balance term. Additionally, we employ multiple GCN layers only during inference to incorporate higher-order co-occurrence information while maintaining training efficiency. Extensive experiments on five real-world datasets demonstrate that SimDiff significantly outperforms state-of-the-art methods. Our SimDiff offers a simple yet effective solution for enhancing recommendation performance and suggests a novel paradigm for applying diffusion method in recommender system.

tags:
  - Collaborative Filtering
  - Generative Recommender Model
  - Diffusion Model
  - Recommendation System

featured: false

url_pdf: 'https://enjundu.com/publication/05_simdiff/SimDiff.pdf'
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
  focal_point: ''
  preview_only: false

projects: []

slides: ""
---

{{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

