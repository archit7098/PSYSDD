# 2.2 — Behavioral Problems in a Child or Adolescent

**Presenting symptom:** Behavioral problems in a child or adolescent

> Many behavioral problems in youth are not due to a mental disorder — some are subthreshold, some reflect family dysfunction, and some serious acts (e.g., for financial gain) fall outside DSM-5. Early-childhood onset points toward ADHD, ODD, DMDD, ASD, or intellectual disability; adolescent onset raises the role of substances and adolescent-onset conduct disorder, mood disorders, and psychosis.

## Decision flow

```mermaid
flowchart TD
  START(["Behavioral problems in a child or adolescent"]) --> Nn1
  Nn1{"Are the behaviors associated with substance use (including medication)?"}
  Nn1 -->|Yes| T0["Substance-related etiology → Substance/Medication-Induced Disorder, Intoxication, or Withd"]
  Nn1 -->|No| Nn2
  Nn2{"Are they due to the physiological effects of a general medical condition?"}
  Nn2 -->|Yes| T1["Medical etiology → Delirium Due to Another Medical Condition; Major/Mild Neurocognitive Di"]
  Nn2 -->|No| Nn3
  Nn3{"Do severe temper outbursts occur that are grossly out of proportion, with persistent anger"}
  Nn3 -->|Yes| T2["Disruptive Mood Dysregulation Disorder → Disruptive Mood Dysregulation Disorder"]
  Nn3 -->|No| Nn4
  Nn4{"Is there a persistent pattern of hyperactivity, impulsivity, and inattention across two or"}
  Nn4 -->|Yes| T3["Attention-Deficit/Hyperactivity Disorder → Attention-Deficit/Hyperactivity Disorder"]
  Nn4 -->|No| Nn5
  Nn5{"Is there a pattern of argumentativeness, defiance, and vindictiveness beyond developmental"}
  Nn5 -->|Yes| T4["Oppositional Defiant Disorder → Oppositional Defiant Disorder"]
  Nn5 -->|No| Nn6
  Nn6{"Do the behaviors occur with intellectual and adaptive deficits with onset in the developme"}
  Nn6 -->|Yes| T5["Intellectual Disability → Intellectual Disability"]
  Nn6 -->|No| Nn7
  Nn7{"Do they occur with persistent deficits in social communication/interaction plus restricted"}
  Nn7 -->|Yes| T6["Autism Spectrum Disorder → Autism Spectrum Disorder"]
  Nn7 -->|No| Nn8
  Nn8{"Are they a consequence of stereotyped, repetitive motor movements?"}
  Nn8 -->|Yes| T7["Stereotypic Movement Disorder → Stereotypic Movement Disorder"]
  Nn8 -->|No| Nn9
  Nn9{"Are they part of a repetitive, persistent pattern of antisocial behavior violating others'"}
  Nn9 -->|Yes| T8["Conduct Disorder → Conduct Disorder"]
  Nn9 -->|No| Nn10
  Nn10{"Is there deliberate, purposeful fire setting associated with arousal/fascination?"}
  Nn10 -->|Yes| T9["Pyromania → Pyromania"]
  Nn10 -->|No| Nn11
  Nn11{"Is there recurrent failure to resist impulses to steal objects not needed for use or monet"}
  Nn11 -->|Yes| T10["Kleptomania → Kleptomania"]
  Nn11 -->|No| Nn12
  Nn12{"Are the behaviors associated with periods of elevated, euphoric, or irritable mood plus in"}
  Nn12 -->|Yes| T11["Manic/Hypomanic Episode → Bipolar I Disorder; Bipolar II Disorder; Cyclothymic Disorder"]
  Nn12 -->|No| Nn13
  Nn13{"Are they associated with episodes of depressed/irritable mood plus other depressive sympto"}
  Nn13 -->|Yes| T12["Major Depressive Episode → Major Depressive Disorder; Persistent Depressive Disorder"]
  Nn13 -->|No| Nn14
  Nn14{"Are they associated with psychotic symptoms?"}
  Nn14 -->|Yes| T13["A psychotic disorder is present → Schizophrenia Spectrum / Other Psychotic Disorder"]
  Nn14 -->|No| Nn15
  Nn15{"Do the problems occur as a symptomatic response to a psychosocial stressor of an extremely"}
  Nn15 -->|Yes| T14["PTSD or Acute Stress Disorder → Posttraumatic Stress Disorder / Acute Stress Disorder"]
  Nn15 -->|No| Nn16
  Nn16{"Are they a maladaptive response to a (non-traumatic) psychosocial stressor?"}
  Nn16 -->|Yes| T15["Adjustment Disorder → Adjustment Disorder"]
  Nn16 -->|No| Nn17
  Nn17{"Are the problems clinically significant and representative of a psychological/biological d"}
  Nn17 -->|Yes| T16["Residual category → Other Specified / Unspecified Disruptive, Impulse-Control, and Conduct"]
  Nn17 -->|No| Nn18
  Nn18{"Is the behavior illegal behavior for gain or revenge (not a dysfunction in the individual)"}
  Nn18 -->|Yes| T17["Child or Adolescent Antisocial Behavior (V/Z code)"]
  Nn18 -->|No| T18["Age-appropriate rambunctious behavior — not a mental disorder"]
```

## Decision points

- **Are the behaviors associated with substance use (including medication)?**
  - **Yes →** Substance-related etiology — _[Substance/Medication-Induced Disorder, Intoxication, or Withdrawal](excessive-substance-use.md); [Substance Use Disorder](../tables/3-15-1.md)_
  - **No →** Are they due to the physiological effects of a general medical condition?
