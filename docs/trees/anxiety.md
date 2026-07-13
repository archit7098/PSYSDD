# 2.13 — Anxiety

**Presenting symptom:** Anxiety (fear, worry, apprehension)

> After ruling out substance and medical causes, the anxiety disorders are differentiated by the FOCUS of the fear/anxiety: separation from attachment figures, specific objects/situations, social scrutiny, unexpected panic and its consequences, or pervasive worry across domains. Obsessive-compulsive and trauma-related disorders are considered when the anxiety is tied to obsessions/compulsions or to a traumatic event.

## Decision flow

```mermaid
flowchart TD
  START(["Anxiety (fear, worry, apprehension)"]) --> Nn1
  Nn1{"Is the anxiety due to the physiological effects of a substance/medication (e.g., caffeine,"}
  Nn1 -->|Yes| T0["Substance/Medication-Induced Anxiety Disorder → Substance/Medication-Induced Anxiety Disor"]
  Nn1 -->|No| Nn2
  Nn2{"Is it due to the physiological effects of a general medical condition (e.g., hyperthyroidi"}
  Nn2 -->|Yes| T1["Anxiety Disorder Due to Another Medical Condition → Anxiety Disorder Due to Another Medica"]
  Nn2 -->|No| Nn3
  Nn3{"Is the anxiety focused on separation from attachment figures?"}
  Nn3 -->|Yes| T2["Separation Anxiety Disorder → Separation Anxiety Disorder"]
  Nn3 -->|No| Nn4
  Nn4{"Is it cued by a specific object or situation (e.g., heights, animals, injections)?"}
  Nn4 -->|Yes| T3["Specific Phobia → Specific Phobia"]
  Nn4 -->|No| Nn5
  Nn5{"Is it focused on social situations involving possible scrutiny by others?"}
  Nn5 -->|Yes| T4["Social Anxiety Disorder → Social Anxiety Disorder"]
  Nn5 -->|No| Nn6
  Nn6{"Are there recurrent unexpected panic attacks with persistent worry about further attacks o"}
  Nn6 -->|Yes| T5["Panic Disorder → Panic Disorder"]
  Nn6 -->|No| Nn7
  Nn7{"Is it focused on situations where escape may be difficult or help unavailable (e.g., publi"}
  Nn7 -->|Yes| T6["Agoraphobia → Agoraphobia"]
  Nn7 -->|No| Nn8
  Nn8{"Is it driven by obsessions and/or compulsions?"}
  Nn8 -->|Yes| T7["Obsessive-Compulsive Disorder → Obsessive-Compulsive Disorder"]
  Nn8 -->|No| Nn9
  Nn9{"Does it follow exposure to a traumatic event with re-experiencing, avoidance, and hyperaro"}
  Nn9 -->|Yes| T8["PTSD / Acute Stress Disorder → Posttraumatic Stress Disorder"]
  Nn9 -->|No| Nn10
  Nn10{"Is there excessive worry about multiple events/activities, more days than not for ≥6 month"}
  Nn10 -->|Yes| T9["Generalized Anxiety Disorder → Generalized Anxiety Disorder"]
  Nn10 -->|No| Nn11
  Nn11{"Is the anxiety a maladaptive response to an identifiable psychosocial stressor?"}
  Nn11 -->|Yes| T10["Adjustment Disorder, With Anxiety → Adjustment Disorder"]
  Nn11 -->|No| Nn12
  Nn12{"Are clinically significant anxiety symptoms present but below threshold for a specific dis"}
  Nn12 -->|Yes| T11["Other Specified / Unspecified Anxiety Disorder → Other Specified / Unspecified Anxiety Dis"]
  Nn12 -->|No| T12["Anxiety within normal limits — not a mental disorder"]
```

## Decision points

- **Is the anxiety due to the physiological effects of a substance/medication (e.g., caffeine, stimulants, withdrawal)?**
  - **Yes →** Substance/Medication-Induced Anxiety Disorder — _[Substance/Medication-Induced Anxiety Disorder](excessive-substance-use.md)_
  - **No →** Is it due to the physiological effects of a general medical condition (e.g., hyperthyroidism, arrhythmia)?
- **Is it due to the physiological effects of a general medical condition (e.g., hyperthyroidism, arrhythmia)?**
  - **Yes →** Anxiety Disorder Due to Another Medical Condition — _[Anxiety Disorder Due to Another Medical Condition](etiological-medical-conditions.md)_
  - **No →** Is the anxiety focused on separation from attachment figures?
- **Is the anxiety focused on separation from attachment figures?**
  - **Yes →** Separation Anxiety Disorder — _[Separation Anxiety Disorder](../tables/3-5-1.md)_
  - **No →** Is it cued by a specific object or situation (e.g., heights, animals, injections)?
- **Is it cued by a specific object or situation (e.g., heights, animals, injections)?**
  - **Yes →** Specific Phobia — _[Specific Phobia](../tables/3-5-3.md)_
  - **No →** Is it focused on social situations involving possible scrutiny by others?
- **Is it focused on social situations involving possible scrutiny by others?**
  - **Yes →** Social Anxiety Disorder — _[Social Anxiety Disorder](../tables/3-5-4.md)_
  - **No →** Are there recurrent unexpected panic attacks with persistent worry about further attacks or their consequences?
- **Are there recurrent unexpected panic attacks with persistent worry about further attacks or their consequences?**
  - **Yes →** Panic Disorder — _[Panic Disorder](../tables/3-5-5.md)_
  - **No →** Is it focused on situations where escape may be difficult or help unavailable (e.g., public transport, open/enclosed spaces, crowds)?
- **Is it focused on situations where escape may be difficult or help unavailable (e.g., public transport, open/enclosed spaces, crowds)?**
  - **Yes →** Agoraphobia — _[Agoraphobia](../tables/3-5-6.md)_
  - **No →** Is it driven by obsessions and/or compulsions?
- **Is it driven by obsessions and/or compulsions?**
  - **Yes →** Obsessive-Compulsive Disorder — _[Obsessive-Compulsive Disorder](../tables/3-6-1.md)_
  - **No →** Does it follow exposure to a traumatic event with re-experiencing, avoidance, and hyperarousal?
- **Does it follow exposure to a traumatic event with re-experiencing, avoidance, and hyperarousal?**
  - **Yes →** PTSD / Acute Stress Disorder — _[Posttraumatic Stress Disorder](../tables/3-7-1.md)_
  - **No →** Is there excessive worry about multiple events/activities, more days than not for ≥6 months, hard to control?
- **Is there excessive worry about multiple events/activities, more days than not for ≥6 months, hard to control?**
  - **Yes →** Generalized Anxiety Disorder — _[Generalized Anxiety Disorder](../tables/3-5-7.md)_
  - **No →** Is the anxiety a maladaptive response to an identifiable psychosocial stressor?
- **Is the anxiety a maladaptive response to an identifiable psychosocial stressor?**
  - **Yes →** Adjustment Disorder, With Anxiety — _[Adjustment Disorder](../tables/3-7-2.md)_
  - **No →** Are clinically significant anxiety symptoms present but below threshold for a specific disorder?
- **Are clinically significant anxiety symptoms present but below threshold for a specific disorder?**
  - **Yes →** Other Specified / Unspecified Anxiety Disorder — _[Other Specified / Unspecified Anxiety Disorder](../tables/3-5-7.md)_
  - **No →** Anxiety within normal limits — not a mental disorder


---
_Summarizes differentiating features only. Confirm against the full DSM-5 criteria. See [the six-step method](../framework.md)._
