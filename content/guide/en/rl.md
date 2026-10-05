# Reinforcement learning: actions have consequences

Some choices change what you can see and do next. A small reward now may cost a later opportunity in a game; a robot action affects whether the task can finish. RL studies learning to act from interaction feedback.

## States, actions, rewards and an interaction

Use [Hands-on Reinforcement Learning](https://hrl.boyuai.com/) to meet states, actions, rewards, returns, and policies. Then inspect how observations and actions flow in [Gymnasium Basic Usage](https://gymnasium.farama.org/introduction/basic_usage/).

Trace a run: what did the environment provide, what did the policy choose, how did the environment change, and when did the task end? Then study how an algorithm learns from those records.

## Value estimation and policy optimization

One route estimates future return from a situation or action; another directly adjusts the action-selection policy. Many algorithms combine them.

For expectations and conditional probability, revisit [mathematics](basics.md); for neural training, revisit DL. Choose an appropriate [CleanRL](https://docs.cleanrl.dev/) implementation and connect update equations to code.

For depth, use [Berkeley's deep RL course](https://rail.eecs.berkeley.edu/deeprlcourse/). Another Chinese explanation is [Easy RL](https://github.com/datawhalechina/easy-rl).

## Research routes in reinforcement learning

Language models produce tokens, agents call tools, and humanoids control joints. These applications share algorithms but differ in data, environments and evaluation. The routes below follow research questions; methods such as model-based and offline RL can also be used in robotics and other applications.

### Language-model post-training: improving responses through feedback

Once a model can generate text, how can it follow instructions or solve problems more reliably? RL can use a reward model trained on human preferences, or verifiable feedback from answers and program tests. Track where the reward comes from and whether higher reward corresponds to better responses.

- [InstructGPT](https://arxiv.org/abs/2203.02155): follow demonstrations, preference comparisons, reward modeling and policy optimization through the RLHF pipeline.
- [DeepSeek-R1](https://arxiv.org/abs/2501.12948): examine rewards for reasoning and the different training pipelines of R1-Zero and R1.
- [verl](https://github.com/verl-project/verl): connect response sampling, reward computation and policy updates to code. More model reports are on the [LLM page](llm.md).

### Agentic RL: learning to complete tasks over multiple turns

An action might search, run code or operate an interface. Its result affects the next decision. Training must account for an entire interaction: which actions contributed to success, how errors accumulated, and whether tool use actually helped.

- [Search-R1](https://arxiv.org/abs/2503.09516): integrates search into reasoning and uses RL to learn when to retrieve and how to use results; see the [project code](https://github.com/PeterGriffinJin/Search-R1).
- [RAGEN](https://arxiv.org/abs/2504.20073): studies training stability, environment feedback and policy learning in multi-turn interactions.

Trace a full trajectory: which text came from the model, which observations came from the environment, and when rewards arrived. Tool use and task execution are introduced on the [Agent page](agent.md).

### Humanoid control: from simulation to real robots

Balancing, walking, motion tracking and whole-body coordination require continuous control. Policies are often trained in simulation and transferred to hardware, where contact, latency and dynamics differ. Examine observations, action representations, rewards and how simulation is aligned with reality.

- [Humanoid-Gym](https://arxiv.org/abs/2404.05695): introduces simulation training and zero-shot sim-to-real transfer for humanoid locomotion.
- [ASAP](https://arxiv.org/abs/2502.01143): aligns simulated and real dynamics to learn agile whole-body skills.
- [Unitree RL Gym](https://github.com/unitreerobotics/unitree_rl_gym): follow robot configurations, training environments and deployment code. For manipulation and VLA models, continue to [embodied AI](embodied.md).

### Model-based RL: predicting the consequences of actions

Learn how an environment changes under actions, then use that model to train a policy or plan. Predictions can live in latent space without producing clear images. Distinguish learning a policy from imagined trajectories from searching over candidate actions during execution.

- [DreamerV3](https://arxiv.org/abs/2301.04104): learns a world model and trains behavior in imagined trajectories; follow the connection between model learning and policy learning.
- [TD-MPC2](https://arxiv.org/abs/2310.16828): learns a latent model for control and selects actions through model predictive control; compare its decision process with Dreamer's.

For broader work on prediction, video simulation and interactive environments, see [world models](world-model.md).

### Offline RL: learning from existing interaction data

When real-world trials are expensive or only previously collected data is available, a policy must learn from a fixed dataset. Behavior cloning imitates recorded actions. Offline RL also uses rewards and long-term returns, while addressing unreliable value estimates when a policy moves beyond the data distribution.

- [CQL](https://arxiv.org/abs/2006.04779): uses conservative value estimation to reduce overoptimism about actions poorly covered by the data.
- [IQL](https://arxiv.org/abs/2110.06169): combines implicit value learning with advantage-weighted policy extraction, reducing reliance on values of out-of-distribution actions during training.

Check which policies collected the data, which behaviors it covers, and how improvements beyond the demonstrations are evaluated.

### Multi-agent RL: coordinating multiple decision-makers

When several agents act together, each may see only part of the environment while the others' policies also change. Cooperation, competition, communication and credit assignment become central questions. A shared team reward makes individual contributions particularly hard to identify.

- [MAPPO](https://arxiv.org/abs/2103.01955): examines PPO in cooperative multi-agent tasks, including centralized value estimation and decentralized execution.
- [Official implementation](https://github.com/marlbenchmark/on-policy): compare local observations, global information and individual actions to understand what information is available during training and execution.

LLM multi-agent systems also involve coordination; whether they use RL depends on whether their policies are trained through interaction rewards.

## Change the reward and observe the policy

Keep configuration fixed in a small environment and repeat runs. Compare training curves and final behavior. Then change a reward setting and look for unexpected behavior. For unusual results, inspect actual trajectories first.

## RL textbooks, implementations and projects

Chinese textbooks, small environments, implementations, and advanced courses are in the [RL catalog](catalog-directions.md#topic-18). For robotics and control projects, see [labs](labs.md).
