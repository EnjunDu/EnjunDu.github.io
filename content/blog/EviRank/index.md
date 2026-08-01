---
title: "EviRank: Structured Relevance Evidence for Multimodal Image Re-ranking"
date: 2026-07-31
type: blog

paper_name: "EviRank"
paper_subtitle: "Structured Relevance Evidence for Multimodal Image Re-ranking"
venue: "Under Review"
tags:
  - Multimodal AI
  - Data Mining
accent: "#16a34a"
accent_soft: "#f0fdf4"

author_line: "**Enjun Du** et al."

links:
  code: "https://github.com/EnjunDu/EviRank"

teaser_image: "featured.png"
teaser_caption: "**EviRank overview.** Queries become typed Evidence Frames; candidates are verified against the same constraints, and the resulting evidence can supervise a lightweight student re-ranker."

highlights:
  - value: "6 slots"
    label: "Explicit semantic coverage"
    detail: "Entities, attributes, actions, relations, scene, and key details."
  - value: "5 benchmarks"
    label: "Three retrieval paradigms"
    detail: "Text-to-image, image-to-image, and composed image retrieval."
  - value: ">90%"
    label: "Teacher capability retained"
    detail: "The distilled student preserves most of the teacher’s performance at lower cost."
---

## From similarity to semantic verification

Real image-search requests are rarely one-dimensional. “Find this shirt in pink” asks the system to preserve the object and style, change one attribute, and ignore incidental factors such as the background. A single similarity score hides these separate requirements; free-form chain-of-thought may omit constraints or claim visual evidence that was never verified.

> EviRank reframes multimodal image re-ranking as an explicit semantic constraint-satisfaction problem.

The method supports text-only, image-only, and composed queries through the same evidence interface. It can sit on top of any off-the-shelf retriever and re-rank its top candidates without retraining the retriever.

---

## Structured Evidence Frames

An MLLM teacher parses each query into a typed **Evidence Frame**. The frame spans six semantic slots:

- **Entities**
- **Attributes**
- **Actions**
- **Relations**
- **Scene**
- **Key details**

Within each slot, a short criterion is marked as:

- **Required** — what a relevant candidate must contain;
- **Forbidden** — what would contradict the intended result;
- **Ignorable** — what should not influence the decision.

This structure makes semantic coverage visible. It also unifies different query modalities: a reference image contributes what must be preserved, modification text contributes what must change, and incidental context becomes explicitly ignorable.

---

## Evidence-conditioned re-ranking

EviRank first applies deterministic, slot-wise rubric scoring and then uses an evidence-grounded listwise comparison for global refinement. Both stages read the same Evidence Frame, so the final ranking can be traced back to which constraints each candidate satisfies or violates.

The paper studies four operating points:

- **EviRank-mini** — rubric-only re-ranking with no MLLM at test time;
- **EviRank** — a distilled lightweight student;
- **EviRank-plus** — rubric scoring with Gemini-3-Flash refinement;
- **EviRank-pro** — rubric scoring with Gemini-3-Pro refinement.

### Evidence as supervision

The structured frame does more than explain the teacher. Per-slot scores, hard-pair distinctions, and typed constraints form a naturally decomposable supervision bundle for distillation. The student consumes the raw query and candidate images at inference time, while learning from the teacher’s explicit evidence during training.

---

## Results

EviRank is evaluated on five benchmarks across text-to-image, image-to-image, and composed image retrieval. The full system achieves state-of-the-art results across the benchmark suite, while the distilled student retains **more than 90%** of the teacher’s capability at substantially lower cost.

The strongest gains appear in settings where fine-grained constraints matter most. On FashionIQ, for example, the method improves Recall@10 by up to **8.27 points** over ImageScope on the Shirt category. Even EviRank-mini, which uses no MLLM at test time, matches or exceeds strong reasoning-based re-rankers—evidence that the structured representation itself is doing meaningful work.
