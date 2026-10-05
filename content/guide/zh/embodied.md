# 具身智能：从看见到行动

让机器人把杯子放到架子上，需要看清杯子与架子的位置，选动作，控制身体，还要应对杯子滑了、角度变了、之前没见过的环境。你在视频里看到几秒钟的动作，背后连着数据、学习、控制和系统。

## 先找一个动作看明白

先看 [ACT / ALOHA](https://tonyzhaozh.github.io/aloha/) 的项目视频和方法图。选一个双臂操作任务，沿着示范数据、相机输入、动作预测去理解它。再看 [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/)，比较另一种动作建模方式。

第一次读到这里，能说清模型看到什么、输出什么、怎样判断任务完成，就可以带着问题继续。

## 接下来可以走几条路

**操作与模仿学习。** 从人给出的示范中学习动作。继续看数据怎样采集、动作怎样表示、训练与部署有什么差别。用 [LeRobot](https://github.com/huggingface/lerobot)看项目结构和数据入口。

**VLA 与泛化。** 语言、视觉和动作怎样连接？换指令、物体或环境后能否继续工作？配合[多模态](multimodal.md)看模型，用 [Open X-Embodiment](https://robotics-transformer-x.github.io/)看不同来源的机器人数据。

**强化学习与控制。** 如果动作需要通过反馈改进，就回[强化学习](rl.md)。想理解接触、几何与控制本身，可以查 [MIT Robotic Manipulation](https://manipulation.csail.mit.edu/)；动力学与控制还可进入 [Underactuated Robotics](https://underactuated.mit.edu/)。

## 怎样开始动手

先在数据里找到一段真实任务，看看图像与动作怎样对应，再尝试所选项目的推理或仿真例子。[RoboTwin](https://robotwin-platform.github.io/)是继续了解仿真任务、数据和评价的入口。

真实机器人、仿真和只读离线数据需要的条件不同。选中项目后先看设备、显存、系统与数据要求，再决定做到哪一层。

## 继续找路线与论文

[Lumina 具身智能指南](https://github.com/TianxingChen/Embodied-AI-Guide)用来查看更完整的版图。已有问题后，再查 [RL-VLA](https://github.com/Denghaoyuan123/Awesome-RL-VLA)、[人形机器人学习](https://github.com/YanjieZe/awesome-humanoid-robot-learning)或[高效 VLA](https://github.com/guanweifan/awesome-efficient-vla)的论文索引。

看一次成功演示之后，也问问失败集中在哪里、起始条件怎样设定。这个问题会把你带回[实验与评估](experiments.md)。

## 继续看清单、观点与团队

[Lumina、课程和项目](catalog-directions.md#topic-19)与[具身细分 paper list](catalog-directions.md#topic-20)都保留在目录里。想认识具体做这些事的人，去[课题组入口](labs.md)；数据和 scaling 方面也可读[邹嘉轩的观点](blogs.md#zou)。
