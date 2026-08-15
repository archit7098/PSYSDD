# 2.10 — Depressed Mood

**Presenting symptom:** Depressed mood

> One of the most common presentations. After ruling out substance and medical etiologies, determine whether the depressed mood constitutes a Major Depressive Episode, then whether there is any history of mania/hypomania (which reclassifies the case as bipolar), and how psychotic symptoms relate to the mood episodes. Subthreshold, persistent, and stressor-related presentations are captured at the end.

## Decision flow

```mermaid
flowchart TD
  START(["Depressed mood"]) --> Nn1
  Nn1{"Is the depressed mood due to the physiological effects of a substance/medication?"}
  Nn1 -->|Yes| T0["Substance/Medication-Induced Depressive Disorder → Substance/Medication-Induced Depressive"]
  Nn1 -->|No| Nn2
  Nn2{"Is it due to the physiological effects of a general medical condition?"}
  Nn2 -->|Yes| T1["Depressive Disorder Due to Another Medical Condition → Depressive Disorder Due to Another "]
  Nn2 -->|No| Nn3
  Nn3{"Is there ≥2 weeks of depressed mood and/or anhedonia with ≥5 total depressive symptoms (a "}
  Nn3 -->|Yes| Nn4
  Nn3 -->|No| Nn8
  Nn4{"Is there any lifetime history of a Manic or Hypomanic Episode?"}
  Nn4 -->|Yes| T2["A bipolar disorder → Bipolar I Disorder; Bipolar II Disorder"]
  Nn4 -->|No| Nn5
  Nn5{"Is there a history of delusions or hallucinations?"}
  Nn5 -->|Yes| Nn6
  Nn5 -->|No| T3["Major Depressive Disorder → Major Depressive Disorder"]
  Nn6{"Do the psychotic symptoms occur exclusively during Major Depressive Episodes?"}
  Nn6 -->|Yes| T4["Major Depressive Disorder, With Psychotic Features → Major Depressive Disorder, With Psych"]
  Nn6 -->|No| T5["A Schizophrenia Spectrum / Other Psychotic Disorder is present → Schizoaffective Disorder"]
  Nn8{"Is there depressed mood for most of the day, more days than not, for ≥2 years (≥1 year in "}
  Nn8 -->|Yes| T6["Persistent Depressive Disorder (Dysthymia) → Persistent Depressive Disorder"]
  Nn8 -->|No| Nn9
  Nn9{"Do mood symptoms occur in the final premenstrual week and remit after menses, across most "}
  Nn9 -->|Yes| T7["Premenstrual Dysphoric Disorder → Premenstrual Dysphoric Disorder"]
  Nn9 -->|No| Nn10
  Nn10{"Is the depressed mood a maladaptive response to an identifiable psychosocial stressor?"}
  Nn10 -->|Yes| T8["Adjustment Disorder, With Depressed Mood → Adjustment Disorder"]
  Nn10 -->|No| Nn11
  Nn11{"Are clinically significant depressive symptoms present but below threshold for the above?"}
  Nn11 -->|Yes| T9["Other Specified / Unspecified Depressive Disorder → Other Specified / Unspecified Depressi"]
  Nn11 -->|No| T10["Sadness not indicative of a mental disorder (e.g., ordinary sadness, uncomplicated grief)"]
```

## Decision points

- **Is the depressed mood due to the physiological effects of a substance/medication?**
  - **Yes →** Substance/Medication-Induced Depressive Disorder — _[Substance/Medication-Induced Depressive Disorder](excessive-substance-use.md)_
  - **No →** Is it due to the physiological effects of a general medical condition?
- **Is it due to the physiological effects of a general medical condition?**
  - **Yes →** Depressive Disorder Due to Another Medical Condition — _[Depressive Disorder Due to Another Medical Condition](etiological-medical-conditions.md)_
  - **No →** Is there ≥2 weeks of depressed mood and/or anhedonia with ≥5 total depressive symptoms (a Major Depressive Episode)?
- **Is there ≥2 weeks of depressed mood and/or anhedonia with ≥5 total depressive symptoms (a Major Depressive Episode)?**
  - **Yes →** Is there any lifetime history of a Manic or Hypomanic Episode?
  - **No →** Is there depressed mood for most of the day, more days than not, for ≥2 years (≥1 year in children/adolescents)?
- **Is there any lifetime history of a Manic or Hypomanic Episode?**
  - _A single lifetime manic/hypomanic episode reclassifies the case as bipolar._
  - **Yes →** A bipolar disorder — _[Bipolar I Disorder](../tables/3-3-1.md); [Bipolar II Disorder](../tables/3-3-2.md)_
  - **No →** Is there a history of delusions or hallucinations?
- **Is there a history of delusions or hallucinations?**
  - **Yes →** Do the psychotic symptoms occur exclusively during Major Depressive Episodes?
  - **No →** Major Depressive Disorder — _[Major Depressive Disorder](../tables/3-4-1.md)_
- **Do the psychotic symptoms occur exclusively during Major Depressive Episodes?**
  - **Yes →** Major Depressive Disorder, With Psychotic Features — _[Major Depressive Disorder, With Psychotic Features](../tables/3-4-1.md)_
  - **No →** A Schizophrenia Spectrum / Other Psychotic Disorder is present — _[Schizoaffective Disorder](../tables/3-2-2.md)_
- **Is there depressed mood for most of the day, more days than not, for ≥2 years (≥1 year in children/adolescents)?**
  - **Yes →** Persistent Depressive Disorder (Dysthymia) — _[Persistent Depressive Disorder](../tables/3-4-2.md)_
  - **No →** Do mood symptoms occur in the final premenstrual week and remit after menses, across most cycles?
- **Do mood symptoms occur in the final premenstrual week and remit after menses, across most cycles?**
  - **Yes →** Premenstrual Dysphoric Disorder — _[Premenstrual Dysphoric Disorder](../tables/3-4-3.md)_
  - **No →** Is the depressed mood a maladaptive response to an identifiable psychosocial stressor?
- **Is the depressed mood a maladaptive response to an identifiable psychosocial stressor?**
  - **Yes →** Adjustment Disorder, With Depressed Mood — _[Adjustment Disorder](../tables/3-7-2.md)_
  - **No →** Are clinically significant depressive symptoms present but below threshold for the above?
- **Are clinically significant depressive symptoms present but below threshold for the above?**
  - **Yes →** Other Specified / Unspecified Depressive Disorder — _[Other Specified / Unspecified Depressive Disorder](../tables/3-4-1.md)_
  - **No →** Sadness not indicative of a mental disorder (e.g., ordinary sadness, uncomplicated grief)


---
_Original synthesis of differentiating features only — no DSM criteria text reproduced. Confirm against the official DSM-5-TR criteria (e.g. "per DSM-5-TR criteria for …"). See [the six-step method](../framework.md). Decision support for clinician reference/research use — not a diagnostic substitute._
