---
title: "MoKGR: Mixture of Length and Pruning Experts for Knowledge Graphs Reasoning"
date: 2025-01-19
type: blog

paper_name: "MoKGR"
paper_subtitle: "Mixture of Length and Pruning Experts for Knowledge Graphs Reasoning"
venue: "EMNLP 2025 Main Oral"
hero_gradient: "#fdf8fe, #faf2fc, #f7edfb"
title_gradient: "#7c3aed, #9333ea, #a855f7"
badge_gradient: "#7c3aed, #a855f7"
accent: "#a855f7"
accent_light: "#c084fc"
highlight_bg: "#f3e8ff, #ede9fe"
highlight_bg_dark: "#2e1065, #1e1b4b"

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
  - "/images/logos/hkust-gz.svg"
  - "/images/logos/bit.png"

links:
  paper: "https://arxiv.org/pdf/2507.20498"
  arxiv: "https://arxiv.org/abs/2507.20498"
  code: "https://github.com/EnjunDu/MoKGR"
  dataset: "https://github.com/EnjunDu/MoKGR"
  video: "https://www.youtube.com/watch?v=XlOH8mwr-jk"
  slides: "https://github.com/EnjunDu/Enjun_Resource/blob/main/EMNLP2025/EMNLP%202025_main-ORAL_EnjunDu_PPT.pptx"
  poster: "https://github.com/EnjunDu/Enjun_Resource/blob/main/EMNLP2025/EMNLP%202025_main_Poster-EnjunDu.pptx"

teaser_image: "featured.jpg"
teaser_caption: "**Figure 1:** Motivation — Two queries on the same KG require different reasoning depths: *(JACK, followed, ?)* resolves in 3 hops, while *(JACK, watched, ?)* needs deeper exploration. MoKGR adapts path length and pruning per query."

video_embed: "https://www.youtube.com/embed/XlOH8mwr-jk"

bibtex: |
  @inproceedings{du2025mokgr,
    title     = {Mixture of Length and Pruning Experts for Knowledge
                 Graphs Reasoning},
    author    = {Du, Enjun and Liu, Siyi and Zhang, Yongqi},
    booktitle = {Proceedings of the 2025 Conference on Empirical Methods
                 in Natural Language Processing (EMNLP)},
    year      = {2025},
    note      = {Oral Presentation}
  }
---

## Abstract

Knowledge Graph (KG) reasoning critically depends on constructing informative reasoning paths. Existing GNNs adopt rigid, query-agnostic strategies. We propose **MoKGR**, a mixture-of-experts framework with two innovations: **(1)** a **mixture of length experts** that adaptively weights path lengths based on query complexity, and **(2)** a **mixture of pruning experts** that evaluates paths from complementary perspectives. MoKGR achieves **state-of-the-art** in both transductive and inductive settings.

---

## Motivation

![Motivation](motivation.png)

Consider two queries on the same graph: *(JACK, followed, ?)* can be resolved within 3 hops, while *(JACK, watched, ?)* requires deeper exploration. Existing methods use **fixed reasoning depth** for all queries and **uniform pruning criteria** — both are suboptimal. MoKGR personalizes both the depth and the pruning strategy per query.

---

## Method

MoKGR introduces two complementary Mixture-of-Experts modules:

- **Mixture of Length Experts** — Multiple experts specialized for different reasoning depths. A learned gating network computes query-specific weights over path lengths: simple queries route to short paths, complex queries activate deeper experts. The final output is a soft weighted combination.
- **Mixture of Pruning Experts** — At each GNN layer, multiple pruning experts evaluate candidate paths from complementary perspectives (structural, semantic, diversity). A learned aggregation selects the top-k most informative paths per query.
- **End-to-End Training** — Both modules are trained jointly with the answer prediction objective, ensuring optimal synergy between depth selection and path pruning.

---

## Experimental Results

### Transductive Setting (6 Benchmarks)

![Main Results](main_results.png)

MoKGR achieves the best results across all 6 benchmarks (Family, UMLS, WN18RR, FB15k237, NELL-995, YAGO3-10), outperforming both non-GNN baselines and state-of-the-art GNN methods including NBFNet, RED-GNN, A*Net, and AdaProp.

### Efficiency & Convergence

![Efficiency](efficiency.png)

MoKGR converges significantly faster than competing methods while maintaining lower inference time, demonstrating that personalized path exploration is both more accurate and more efficient.

### Expert Selection Analysis

![Expert Analysis](expert_analysis.png)

The learned gating weights show interpretable patterns: the model prefers medium-length paths overall, but adapts dynamically — shorter paths for simple relational queries, deeper paths for complex multi-hop reasoning.

### Ablation Study

![Ablation](ablation.png)

Removing the length experts causes the largest drop, confirming that adaptive depth is the most critical innovation. Removing pruning experts or using a single expert also degrades performance.
