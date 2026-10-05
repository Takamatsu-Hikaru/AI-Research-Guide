# Reinforcement learning: actions have consequences

Some choices change what you can see and do next. A small reward now may cost a later opportunity in a game; a robot action affects whether the task can finish. RL studies learning to act from interaction feedback.

## States, actions, rewards and an interaction

Use [Hands-on Reinforcement Learning](https://hrl.boyuai.com/) to meet states, actions, rewards, returns, and policies. Then inspect how observations and actions flow in [Gymnasium Basic Usage](https://gymnasium.farama.org/introduction/basic_usage/).

Trace a run: what did the environment provide, what did the policy choose, how did the environment change, and when did the task end? Then study how an algorithm learns from those records.

## Value estimation and policy optimization

One route estimates future return from a situation or action; another directly adjusts the action-selection policy. Many algorithms combine them.

For expectations and conditional probability, revisit [mathematics](basics.md); for neural training, revisit DL. Choose an appropriate [CleanRL](https://docs.cleanrl.dev/) implementation and connect update equations to code.

For depth, use [Berkeley's deep RL course](https://rail.eecs.berkeley.edu/deeprlcourse/). Another Chinese explanation is [Easy RL](https://github.com/datawhalechina/easy-rl).

## Change the reward and observe the policy

Keep configuration fixed in a small environment and repeat runs. Compare training curves and final behavior. Then change a reward setting and look for unexpected behavior. For unusual results, inspect actual trajectories first.

LLM post-training, agents, and robots can all use RL, but their states, actions, rewards, and data sources differ. Follow those four questions into [LLMs](llm.md), [agents](agent.md), or [embodied AI](embodied.md), rather than learning only algorithm abbreviations.

## RL textbooks, implementations and projects

Chinese textbooks, small environments, implementations, and advanced courses are in the [RL catalog](catalog-directions.md#topic-18). For robotics and control projects, see [labs](labs.md).
