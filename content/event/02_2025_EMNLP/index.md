---
title: EMNLP 2025 Oral

event: EMNLP 2025 Oral Presentation
event_url: https://2025.emnlp.org/

location: Suzhou, China
address:
  street: Suzhou International Expo Center
  city: Suzhou
  region: Jiangsu
  postcode: '215021'
  country: China

summary: |
  Oral presentation at EMNLP 2025 on our paper "Mixture of Length and Pruning Experts for Knowledge Graphs Reasoning".

abstract: 'Knowledge Graph (KG) reasoning, which aims to infer new facts from structured knowledge repositories, plays a vital role in Natural Language Processing (NLP) systems. Its effectiveness critically depends on constructing informative and contextually relevant reasoning paths. However, existing graph neural networks (GNNs) often adopt rigid, query-agnostic path-exploration strategies, limiting their ability to adapt to diverse linguistic contexts and semantic nuances. To address these limitations, we propose \textbf{MoKGR}, a mixture-of-experts framework that personalizes path exploration through two complementary components: (1) a mixture of length experts that adaptively selects and weights candidate path lengths according to query complexity, providing query-specific reasoning depth; and (2) a mixture of pruning experts that evaluates candidate paths from a complementary perspective, retaining the most informative paths for each query. Through comprehensive experiments on diverse benchmark, MoKGR demonstrates superior performance in both transductive and inductive settings, validating the effectiveness of personalized path exploration in KGs reasoning.'

# Talk start and end times.
date: '2025-11-05T10:00:00+08:00'
date_end: '2025-11-05T10:30:00+08:00'
all_day: false

# Schedule page publish date (NOT talk date).
publishDate: '2025-11-05T00:00:00+08:00'

authors:
  - admin

tags: ["EMNLP 2025", "Oral", "Mixture of Experts", "Knowledge Graph Reasoning"]

# Is this a featured talk? (true/false)
featured: true

image:
  caption: 'Presentation at EMNLP 2025'
  focal_point: Center

url_code: 'https://github.com/EnjunDu/MoKGR'
url_pdf: 'https://arxiv.org/pdf/2507.20498'
url_slides:  'https://github.com/EnjunDu/Enjun_Resource/blob/main/EMNLP2025/EMNLP%202025_main-ORAL_EnjunDu_PPT.pptx'
url_video: 'https://studio.youtube.com/video/zmLvxk3NqvM/edit'

# Markdown Slides (optional).
slides: "MoKGR"

# Projects (optional).
projects:
  - MoKGR

---

{{% callout note %}}
This page highlights my **Oral Presentation at EMNLP 2025** in Suzhou, China.  
Click on the **Slides** button above to view my presentation slides.
{{% /callout %}}

Our talk introduces **Mixture of Length and Pruning Experts for Knowledge Graphs Reasoning**, a new method for KGs Reasoning  
Key contributions include:

- We propose a personalized path exploration strategy for knowledge graph reasoning that adapts to query-specific requirements and entity characteristics.
- We introduce a novel mixture-of-experts framework that facilitates personalization in KGs reasoning. The incorporating of both adaptive length-level weighting and personalized pruning strategies effectively addresses the critical limitations of fixed path length and uniform path exploration.
- Experimental results on transductive and inductive datasets highlight MoKGR's achievement of superior reasoning accuracy and computational efficiency.

Further event details are available at the [EMNLP 2025 website](https://2025.emnlp.org/).
