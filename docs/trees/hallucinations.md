# 2.6 — Hallucinations

**Presenting symptom:** Hallucinations (perceptions without external stimulus)

> Distinguish true hallucinations from normal experiences (hypnagogic/hypnopompic phenomena, intense imagery) and illusions. The branching parallels the delusions tree: rule out substance and medical etiologies, then use the mood/psychosis relationship to differentiate the primary disorders. Hallucinations in clear consciousness confined to one modality, or occurring only at sleep-wake transitions, have distinct implications.

## Decision flow

```mermaid
flowchart TD
  START(["Hallucinations (perceptions without external stimulus)"]) --> Nn1
  Nn1{"Do the hallucinations occur only while falling asleep or waking (hypnagogic/hypnopompic)?"}
  Nn1 -->|Yes| T0["Normal sleep-related phenomena (consider narcolepsy if with cataplexy/other features) → Na"]
  Nn1 -->|No| Nn2
  Nn2{"Are the hallucinations due to the physiological effects of a substance (including medicati"}
  Nn2 -->|Yes| T1["Substance/Medication-Induced Psychotic Disorder (or intoxication/withdrawal) → Substance/M"]
  Nn2 -->|No| Nn3
  Nn3{"Are they due to the physiological effects of a general medical condition (including deliri"}
  Nn3 -->|Yes| T2["Psychotic Disorder Due to Another Medical Condition / Delirium → Psychotic Disorder Due to"]
  Nn3 -->|No| Nn4
  Nn4{"Do they occur exclusively during episodes of elevated/expansive/irritable mood?"}
  Nn4 -->|Yes| T3["Bipolar Disorder, With Psychotic Features → Bipolar I/II Disorder, With Psychotic Features"]
  Nn4 -->|No| Nn5
  Nn5{"Do they occur exclusively during Major Depressive Episodes?"}
  Nn5 -->|Yes| T4["Depressive Disorder, With Psychotic Features → Major Depressive Disorder, With Psychotic F"]
  Nn5 -->|No| Nn6
  Nn6{"Are the hallucinations part of a re-experiencing response to a traumatic event (flashbacks"}
  Nn6 -->|Yes| T5["PTSD / Acute Stress Disorder → Posttraumatic Stress Disorder"]
  Nn6 -->|No| Nn7
  Nn7{"Have psychotic symptoms persisted for 6 months or more?"}
  Nn7 -->|Yes| Nn8
  Nn7 -->|No| Nn11
  Nn8{"Are they accompanied by other characteristic psychotic symptoms of schizophrenia?"}
  Nn8 -->|Yes| Nn9
  Nn8 -->|No| T6["Delusional Disorder (if delusions predominate) or reconsider → Delusional Disorder"]
  Nn9{"Is there a history of Major Depressive or Manic Episodes overlapping the active psychotic "}
  Nn9 -->|Yes| Nn10
  Nn9 -->|No| T7["Schizophrenia → Schizophrenia"]
  Nn10{"Have mood episodes been present for the majority of the illness, with ≥2 weeks of psychosi"}
  Nn10 -->|Yes| T8["Schizoaffective Disorder → Schizoaffective Disorder"]
  Nn10 -->|No| T9["Schizophrenia (mood a minority of illness) → Schizophrenia"]
  Nn11{"Has the disturbance lasted at least 1 month but less than 6 months?"}
  Nn11 -->|Yes| T10["Schizophreniform Disorder → Schizophreniform Disorder"]
  Nn11 -->|No| Nn12
  Nn12{"Has it lasted at least 1 day but less than 1 month with full recovery?"}
  Nn12 -->|Yes| T11["Brief Psychotic Disorder → Brief Psychotic Disorder"]
  Nn12 -->|No| T12["Other Specified / Unspecified Schizophrenia Spectrum and Other Psychotic Disorder"]
```

## Decision points

