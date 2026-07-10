---
title: "GraphMaster: Automated Graph Synthesis via LLM Agents in Data-Limited Environments"
date: 2025-03-06
type: blog

paper_name: "GraphMaster"
paper_subtitle: "Automated Graph Synthesis via LLM Agents in Data-Limited Environments"
venue: "NeurIPS 2025 Spotlight"
hero_gradient: "#fef7f7, #fdf0f3, #fceef5"
title_gradient: "#7c3aed, #a855f7, #6366f1"
badge_gradient: "#f59e0b, #ef4444"
accent: "#6366f1"
accent_light: "#a78bfa"
highlight_bg: "#ede9fe, #dbeafe"
highlight_bg_dark: "#1e1b4b, #172554"

paper_authors:
  - name: "Enjun Du"
    url: "https://enjundu.com"
    affiliations: ["1"]
  - name: "Xunkai Li"
    url: "https://xkli-allen.github.io/"
    affiliations: ["1"]
  - name: "Tian Jin"
    affiliations: ["2"]
  - name: "Zhihan Zhang"
    affiliations: ["1"]
  - name: "Rong-Hua Li"
    url: "https://ronghuali.github.io/"
    affiliations: ["1"]
    corresponding: true
  - name: "Guoren Wang"
    affiliations: ["1"]

affiliations:
  - id: "1"
    name: "Beijing Institute of Technology"
  - id: "2"
    name: "HKUST(GZ)"

logos:
  - "/images/logos/bit.png"
  - "/images/logos/hkust-gz.svg"

links:
  paper: "https://arxiv.org/pdf/2504.00711"
  arxiv: "https://arxiv.org/abs/2504.00711"
  code: "https://github.com/EnjunDu/GraphMaster"
  dataset: "https://huggingface.co/datasets/EnjunDu/GraphMaster"
  poster: "https://github.com/EnjunDu/Enjun_Resource/blob/main/NeurIPS2025/NeurIPS_2025_spotlight_GraphMaster_EnjunDu.pptx"
  huggingface: "https://huggingface.co/datasets/EnjunDu/GraphMaster"

teaser_image: "featured.jpg"
teaser_caption: "**Figure 1:** GraphMaster — a hierarchical multi-agent framework orchestrating four specialized LLM agents for automated text-attributed graph synthesis."

bibtex: |
  @inproceedings{du2025graphmaster,
    title     = {GraphMaster: Automated Graph Synthesis via LLM Agents
                 in Data-Limited Environments},
    author    = {Du, Enjun and Li, Xunkai and Jin, Tian and Zhang, Zhihan
                 and Li, Rong-Hua and Wang, Guoren},
    booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
    year      = {2025},
    note      = {Spotlight}
  }
---

## Abstract

The era of foundation models has revolutionized AI research, yet **Graph Foundation Models (GFMs)** remain constrained by the scarcity of large-scale graph corpora. We introduce **GraphMaster** — the first multi-agent framework specifically designed for graph data synthesis in data-limited environments. GraphMaster orchestrates **four specialized LLM agents** (Manager, Perception, Enhancement, and Evaluation) that collaboratively optimize the synthesis process through iterative refinement, ensuring both semantic coherence and structural integrity.

---

## Motivation

Graph Foundation Models face a critical data bottleneck. Existing synthesis methods fail for three reasons: **(1)** classical augmentation (GraphSmote, G-Mixup) only manipulates structure, producing semantically empty nodes; **(2)** LLMs cannot process entire graphs within context windows; **(3)** uncoordinated LLM generation introduces hallucinations that violate graph topology.

---

## Method

![Framework](framework.png)

GraphMaster decomposes graph synthesis into four specialized agents:

- **Manager Agent** — Selects between semantic and topological enhancement modes based on environmental analysis, and coordinates the entire synthesis workflow.
- **Perception Agent** — Overcomes context-window limitations via semantic-aware community detection, mode-adaptive seed selection, and hierarchical PPR-based diffusion sampling to extract representative subgraphs.
- **Enhancement Agent** — Generates new nodes and edges conditioned on extracted knowledge, with dual-mode generation for semantic coherence and structural fidelity.
- **Evaluation Agent** — Assesses quality through multi-dimensional scoring (semantic + structural), with adaptive threshold and temporal convergence detection for iterative refinement.

---

## Experimental Results

Evaluated on **6 data-limited benchmarks** with **4 GNN architectures** (GCN, JKNET, GraphSage, GAT) on 8x A100 GPUs using QwQ-32B as the base LLM.

![Main Results](main_results.png)

GraphMaster consistently outperforms all baselines across all datasets. The bottom row (blue) shows GraphMaster achieving the highest accuracy and F1 scores on every benchmark.

### Graph Feature Preservation

![Feature Analysis](feature_analysis.png)

The synthesized graphs maintain high fidelity: **KS statistic 0.357** (p=0.059) for degree distribution, **0.835** clustering coefficient similarity, and **0.988** label homogeneity — indicating near-perfect structural preservation.

### Ablation Study

![Ablation](ablation.png)

Removing the Evaluation Agent causes the largest performance drop, confirming the critical role of iterative quality control. Each agent contributes uniquely to the final synthesis quality.
