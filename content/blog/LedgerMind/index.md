---
title: "LEDGERMIND: Provenance-Constrained Multimodal Agentic Reasoning with a Structured Evidence Ledger"
date: 2026-07-30
type: blog

paper_name: "LEDGERMIND"
paper_subtitle: "Provenance-Constrained Multimodal Agentic Reasoning with a Structured Evidence Ledger"
venue: "Under Review"
tags:
  - Agentic Reasoning
  - Multimodal AI
accent: "#059669"
accent_soft: "#ecfdf5"

paper_authors:
  - name: "Enjun Du"
    url: "https://enjundu.com"
    affiliations: ["1", "2"]
    equal: true
  - name: "Hange Zhou"
    affiliations: ["1"]
    equal: true
  - name: "Chenxu Du"
    affiliations: ["1"]
  - name: "Siyi Liu"
    affiliations: ["1"]
  - name: "Zirong Chen"
    affiliations: ["1", "3"]
  - name: "Ziyu Zheng"
    affiliations: ["4"]
  - name: "Yongqi Zhang"
    url: "https://yzhangee.github.io/"
    affiliations: ["1"]
    corresponding: true

author_note: "† Equal contribution · * Corresponding author"

affiliations:
  - id: "1"
    name: "HKUST(GZ)"
  - id: "2"
    name: "The University of Hong Kong"
  - id: "3"
    name: "Tsinghua University"
  - id: "4"
    name: "University of Sussex"

logos:
  - "/images/logos/HKUST.png"
  - "/images/logos/HKU.jpeg"

links:
  paper: "https://huggingface.co/papers/2607.28374"
  huggingface: "https://huggingface.co/papers/2607.28374"

teaser_image: "featured.png"
teaser_caption: "**LedgerMind runtime.** Tool outputs become active ledger entries; claims are checked for support, entity consistency, and numerical coherence before a grounded answer—or a typed repair—is allowed."

highlights:
  - value: "7 evaluations"
    label: "Six public benchmarks + Hard-200"
    detail: "Tested across answer accuracy, search chains, and trajectory-level faithfulness."
  - value: "+11.2–19.7"
    label: "Hard-200 overall gain"
    detail: "Every evaluated frontier backbone improves under the LedgerMind runtime."
  - value: "Typed repair"
    label: "Provenance cannot be amplified"
    detail: "Repair changes ledger state or tool actions without inventing untraceable evidence."

bibtex: |
  @article{du2026ledgermind,
    title   = {LEDGERMIND: Provenance-Constrained Multimodal Agentic
               Reasoning with a Structured Evidence Ledger},
    author  = {Du, Enjun and Zhou, Hange and Du, Chenxu and Liu, Siyi
               and Chen, Zirong and Zheng, Ziyu and Zhang, Yongqi},
    year    = {2026}
  }
---

## Why trajectory faithfulness matters

A multimodal agent does more than emit an answer. It observes images, calls tools, retrieves evidence, forms intermediate claims, and sometimes repairs its own trajectory. Final-answer accuracy compresses all of this into one bit: correct or incorrect. It cannot reveal whether the answer was grounded, guessed from a language prior, or reached through errors that happened to cancel out.

> LedgerMind treats the agent trajectory as an auditable state machine, not a free-form scratchpad.

This perspective targets four recurring failure modes: unsupported intermediate claims, citation-backed entity hallucination (**Phantom Grounding**), unnecessary deep reasoning on simple queries, and new unsupported content introduced during repair.

---

## The LedgerMind runtime

LedgerMind places a **Structured Evidence Ledger** at the center of the agent. Each perception or retrieval result is normalized into a typed entry with its source, confidence, lifecycle state, and dependencies. Downstream claims may cite only active entries, turning provenance from a prompting preference into an execution constraint.

The runtime proceeds in two stages:

1. **Evidence acquisition and ledger state.** An adaptive dispatcher chooses either a direct path or the full tool pipeline. Tool outputs are recorded as active ledger entries rather than mixed into an unstructured text history.
2. **Grounding-governed intervention.** Every decision claim passes support coverage, **Entity Consistency Check (ECC)**, and **Numeric Coherence Check (NCC)**. A passing claim becomes the grounded final answer; a failing claim can trigger only predefined evidence-, action-, or trajectory-level repair.

### Three-layer grounding

- **Support coverage** checks whether the claim is substantively covered by its cited evidence.
- **ECC** requires conclusion-level entities to appear in the cited evidence, with alias handling.
- **NCC** requires numerical values to match cited values under type-aware tolerances.

Together, these checks catch claims that cite valid evidence IDs while quietly introducing a different entity, year, count, or measurement.

### Adaptive execution and constrained repair

The **Adaptive Dual-Path Dispatcher** avoids routing every query through an expensive reasoning pipeline. Simple or knowledge-oriented queries can take the direct path, while questions requiring perception, retrieval, and multi-step reasoning use the full pipeline.

When verification fails, the **Event-Triggered Verification-and-Repair** engine applies typed state transitions. It may drop or refresh evidence, retry or switch an action, or stop and answer—but new evidence must still come from tools. This gives repair a provenance non-amplification guarantee.

---

## Results

LedgerMind is evaluated on six public benchmarks—VTC-Bench, MMStar, MMMU, MMMU-Pro, EMMA, and MC-Search—plus the **Hard-200** stress set, using six frontier MLLMs from four vendors.

- On **VTC-Bench**, LedgerMind with Gemini-3-Flash reaches **58.9%**, while the same runtime improves GPT-4o by **23.3 points**.
- On **EMMA**, it reaches **58.29% overall**, a **9.58-point** gain over the strongest thinking-mode baseline.
- On **Hard-200**, every tested backbone improves by **11.2 to 19.7 points overall**, with no negative sub-source result.
- Trajectory-level audits show gains beyond answer accuracy, especially against unsupported reasoning and Phantom Grounding.

The ablations reinforce the design: removing the ledger causes the largest degradation, free-form repair is substantially weaker than typed repair, and disabling ECC/NCC most strongly harms the difficult split.