- **Do the hallucinations occur only while falling asleep or waking (hypnagogic/hypnopompic)?**
  - **Yes →** Normal sleep-related phenomena (consider narcolepsy if with cataplexy/other features) — _[Narcolepsy (if other features present)](hypersomnolence.md)_
  - **No →** Are the hallucinations due to the physiological effects of a substance (including medication or withdrawal)?
- **Are the hallucinations due to the physiological effects of a substance (including medication or withdrawal)?**
  - **Yes →** Substance/Medication-Induced Psychotic Disorder (or intoxication/withdrawal) — _[Substance/Medication-Induced Psychotic Disorder](excessive-substance-use.md)_
  - **No →** Are they due to the physiological effects of a general medical condition (including delirium)?
- **Are they due to the physiological effects of a general medical condition (including delirium)?**
  - **Yes →** Psychotic Disorder Due to Another Medical Condition / Delirium — _[Psychotic Disorder Due to Another Medical Condition](etiological-medical-conditions.md); [Delirium](../tables/3-16-1.md)_
  - **No →** Do they occur exclusively during episodes of elevated/expansive/irritable mood?
- **Do they occur exclusively during episodes of elevated/expansive/irritable mood?**
  - **Yes →** Bipolar Disorder, With Psychotic Features — _[Bipolar I/II Disorder, With Psychotic Features](../tables/3-3-1.md)_
  - **No →** Do they occur exclusively during Major Depressive Episodes?
- **Do they occur exclusively during Major Depressive Episodes?**
  - **Yes →** Depressive Disorder, With Psychotic Features — _[Major Depressive Disorder, With Psychotic Features](../tables/3-4-1.md)_
  - **No →** Are the hallucinations part of a re-experiencing response to a traumatic event (flashbacks)?
- **Are the hallucinations part of a re-experiencing response to a traumatic event (flashbacks)?**
  - **Yes →** PTSD / Acute Stress Disorder — _[Posttraumatic Stress Disorder](../tables/3-7-1.md)_
  - **No →** Have psychotic symptoms persisted for 6 months or more?
- **Have psychotic symptoms persisted for 6 months or more?**
  - **Yes →** Are they accompanied by other characteristic psychotic symptoms of schizophrenia?
  - **No →** Has the disturbance lasted at least 1 month but less than 6 months?
- **Are they accompanied by other characteristic psychotic symptoms of schizophrenia?**
  - **Yes →** Is there a history of Major Depressive or Manic Episodes overlapping the active psychotic period?
  - **No →** Delusional Disorder (if delusions predominate) or reconsider — _[Delusional Disorder](../tables/3-2-3.md)_
- **Is there a history of Major Depressive or Manic Episodes overlapping the active psychotic period?**
  - **Yes →** Have mood episodes been present for the majority of the illness, with ≥2 weeks of psychosis without a mood episode?
  - **No →** Schizophrenia — _[Schizophrenia](../tables/3-2-1.md)_
- **Have mood episodes been present for the majority of the illness, with ≥2 weeks of psychosis without a mood episode?**
  - **Yes →** Schizoaffective Disorder — _[Schizoaffective Disorder](../tables/3-2-2.md)_
  - **No →** Schizophrenia (mood a minority of illness) — _[Schizophrenia](../tables/3-2-1.md)_
- **Has the disturbance lasted at least 1 month but less than 6 months?**
  - **Yes →** Schizophreniform Disorder — _[Schizophreniform Disorder](../tables/3-2-1.md)_
  - **No →** Has it lasted at least 1 day but less than 1 month with full recovery?
- **Has it lasted at least 1 day but less than 1 month with full recovery?**
  - **Yes →** Brief Psychotic Disorder — _[Brief Psychotic Disorder](../tables/3-2-4.md)_
  - **No →** Other Specified / Unspecified Schizophrenia Spectrum and Other Psychotic Disorder


---
_Summarizes differentiating features only. Confirm against the full DSM-5 criteria. See [the six-step method](../framework.md)._
