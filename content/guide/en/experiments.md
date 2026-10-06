# Understand your experiments

After an experiment, you should understand a question better. Writing down what you want to find out beforehand saves a lot of purposeless running.

## Narrow the question

Suppose an agent fails on long tasks. Ask where failure begins: did it forget earlier information, or did a tool call fail?

Read complete traces for a small set of tasks and group the observed failures before deciding whether memory or recovery mechanisms would help. This is a way to formulate an investigation, not a report of an experiment already done.

Bring a question from reading into the experiment record: which paper and figure it comes from, the conditions of the conclusion, the factor you will change, and the observation you expect. Write these down before choosing what to run. [irene's reading and evidence notes](irene-workflow.md#depth) offer a way to organize the question.

## Run the baseline before changing the model

Run a baseline and record data and model versions, configuration, seed, code version, and evaluation method. What a seed controls depends on implementation; also record repeated runs.

Save separate results for important changes. Match comparisons to claims: computational cost for efficiency, repeated runs and failure types for reliability. You can record quality, latency, and cost together.

[Karpathy's training recipe](https://karpathy.github.io/2019/04/25/recipe/) helps with basic diagnosis. The [Deep Learning Tuning Playbook](https://github.com/google-research/tuning_playbook) helps organize tuning and experiments. [Scikit-learn's common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html) explains leakage, preprocessing, and randomness concretely.

## What should you record for each experiment?

Record the question, configuration, expectation, actual result, location of raw outputs, and next judgment. Record failures too. Writing, debugging, and collaboration later depend on this material.

Start with these lines:

> What I am investigating:  
> What changed from the previous version:  
> Data and running conditions:  
> What happened and where the records are:  
> My current explanation and remaining uncertainty:  
> How I will distinguish the possible explanations next:

## Progress without a positive result

For unexpected results, check the process before revising the explanation. Narrow the scope and inspect samples rather than only aggregate scores.

When you have no new approach, take the records to someone else. A clear discussion can help more than another batch of similar runs. See [communication](contact.md).

Next, [write the claims and evidence](writing.md), or read [other people's experiences](experience.md).

## A concrete research judgment

Chai's [LoopDiT and AutomationBench analyses](blogs.md#chai) discuss comparison conditions and scoring. Pair them with the [LessWrong measurement essays](lesswrong.md#measurement): what does your score actually measure?
