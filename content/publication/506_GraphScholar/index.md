---
title: "GRAPHSCHOLAR: COMPOSITIONAL STRATEGIC DECISION MAKING FOR KNOWLEDGE GRAPH REASONING
VIA RELATION-DEPENDENCY GRAPHS"
authors:
  - Zhonglin Jiang
  - Hange Zhou
  - admin
  - Feng Xue
  - Yingjie Cui
  - Jingcheng Sha
  - Yong Chen
  - "Yongqi Zhang*"



# Author notes (optional)
author_notes:
  - ''
  - 'Corresponding Author'
date: '2026-03-08'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2026-03-08'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["conference"]

# Publication name and optional abbreviated publication name.
publication: 
publication_short: 

abstract: 'Strategic decision making in complex, dynamic multi-agent environments often depends on reliable relational reasoning under distribution shift, where both the underlying entities and the interaction types can change over time or across domains. Knowledge graph reasoning in the fully-inductive setting—where both entities and relations at test time are unseen during training—remains an open challenge. In this work, we introduce GRAPHSCHOLAR, a novel framework that achieves robust fully-inductive reasoning by transforming each knowledge graph into a Relation-Dependency Graph (RDG). The RDG encodes directed precedence links between relations, capturing essential compositional patterns while drastically reducing graph density. Conditioned on a query relation, a multi-head attention mechanism propagates information over the RDG to produce context-aware relation embeddings. These embeddings then guide a second GNN to perform inductive message passing over the original knowledge graph, enabling prediction on entirely new entities and relations. Comprehensive experiments on 60 benchmarks demonstrate that GRAPHSCHOLAR outperforms prior methods by up to 25% in fully-inductive and 28% in cross-domain scenarios. Our analysis further confirms that the compact RDG structure and attention-based propagation are key to efficient and accurate generalization.'

# Summary. An optional shortened abstract.
#summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

tags:
  - Knowledge Graph Reasoning

featured: false


# links:
# - name: ""
#   url: ""
url_pdf: 'https://openreview.net/pdf?id=GU1xilxrq7'
url_code: 'https://openreview.net/pdf?id=GU1xilxrq7'
url_dataset: 'https://openreview.net/pdf?id=GU1xilxrq7'
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

