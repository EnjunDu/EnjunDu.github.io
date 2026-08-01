---
title: "GraphOracle: Efficient Fully-Inductive Knowledge Graph Reasoning via Relation-Dependency Graphs"
date: 2025-03-25
type: blog

paper_name: "GraphOracle"
paper_subtitle: "Efficient Fully-Inductive Knowledge Graph Reasoning via Relation-Dependency Graphs"
venue: "AAAI 2026 Oral"
tags:
  - Knowledge Graphs
hero_gradient: "#fef8f8, #fdf1f3, #fcecf0"
title_gradient: "#dc2626, #ea580c, #d97706"
badge_gradient: "#dc2626, #b91c1c"
accent: "#f59e0b"
accent_soft: "#fffbeb"
accent_light: "#fbbf24"
highlight_bg: "#fef3c7, #fed7aa"
highlight_bg_dark: "#451a03, #431407"

paper_authors:
  - name: "Enjun Du"
    url: "https://enjundu.com"
    affiliations: ["1", "2"]
  - name: "Siyi Liu"
    affiliations: ["1"]
  - name: "Yongqi Zhang"
    url: "https://yzhangee.github.io/"
    affiliations: ["1"]
    corresponding: true

affiliations:
  - id: "1"
    name: "HKUST(GZ)"
  - id: "2"
    name: "Beijing Institute of Technology"

logos:
  - "/images/logos/HKUST.png"
  - "/images/logos/bit.png"

links:
  paper: "https://arxiv.org/abs/2505.11125"
  arxiv: "https://arxiv.org/abs/2505.11125"
  code: "https://github.com/EnjunDu/GraphOracle"
  dataset: "https://github.com/EnjunDu/GraphOracle/tree/master/KGsReasoning/data"
  video: "https://www.youtube.com/watch?v=KiCdSzCOfac"
  slides: "https://github.com/EnjunDu/Enjun_Resource/blob/main/AAAI2026/PPT_2026_AAAI.pptx"
  poster: "https://github.com/EnjunDu/Enjun_Resource/blob/main/AAAI2026/Poster_2026_AAAI.pptx"

teaser_image: "featured.jpg"
teaser_caption: "**Figure 1:** Overview of GraphOracle — construct a Relation-Dependency Graph (RDG) from the KG, propagate messages via multi-head attention, then score candidate entities for answer prediction."

highlights:
  - value: "60 benchmarks"
    label: "Four reasoning settings"
    detail: "Transductive, entity-inductive, fully-inductive, and cross-domain evaluation."
  - value: "+26.82%"
    label: "Cross-domain MRR improvement"
    detail: "Directed relation dependencies transfer effectively to unseen domains."
  - value: "Directed RDG"
    label: "Sparse relational structure"
    detail: "Precedence edges encode compositional patterns that undirected graphs miss."

video_embed: "https://www.youtube.com/embed/KiCdSzCOfac"

bibtex: |
  @inproceedings{du2026graphoracle,
    title     = {GraphOracle: Efficient Fully-Inductive Knowledge Graph
                 Reasoning via Relation-Dependency Graphs},
    author    = {Du, Enjun and Liu, Siyi and Zhang, Yongqi},
    booktitle = {Proceedings of the AAAI Conference on Artificial
                 Intelligence (AAAI)},
    year      = {2026},
    note      = {Oral Presentation}
  }
---

## Abstract

Knowledge-graph reasoners often struggle when test-time entities and relations were never observed during training. **GraphOracle** addresses this fully-inductive setting by converting each knowledge graph into a directed **Relation-Dependency Graph (RDG)**. The RDG captures how relations compose, and its query-aware embeddings guide answer prediction on the original entity graph.

---

## Motivation

> Relation order matters: “born in → located in” carries a compositional direction that an undirected relation graph erases.

Existing fully-inductive methods construct dense, undirected relation graphs. This makes computation expensive and loses directional dependencies that are essential for multi-hop reasoning. The same limitation makes it difficult to transfer a learned reasoner across domains with different entity and relation vocabularies.

---

## Method

![Framework](framework.png)

GraphOracle operates in three stages:

- **RDG Construction** — Transform the KG into a directed Relation-Dependency Graph where edge *(r_i, r_j)* indicates that relation *r_i* precedes *r_j* in observed triple chains. This is significantly sparser than prior relation graphs while capturing compositional patterns.
- **Query-Dependent Multi-Head Attention** — For each query relation, a multi-head attention GNN propagates messages over the RDG to produce context-aware relation embeddings. The same relation gets different representations depending on the query context.
- **Entity-Level Answer Prediction** — The learned relation embeddings parameterize a second GNN on the original KG entity graph, performing inductive message passing from the query entity to score candidates.

---

## Experimental Results

Evaluated across **60 benchmarks** spanning transductive, entity-inductive, fully-inductive, and cross-domain settings.

### MRR Comparison on 60 Datasets

![MRR Comparison](mrr_comparison.png)

GraphOracle (red) consistently matches or outperforms supervised SOTA (green) across all 60 datasets, with particularly strong gains on cross-domain and biomedical KGs.

### Average Performance (4 Settings)

![Main Results](main_results.png)

GraphOracle achieves **+7.19%** MRR improvement in transductive, **+10.86%** in entity-inductive, **+13.28%** in fully-inductive, and **+26.82%** in cross-domain settings over supervised SOTA.

### Ablation Study

![Ablation](ablation.png)

Removing the RDG structure or multi-head attention causes significant performance drops, confirming both components are essential. The directed precedence encoding is the single most important design choice.
