# 2.21 — Sexual Dysfunction in a Female

**Presenting symptom:** Sexual dysfunction in a female

> Sexual dysfunctions require clinically significant distress and typically ≥6 months' duration. Exclude substance/medication effects, medical conditions, severe relationship distress, and other mental disorders that better account for the problem before diagnosing a primary sexual dysfunction, which is then specified by the phase/nature of the difficulty.

## Decision flow

```mermaid
flowchart TD
  START(["Sexual dysfunction in a female"]) --> Nn1
  Nn1{"Is the dysfunction due to the physiological effects of a substance/medication (e.g., SSRIs"}
  Nn1 -->|Yes| T0["Substance/Medication-Induced Sexual Dysfunction → Substance/Medication-Induced Sexual Dysf"]
  Nn1 -->|No| Nn2
  Nn2{"Is it fully explained by a general medical condition?"}
  Nn2 -->|Yes| T1["Sexual dysfunction due to another medical condition (coded medically) → Sexual dysfunction"]
  Nn2 -->|No| Nn3
  Nn3{"Is it better explained by another mental disorder (e.g., major depressive disorder) or by "}
  Nn3 -->|Yes| T2["Diagnose the underlying disorder / note the stressor → Major Depressive Disorder"]
  Nn3 -->|No| Nn4
  Nn4{"Is there reduced/absent sexual interest and arousal?"}
  Nn4 -->|Yes| T3["Female Sexual Interest/Arousal Disorder → Female Sexual Interest/Arousal Disorder"]
  Nn4 -->|No| Nn5
  Nn5{"Is there marked delay/absence/reduced intensity of orgasm?"}
  Nn5 -->|Yes| T4["Female Orgasmic Disorder → Female Orgasmic Disorder"]
  Nn5 -->|No| Nn6
  Nn6{"Is there marked pain, tension, or fear with vaginal penetration?"}
  Nn6 -->|Yes| T5["Genito-Pelvic Pain/Penetration Disorder → Genito-Pelvic Pain/Penetration Disorder"]
  Nn6 -->|No| T6["Other Specified / Unspecified Sexual Dysfunction, or no disorder (if not distressing)"]
```

## Decision points

- **Is the dysfunction due to the physiological effects of a substance/medication (e.g., SSRIs)?**
  - **Yes →** Substance/Medication-Induced Sexual Dysfunction — _[Substance/Medication-Induced Sexual Dysfunction](../tables/3-12-1.md)_
  - **No →** Is it fully explained by a general medical condition?
- **Is it fully explained by a general medical condition?**
  - **Yes →** Sexual dysfunction due to another medical condition (coded medically) — _[Sexual dysfunction attributable to a medical condition](etiological-medical-conditions.md)_
  - **No →** Is it better explained by another mental disorder (e.g., major depressive disorder) or by severe relationship distress/other stressors?
- **Is it better explained by another mental disorder (e.g., major depressive disorder) or by severe relationship distress/other stressors?**
  - **Yes →** Diagnose the underlying disorder / note the stressor — _[Major Depressive Disorder](../tables/3-4-1.md)_
  - **No →** Is there reduced/absent sexual interest and arousal?
- **Is there reduced/absent sexual interest and arousal?**
  - **Yes →** Female Sexual Interest/Arousal Disorder — _[Female Sexual Interest/Arousal Disorder](../tables/3-12-1.md)_
  - **No →** Is there marked delay/absence/reduced intensity of orgasm?
- **Is there marked delay/absence/reduced intensity of orgasm?**
  - **Yes →** Female Orgasmic Disorder — _[Female Orgasmic Disorder](../tables/3-12-1.md)_
  - **No →** Is there marked pain, tension, or fear with vaginal penetration?
- **Is there marked pain, tension, or fear with vaginal penetration?**
  - **Yes →** Genito-Pelvic Pain/Penetration Disorder — _[Genito-Pelvic Pain/Penetration Disorder](../tables/3-12-1.md)_
  - **No →** Other Specified / Unspecified Sexual Dysfunction, or no disorder (if not distressing)


---
_Summarizes differentiating features only. Confirm against the full DSM-5 criteria. See [the six-step method](../framework.md)._
