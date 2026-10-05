# Embodied AI: from seeing to acting

Putting a cup on a shelf requires locating both objects, choosing actions, controlling a body, and handling slipping, new angles, and unfamiliar environments. A few seconds of video connect data, learning, control, and systems.

## ACT and Diffusion Policy: where actions come from

Watch the [ACT / ALOHA](https://tonyzhaozh.github.io/aloha/) videos and method diagram. Pick a bimanual task and follow demonstration data, camera inputs, and action prediction. Then compare another way of modeling actions in [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/).

For a first reading, being able to explain what the model sees, what it outputs, and how success is judged gives you a basis for further questions.

## Imitation learning, VLA and control

**Manipulation and imitation learning.** Learn actions from human demonstrations. Investigate data collection, action representations, and differences between training and deployment. Use [LeRobot](https://github.com/huggingface/lerobot) to inspect project structure and data.

**VLA and generalization.** How do language, vision, and action connect? Does the system work with new instructions, objects, or environments? Pair the model with [multimodal learning](multimodal.md), and use [Open X-Embodiment](https://robotics-transformer-x.github.io/) to explore robot data from different sources.

**Reinforcement learning and control.** For improvement through feedback, return to [RL](rl.md). For contact, geometry, and control, consult [MIT Robotic Manipulation](https://manipulation.csail.mit.edu/) and [Underactuated Robotics](https://underactuated.mit.edu/).

## From robot data to simulation

Find a real task in a dataset and connect images to actions. Then try inference or simulation in the selected project. [RoboTwin](https://robotwin-platform.github.io/) is an entry to simulation tasks, data, and evaluation.

Real robots, simulation, and reading offline data have different requirements. Check hardware, GPU memory, operating system, and data requirements before deciding which level to attempt.

## Embodied learning paths and paper lists

[Lumina's Embodied AI Guide](https://github.com/TianxingChen/Embodied-AI-Guide) provides a wider map. Once you have a question, consult paper lists on [RL-VLA](https://github.com/Denghaoyuan123/Awesome-RL-VLA), [humanoid robot learning](https://github.com/YanjieZe/awesome-humanoid-robot-learning), or [efficient VLA](https://github.com/guanweifan/awesome-efficient-vla).

After a successful demo, ask where failures concentrate and how initial conditions were set. That leads back to [experiments and evaluation](experiments.md).

## Embodied communities, teams and scaling

The catalog preserves [Lumina, courses, and projects](catalog-directions.md#topic-19) and [specialized embodied paper lists](catalog-directions.md#topic-20). Meet researchers through [labs](labs.md); for data and scaling, read [Jiaxuan Zou](blogs.md#zou).
