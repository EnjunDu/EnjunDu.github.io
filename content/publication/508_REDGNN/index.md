---
title: 'Neural Knowledge Graph Reasoning with Relational Digraph'

authors:
  - Yongqi Zhang
  - Haiquan Qiu
  - Shuzhi Liu
  - admin
  - Quanming Yao
author_notes:
  - ''
  - ''
  - ''
  - ''
  - ''

date: ''
doi: ''

publishDate: '2025-03-14'

publication_types: ['paper-conference']

publication: In **Artificial Intelligence**
publication_short: In **Artificial Intelligence Journal**

abstract: >-
  Reasoning on Knowledge Graphs (KGs) aims to deduce unobserved facts from
established ones. While path-based methods are interpretable and transferable, they
struggle to capture complex graph topologies. Conversely, subgraph-based
approaches preserve structure but often face high computational overhead. To unify
these strengths, we introduce the relational directed graph (r-digraph), a structure that
generalizes relational paths into layered subgraphs to capture rich local evidence. To
overcome the computational burden of processing individual subgraphs, we propose
RED-GNN. By observing that r-digraphs for a common query share overlapping paths,
RED-GNN utilizes dynamic programming to recursively encode multiple r-digraphs with
shared edges. Furthermore, to address the dynamic nature of real-world facts, we
extend this framework to T-RED-GNN for temporal knowledge graphs (tKGs). T-REDGNN introduces a relative temporal encoding mechanism that enables a unified
approach to both interpolation and extrapolation tasks. Extensive experiments show
that our methodologies significantly outperform state-of-the-art static and temporal
reasoning models. Moreover, the learned attention weights provide transparent,
interpretable evidence for the reasoning process. The code is available at: github.com/LARS-research/RED-GNN.
tags:
  - Knowledge Graph Reasoning
  - Graph Learning
  - Machine Learning

featured: false

url_pdf: 'enjundu.com'
url_code: 'https://github.com/LARS-research/RED-GNN'
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

