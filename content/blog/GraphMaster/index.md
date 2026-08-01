---
title: "GraphMaster: Automated Graph Synthesis via LLM Agents in Data-Limited Environments"
date: 2025-03-06
type: blog

paper_name: "GraphMaster"
paper_subtitle: "Automated Graph Synthesis via LLM Agents in Data-Limited Environments"
venue: "NeurIPS 2025 Spotlight"
tags:
  - Agentic Reasoning
  - Data Mining
hero_gradient: "#fef7f7, #fdf0f3, #fceef5"
title_gradient: "#7c3aed, #a855f7, #6366f1"
badge_gradient: "#f59e0b, #ef4444"
accent: "#6366f1"
accent_soft: "#eef2ff"
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
  - "/images/logos/HKUST.png"

links:
  paper: "https://arxiv.org/pdf/2504.00711"
  arxiv: "https://arxiv.org/abs/2504.00711"
  code: "https://github.com/EnjunDu/GraphMaster"
  dataset: "https://huggingface.co/datasets/EnjunDu/GraphMaster"
  poster: "https://github.com/EnjunDu/Enjun_Resource/blob/main/NeurIPS2025/NeurIPS_2025_spotlight_GraphMaster_EnjunDu.pptx"
  huggingface: "https://huggingface.co/datasets/EnjunDu/GraphMaster"

teaser_image: "featured.jpg"
teaser_caption: "**Figure 1:** GraphMaster — a hierarchical multi-agent framework orchestrating four specialized LLM agents for automated text-attributed graph synthesis."

highlights:
  - value: "4 agents"
    label: "A coordinated synthesis team"
    detail: "Manager, Perception, Enhancement, and Evaluation agents refine graphs together."
  - value: "6 benchmarks"
    label: "Designed for data-limited graphs"
    detail: "New “Sub” variants test semantic and structural fidelity under realistic scarcity."
  - value: "0.988"
    label: "Label homogeneity"
    detail: "Synthesized graphs preserve task-relevant semantic structure."

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

Graph Foundation Models need large, diverse graph corpora, but real-world graphs are often small, private, or expensive to annotate. **GraphMaster** turns graph synthesis into a coordinated agent workflow: four specialized LLM agents iteratively expand a text-attributed graph while preserving both its meaning and topology.

---

## Motivation

> The goal is not merely to make a graph larger. The new nodes must read naturally, connect plausibly, and remain useful for downstream learning.

Classical augmentation methods mainly manipulate topology and cannot generate meaningful textual attributes. Direct LLM generation introduces a different set of problems: whole graphs exceed context windows, locally plausible additions may violate global structure, and hallucinated nodes or edges can silently corrupt the training signal.

---

## Method

![Framework](framework.png)

GraphMaster decomposes synthesis into four accountable roles:

- **Manager Agent** — Selects semantic or topological enhancement according to the current graph state and coordinates the workflow.
- **Perception Agent** — Overcomes context-window limitations via semantic-aware community detection, mode-adaptive seed selection, and hierarchical PPR-based diffusion sampling to extract representative subgraphs.
- **Enhancement Agent** — Generates new nodes and edges conditioned on extracted knowledge, with dual-mode generation for semantic coherence and structural fidelity.
- **Evaluation Agent** — Scores semantic and structural quality, then decides whether another refinement round is needed.

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
