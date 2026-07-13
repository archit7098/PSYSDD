# 2.28 — Cognitive Impairment

**Presenting symptom:** Cognitive impairment (deficits in one or more cognitive domains)

> Broad cognitive impairment requires separating delirium (acute, fluctuating, with attentional disturbance) from the neurocognitive disorders (acquired decline from a prior level), intellectual disability (onset in the developmental period), and cognitive complaints that are features of other mental disorders (e.g., pseudodementia of depression). Establish onset, course, and whether consciousness is clear.

## Decision flow

```mermaid
flowchart TD
  START(["Cognitive impairment (deficits in one or more cognitive domains)"]) --> Nn1
  Nn1{"Is there an acute, fluctuating disturbance of attention and awareness developing over hour"}
  Nn1 -->|Yes| T0["Delirium → Delirium"]
  Nn1 -->|No| Nn2
  Nn2{"Is it due to the physiological effects of a substance/medication?"}
  Nn2 -->|Yes| T1["Substance/Medication-Induced Neurocognitive Disorder → Substance/Medication-Induced Neuroc"]
  Nn2 -->|No| Nn3
  Nn3{"Do the deficits reflect intellectual and adaptive deficits with onset during the developme"}
  Nn3 -->|Yes| T2["Intellectual Disability → Intellectual Disability"]
  Nn3 -->|No| Nn4
  Nn4{"Is there acquired decline from a previous level in ≥1 cognitive domain (memory, executive,"}
  Nn4 -->|Yes| Nn5
  Nn4 -->|No| Nn6
  Nn5{"Do the deficits interfere with independence in everyday activities (vs. preserved independ"}
  Nn5 -->|Yes| T3["Major Neurocognitive Disorder → Major Neurocognitive Disorder"]
  Nn5 -->|No| T4["Mild Neurocognitive Disorder → Mild Neurocognitive Disorder"]
  Nn6{"Are the cognitive complaints occurring only during another mental disorder (e.g., depressi"}
  Nn6 -->|Yes| T5["Cognitive symptoms as a feature of the underlying disorder → Major Depressive Disorder"]
  Nn6 -->|No| T6["No neurocognitive disorder — reassess or monitor"]
```

## Decision points

- **Is there an acute, fluctuating disturbance of attention and awareness developing over hours to days (delirium)?**
  - **Yes →** Delirium — _[Delirium](../tables/3-16-1.md)_
  - **No →** Is it due to the physiological effects of a substance/medication?
- **Is it due to the physiological effects of a substance/medication?**
  - **Yes →** Substance/Medication-Induced Neurocognitive Disorder — _[Substance/Medication-Induced Neurocognitive Disorder](excessive-substance-use.md)_
  - **No →** Do the deficits reflect intellectual and adaptive deficits with onset during the developmental period (not a decline)?
- **Do the deficits reflect intellectual and adaptive deficits with onset during the developmental period (not a decline)?**
  - **Yes →** Intellectual Disability — _[Intellectual Disability](../tables/3-1-1.md)_
  - **No →** Is there acquired decline from a previous level in ≥1 cognitive domain (memory, executive, attention, language, perceptual-motor, social cognition)?
- **Is there acquired decline from a previous level in ≥1 cognitive domain (memory, executive, attention, language, perceptual-motor, social cognition)?**
  - **Yes →** Do the deficits interfere with independence in everyday activities (vs. preserved independence with greater effort)?
  - **No →** Are the cognitive complaints occurring only during another mental disorder (e.g., depression, psychosis)?
- **Do the deficits interfere with independence in everyday activities (vs. preserved independence with greater effort)?**
  - **Yes →** Major Neurocognitive Disorder — _[Major Neurocognitive Disorder](../tables/3-16-2.md)_
  - **No →** Mild Neurocognitive Disorder — _[Mild Neurocognitive Disorder](../tables/3-16-2.md)_
- **Are the cognitive complaints occurring only during another mental disorder (e.g., depression, psychosis)?**
  - **Yes →** Cognitive symptoms as a feature of the underlying disorder — _[Major Depressive Disorder](../tables/3-4-1.md)_
  - **No →** No neurocognitive disorder — reassess or monitor


---
_Summarizes differentiating features only. Confirm against the full DSM-5 criteria. See [the six-step method](../framework.md)._