- **Are they due to the physiological effects of a general medical condition?**
  - **Yes →** Medical etiology — _[Delirium Due to Another Medical Condition](../tables/3-16-1.md); [Major/Mild Neurocognitive Disorder, with Behavioral Disturbance](../tables/3-16-2.md); [Personality Change Due to Another Medical Condition](../tables/3-17-11.md)_
  - **No →** Do severe temper outbursts occur that are grossly out of proportion, with persistent anger/irritability between them?
- **Do severe temper outbursts occur that are grossly out of proportion, with persistent anger/irritability between them?**
  - **Yes →** Disruptive Mood Dysregulation Disorder — _[Disruptive Mood Dysregulation Disorder](../tables/3-4-4.md)_
  - **No →** Is there a persistent pattern of hyperactivity, impulsivity, and inattention across two or more settings with onset before age 12?
- **Is there a persistent pattern of hyperactivity, impulsivity, and inattention across two or more settings with onset before age 12?**
  - **Yes →** Attention-Deficit/Hyperactivity Disorder — _[Attention-Deficit/Hyperactivity Disorder](../tables/3-1-4.md)_
  - **No →** Is there a pattern of argumentativeness, defiance, and vindictiveness beyond developmental norms?
- **Is there a pattern of argumentativeness, defiance, and vindictiveness beyond developmental norms?**
  - **Yes →** Oppositional Defiant Disorder — _[Oppositional Defiant Disorder](../tables/3-14-1.md)_
  - **No →** Do the behaviors occur with intellectual and adaptive deficits with onset in the developmental period?
- **Do the behaviors occur with intellectual and adaptive deficits with onset in the developmental period?**
  - **Yes →** Intellectual Disability — _[Intellectual Disability](../tables/3-1-1.md)_
  - **No →** Do they occur with persistent deficits in social communication/interaction plus restricted, repetitive behaviors?
- **Do they occur with persistent deficits in social communication/interaction plus restricted, repetitive behaviors?**
  - **Yes →** Autism Spectrum Disorder — _[Autism Spectrum Disorder](../tables/3-1-3.md)_
  - **No →** Are they a consequence of stereotyped, repetitive motor movements?
- **Are they a consequence of stereotyped, repetitive motor movements?**
  - **Yes →** Stereotypic Movement Disorder — _Stereotypic Movement Disorder_
  - **No →** Are they part of a repetitive, persistent pattern of antisocial behavior violating others' rights or major norms?
- **Are they part of a repetitive, persistent pattern of antisocial behavior violating others' rights or major norms?**
  - **Yes →** Conduct Disorder — _[Conduct Disorder](../tables/3-14-3.md)_
  - **No →** Is there deliberate, purposeful fire setting associated with arousal/fascination?
- **Is there deliberate, purposeful fire setting associated with arousal/fascination?**
  - **Yes →** Pyromania — _Pyromania_
  - **No →** Is there recurrent failure to resist impulses to steal objects not needed for use or monetary value?
- **Is there recurrent failure to resist impulses to steal objects not needed for use or monetary value?**
  - **Yes →** Kleptomania — _Kleptomania_
  - **No →** Are the behaviors associated with periods of elevated, euphoric, or irritable mood plus increased energy?
- **Are the behaviors associated with periods of elevated, euphoric, or irritable mood plus increased energy?**
  - **Yes →** Manic/Hypomanic Episode — _[Bipolar I Disorder](../tables/3-3-1.md); [Bipolar II Disorder](../tables/3-3-2.md); [Cyclothymic Disorder](../tables/3-3-3.md)_
  - **No →** Are they associated with episodes of depressed/irritable mood plus other depressive symptoms?
- **Are they associated with episodes of depressed/irritable mood plus other depressive symptoms?**
  - **Yes →** Major Depressive Episode — _[Major Depressive Disorder](../tables/3-4-1.md); [Persistent Depressive Disorder](../tables/3-4-2.md)_
  - **No →** Are they associated with psychotic symptoms?
- **Are they associated with psychotic symptoms?**
  - **Yes →** A psychotic disorder is present — _[Schizophrenia Spectrum / Other Psychotic Disorder](../tables/3-2-1.md)_
  - **No →** Do the problems occur as a symptomatic response to a psychosocial stressor of an extremely traumatic nature, with re-experiencing?
- **Do the problems occur as a symptomatic response to a psychosocial stressor of an extremely traumatic nature, with re-experiencing?**
  - **Yes →** PTSD or Acute Stress Disorder — _[Posttraumatic Stress Disorder / Acute Stress Disorder](../tables/3-7-1.md)_
  - **No →** Are they a maladaptive response to a (non-traumatic) psychosocial stressor?
- **Are they a maladaptive response to a (non-traumatic) psychosocial stressor?**
  - **Yes →** Adjustment Disorder — _[Adjustment Disorder](../tables/3-7-2.md)_
  - **No →** Are the problems clinically significant and representative of a psychological/biological dysfunction, but not covered above?
- **Are the problems clinically significant and representative of a psychological/biological dysfunction, but not covered above?**
  - **Yes →** Residual category — _Other Specified / Unspecified Disruptive, Impulse-Control, and Conduct Disorder_
  - **No →** Is the behavior illegal behavior for gain or revenge (not a dysfunction in the individual)?
- **Is the behavior illegal behavior for gain or revenge (not a dysfunction in the individual)?**
  - **Yes →** Child or Adolescent Antisocial Behavior (V/Z code)
  - **No →** Age-appropriate rambunctious behavior — not a mental disorder


---
_Original synthesis of differentiating features only — no DSM criteria text reproduced. Confirm against the official DSM-5-TR criteria (e.g. "per DSM-5-TR criteria for …"). See [the six-step method](../framework.md). Decision support for clinician reference/research use — not a diagnostic substitute._
