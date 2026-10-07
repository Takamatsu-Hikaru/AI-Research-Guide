# AI 交叉学科：从其他学科的问题出发

AI 可以帮助化学家筛选分子、帮助生物学家分析细胞，也可以用于天气预测、数学证明和金融建模。研究者还在尝试让 AI 自己选择训练方案、运行实验和改进代码。

<nav class="topic-map" aria-label="方向概览">
<div><h3>自然科学与医学</h3><a href="#molecule">分子、反应与材料</a><a href="#physics">物理模拟与气象</a><a href="#protein">蛋白质与酶</a><a href="#genome">基因组与调控</a><a href="#cell">单细胞与虚拟细胞</a><a href="#eeg">脑电与神经解码</a><a href="#image">医学影像</a></div>
<div><h3>数学、金融与数据</h3><a href="#math">数学与算法发现</a><a href="#finance">金融与量化研究</a><a href="#graphs">图学习与时间序列</a></div>
<div><h3>让研究过程自动化</h3><a href="#automl">AutoML</a><a href="#research">自动研究</a><a href="#rsi">RSI 与自我改进</a></div>
</nav>

<section id="process" class="process">
<div class="process-head"><h2 id="ai4x-process">AI 怎样参与研究</h2><button id="motion-toggle" type="button">暂停</button></div>
<div id="scene-groups" class="scene-groups" aria-label="研究类别"></div>
<div id="scene-tabs" class="scene-tabs" role="tablist" aria-label="研究方向"></div>
<div class="scene-select"><select id="topic-select" hidden aria-label="研究方向"><option value="molecule">分子、反应与材料</option><option value="physics">物理模拟与气象</option><option value="protein">蛋白质与酶</option><option value="genome">基因组与调控</option><option value="cell">单细胞与虚拟细胞</option><option value="eeg">脑电与神经解码</option><option value="image">医学影像</option><option value="math">数学与算法发现</option><option value="finance">金融与量化研究</option><option value="graphs">图学习与时间序列</option><option value="automl">AutoML</option><option value="research">自动研究</option><option value="rsi">RSI 与自我改进</option></select><a id="read-topic" href="#molecule">阅读这一方向 ↓</a></div>
<div id="process-labels" class="process-labels"></div><div id="scene-host"></div><div class="scene-progress" aria-hidden="true"><i></i></div>
</section>

<section class="ai4x-domain" data-topic="molecule" data-group="自然科学与医学" data-short="分子、反应与材料">
<h2 id="molecule">化学与材料：预测性质、规划反应、寻找新材料</h2>
<p>一个分子是否易溶于水，一种晶体是否稳定，一组反应物会生成什么？AI 可以从结构和实验记录中预测性质、筛选候选，也可以学习能量与力，降低分子动力学的计算成本。</p>
<button type="button" class="see-process" data-scene="molecule">查看过程图 ↗</button>
<div class="task-list">
<div><h3>性质预测</h3><p>把分子表示成原子与键组成的图，或带三维坐标的结构，预测溶解度、能量等目标量。MPNN 是图学习进入量子化学的经典入口。</p></div>
<div><h3>反应与合成</h3><p>正向预测从反应物推断产物；逆合成从目标分子寻找前体和合成路线。Molecular Transformer 把反应物与产物的 SMILES 字符串当作序列来建模。</p></div>
<div><h3>材料发现与模拟</h3><p>GNoME 用图网络和第一性原理计算筛选稳定晶体；Deep Potential 学习势能，提供分子动力学所需的能量与力。主动学习会根据已有结果选择下一批计算或实验。</p></div>
</div>
<ol class="route">
<li><span>2017</span><strong>MPNN</strong><p>结构 → 性质</p></li>
<li><span>2018–2019</span><strong>Deep Potential / Molecular Transformer</strong><p>模拟与反应预测</p></li>
<li><span>2023</span><strong>GNoME</strong><p>模型筛选 + DFT 验证</p></li>
</ol>
<div data-ai4x-papers="ai4x-mpnn,ai4x-deep-potential"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/1811.02633">Molecular Transformer ↗</a><span>2019 · 反应预测</span></li>
<li><a href="https://www.nature.com/articles/s41586-023-06735-9">GNoME ↗</a><span>2023 · 晶体稳定性与材料发现</span></li>
<li><a href="https://github.com/deepchem/deepchem">DeepChem ↗</a><span>分子任务与教程</span></li>
<li><a href="https://tdcommons.ai/">Therapeutics Data Commons ↗</a><span>药物发现任务与数据</span></li>
<li><a href="https://github.com/deepmodeling/deepmd-kit">DeePMD-kit ↗</a><span>学习势能与分子动力学</span></li>
</ul>
<dl class="terms">
<div><dt>SMILES</dt><dd>用字符串记录分子结构的表示方式。</dd></div>
<div><dt>DFT</dt><dd>密度泛函理论，一类计算电子结构、能量等性质的方法。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>用 DeepChem 的一个溶解度数据集，比较分子指纹加传统回归与图网络。分别使用随机划分和分子骨架划分，看看换到新骨架后误差怎样变化。</p></div>
</section>

<section class="ai4x-domain" data-topic="physics" data-group="自然科学与医学" data-short="物理模拟与气象">
<h2 id="physics">物理与气象：学习方程的解，预测系统的演化</h2>
<p>流体怎样运动、温度怎样扩散、未来几天的天气怎样变化，通常都涉及随空间和时间变化的物理量。AI 可以近似这些方程的求解过程，也可以根据观测预测物理系统的演化。</p>
<button type="button" class="see-process" data-scene="physics">查看过程图 ↗</button>
<div class="task-list">
<div><h3>把方程放进训练</h3><p>物理信息神经网络（PINNs）把方程残差、边界条件和观测误差一起用于训练。研究重点包括约束怎样发挥作用，以及模型怎样处理复杂区域和多尺度变化。</p></div>
<div><h3>学习一类问题的解</h3><p>神经算子学习函数到函数的映射，例如从初始条件预测整个流场。FNO 在频域中构造运算，用一组问题的解训练，再处理新的输入条件。</p></div>
<div><h3>预测天气与不确定性</h3><p>GraphCast 用图网络预测全球气象场；后续概率预测路线通过多个可能的未来描述不确定性。研究者会比较预测误差、极端天气表现和计算时间。</p></div>
</div>
<ol class="route">
<li><span>2019</span><strong>PINNs</strong><p>方程约束进入训练</p></li>
<li><span>2021</span><strong>FNO</strong><p>学习函数之间的映射</p></li>
<li><span>2023</span><strong>GraphCast</strong><p>全球气象场预测</p></li>
</ol>
<div data-ai4x-papers="fno"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://maziarraissi.github.io/PINNs/">PINNs ↗</a><span>作者介绍与例子</span></li>
<li><a href="https://arxiv.org/abs/2010.08895">Fourier Neural Operator ↗</a><span>2021 · ICLR</span></li>
<li><a href="https://arxiv.org/abs/2212.12794">GraphCast ↗</a><span>2023 · Science</span></li>
<li><a href="https://github.com/neuraloperator/neuraloperator">NeuralOperator ↗</a><span>神经算子实现与教程</span></li>
</ul>
<dl class="terms">
<div><dt>PDE</dt><dd>偏微分方程，描述一个量如何随空间、时间等变量变化。</dd></div>
<div><dt>神经算子</dt><dd>学习输入函数到输出函数映射的模型，例如初始场到未来流场。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>从一维扩散或 Burgers 方程开始，用数值解作为参照，比较模型在不同初始条件下的预测；画出误差随时间的变化。</p></div>
</section>

<section class="ai4x-domain" data-topic="protein" data-group="自然科学与医学" data-short="蛋白质与酶">
<h2 id="protein">蛋白质与酶：从序列到结构，再到功能设计</h2>
<p>蛋白质由氨基酸序列组成，折叠后的结构与它能做什么密切相关。AI 既可以预测结构，也可以寻找具有目标性质的天然序列，或者提出新的设计。</p>
<button type="button" class="see-process" data-scene="protein">查看过程图 ↗</button>
<div class="task-list">
<div><h3>表征与结构预测</h3><p>蛋白质语言模型从序列中学习可迁移特征；AlphaFold2 结合序列、进化信息和几何关系预测三维结构。AlphaFold3 进一步处理蛋白质、核酸与小分子等组成的复合物。</p></div>
<div><h3>序列与骨架设计</h3><p>ProteinMPNN 根据给定骨架设计序列，RFdiffusion 生成满足约束的骨架，ESM3 联合利用序列、结构和功能信息。设计流程会接着检查表达、稳定性、结合或催化活性。</p></div>
<div><h3>酶挖掘与改造</h3><p>酶挖掘从天然序列库找候选；酶工程改造已有酶；从头设计围绕目标反应构建新候选。VenusMine 从结构与序列线索检索，VenusRXN 从化学反应出发匹配酶。</p></div>
</div>
<ol class="route">
<li><span>2021</span><strong>AlphaFold2</strong><p>结构预测</p></li>
<li><span>2022–2023</span><strong>ProteinMPNN / RFdiffusion</strong><p>序列与骨架设计</p></li>
<li><span>2025–2026</span><strong>AMix-1 / AMix-2</strong><p>条件生成与蛋白质—文本建模</p></li>
</ol>
<details class="deeper"><summary>继续读</summary>
<h3>酶工程怎样形成实验循环</h3><p>零样本打分可以先对突变排序；少量实测数据可用于拟合指定性质；主动学习则根据已有结果与不确定性挑选下一批实验。每轮把新测得的活性或稳定性写回数据，再更新候选排序。</p>
<h3>从头设计看哪些约束</h3><p>可以围绕催化核心寻找承载它的骨架，也可以在已有骨架中组织局部相互作用。催化几何、可折叠性、稳定性以及反应条件，都决定了后续需要做什么实验。</p>
<h3>基础模型的新路线</h3><p>AMix-1 用贝叶斯流网络建模蛋白质，并探索多序列比对条件与推理时搜索；AMix-2 把蛋白质和文本纳入统一建模，采用块间因果生成、块内扩散。阅读时可以分别追踪条件输入、候选生成和验证器的作用。</p>
</details>
<div data-ai4x-papers="ai4x-alphafold2,amix"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://www.nature.com/articles/s41586-024-07487-w">AlphaFold3 ↗</a><span>复合物结构预测</span></li>
<li><a href="https://github.com/dauparas/ProteinMPNN">ProteinMPNN ↗</a><span>给定骨架设计序列</span></li>
<li><a href="https://www.nature.com/articles/s41586-023-06415-8">RFdiffusion ↗</a><span>生成蛋白质骨架</span></li>
<li><a href="https://www.evolutionaryscale.ai/blog/esm3-release">ESM3 ↗</a><span>序列、结构与功能生成</span></li>
<li><a href="https://www.nature.com/articles/s41467-025-61599-z">VenusMine ↗</a><span>结构引导的酶挖掘</span></li>
<li><a href="https://www.biorxiv.org/content/10.64898/2026.03.09.710689v1">VenusRXN ↗</a><span>反应条件下的酶检索</span></li>
<li><a href="https://arxiv.org/abs/2507.08920">AMix-1 ↗</a><span>贝叶斯流网络与推理时搜索</span></li>
<li><a href="https://arxiv.org/abs/2605.30963">AMix-2 ↗</a><span>蛋白质与文本统一建模</span></li>
</ul>
<dl class="terms">
<div><dt>MSA</dt><dd>多序列比对，把相关蛋白质序列对齐，用来观察进化中的保守与变化。</dd></div>
<div><dt>逆折叠</dt><dd>给定蛋白质骨架，寻找能够形成该结构的氨基酸序列。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>选一个带实测性质的蛋白质数据集，比较简单序列特征与冻结的预训练表征。按同源关系划分数据，检查新家族上的预测；结构任务可以先读 AlphaFold 的一个预测结果和置信度图。</p></div>
</section>

<section class="ai4x-domain" data-topic="genome" data-group="自然科学与医学" data-short="基因组与调控">
<h2 id="genome">基因组：序列变化怎样影响基因调控</h2>
<p>DNA 变异可以改变蛋白质编码，也可以影响调控元件、表达或剪接。基因组模型尝试把长序列中的这些关系变成可预测的信号，帮助研究者分析变异发生后可能改变什么。</p>
<button type="button" class="see-process" data-scene="genome">查看过程图 ↗</button>
<div class="task-list">
<div><h3>序列到信号</h3><p>输入一段 DNA，预测表达、染色质可及性、转录因子结合或剪接等实验相关信号。</p></div>
<div><h3>比较变异前后</h3><p>分别输入原始序列和变异序列，比较预测的变化。AlphaGenome 是结合长序列与多任务输出的代表工作。</p></div>
<div><h3>连接细胞背景</h3><p>同一个变异在不同组织或细胞状态中可能产生不同影响。把序列模型与细胞模型联系起来，需要对齐组织、条件和测量对象。</p></div>
</div>
<ol class="route">
<li><span>序列建模</span><strong>DNA 上下文</strong><p>理解编码与调控区域</p></li>
<li><span>多任务预测</span><strong>AlphaGenome</strong><p>同时预测多种分子信号</p></li>
<li><span>变异分析</span><strong>对照与干预</strong><p>比较预测与实验变化</p></li>
</ol>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://deepmind.google/blog/alphagenome-ai-for-better-understanding-the-genome/">AlphaGenome 研究介绍 ↗</a><span>问题、输入输出与示例</span></li>
<li><a href="https://github.com/google-deepmind/alphagenome">AlphaGenome ↗</a><span>官方工具与示例</span></li>
</ul>
<dl class="terms">
<div><dt>非编码区域</dt><dd>不直接编码蛋白质的 DNA 区域，其中一部分参与基因调控。</dd></div>
<div><dt>剪接</dt><dd>RNA 加工中连接外显子、去除内含子的过程，不同方式可产生不同转录本。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>沿官方示例比较一个变异前后的预测轨迹，记录位置、组织和输出信号，说明变化发生在哪个区段，并寻找相应实验测量。</p></div>
</section>

<section class="ai4x-domain" data-topic="cell" data-group="自然科学与医学" data-short="单细胞与虚拟细胞">
<h2 id="cell">细胞：理解状态，预测干预后的变化</h2>
<p>单细胞数据记录每个细胞中哪些基因正在表达。研究从“这是什么细胞、处于什么状态”继续走向“改动一个基因或加入药物，它会怎样响应”。空间组学还保留细胞在组织中的位置。</p>
<button type="button" class="see-process" data-scene="cell">查看过程图 ↗</button>
<div class="task-list">
<div><h3>细胞表征</h3><p>Geneformer、scGPT、UCE 从大量单细胞数据学习基因或细胞表示，用于注释、整合等任务。数据处理需要保留生物差异，同时处理测序深度、噪声和批次影响。</p></div>
<div><h3>扰动与虚拟细胞</h3><p>给定细胞背景、基因或药物扰动，预测表达变化。虚拟细胞希望进一步连接模态、尺度与动态过程；扰动响应是其中一个明确的研究任务。</p></div>
<div><h3>空间关系与生物制造</h3><p>FLAG 从病理图像预测空间基因表达，关注基因之间和组织位置之间的关系。生物制造还研究代谢网络、表达负担与资源分配，辅助提出菌株改造方案。</p></div>
</div>
<ol class="route">
<li><span>表征</span><strong>Geneformer / scGPT / UCE</strong><p>学习细胞与基因表示</p></li>
<li><span>关系</span><strong>scPRINT / FLAG</strong><p>基因网络与空间结构</p></li>
<li><span>响应</span><strong>虚拟细胞</strong><p>预测干预后的状态</p></li>
</ol>
<details class="deeper"><summary>继续读</summary>
<h3>状态、动力学与数据建设</h3><p>不少单细胞数据是不同细胞的测量快照。研究时间演化时，需要结合采样时间、谱系或扰动实验。数据应记录组织、供体、批次和测量模态；扰动数据还要记录对象、剂量、时间与对照。</p>
<h3>基因网络与空间结构怎样评价</h3><p>基因关联网络可与已知调控和干预数据对照；空间表达预测则同时比较逐点误差、基因之间的关系和空间分布。针对未来用途，可以留出新供体、新组织或未见扰动。</p>
</details>
<div data-ai4x-papers="flag"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://www.nature.com/articles/s41586-023-06139-9">Geneformer ↗</a><span>2023 · 单细胞预训练</span></li>
<li><a href="https://www.nature.com/articles/s41592-024-02201-0">scGPT ↗</a><span>2024 · 单细胞基础模型</span></li>
<li><a href="https://doi.org/10.1101/2023.11.28.568918">UCE ↗</a><span>跨数据集细胞表示</span></li>
<li><a href="https://www.nature.com/articles/s41467-025-58699-1">scPRINT ↗</a><span>基因网络推断</span></li>
<li><a href="https://arxiv.org/abs/2605.18055">FLAG ↗</a><span>2026 · 空间表达预测</span></li>
<li><a href="https://scanpy.readthedocs.io/en/stable/tutorials/">Scanpy 教程 ↗</a><span>单细胞处理、降维与聚类</span></li>
</ul>
<dl class="terms">
<div><dt>批次效应</dt><dd>由实验时间、设备或流程差异带来的系统性数据变化。</dd></div>
<div><dt>扰动预测</dt><dd>根据基因编辑、药物等干预及细胞背景，预测细胞响应。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>用 Scanpy 处理一个公开单细胞数据集，先做质量控制、PCA 和聚类，再比较预训练表示。分别按细胞类型与实验批次着色，观察分组究竟来自哪里。</p></div>
</section>

<section class="ai4x-domain" data-topic="eeg" data-group="自然科学与医学" data-short="脑电与神经解码">
<h2 id="eeg">脑电：从神经信号到状态识别与解码</h2>
<p>脑电记录头皮电极上的电信号随时间怎样变化。AI 可以帮助识别状态、检测事件、学习跨被试表示，也可以把信号与看见的图像等刺激建立联系。</p>
<button type="button" class="see-process" data-scene="eeg">查看过程图 ↗</button>
<div class="task-list">
<div><h3>时序与空间表征</h3><p>电极位置、采样率、滤波和伪迹处理共同决定输入。模型会利用频段、时间变化及通道之间的关系。</p></div>
<div><h3>基础模型与迁移</h3><p>预训练后可以冻结编码器做线性探测，也可以微调；同一被试内和新被试上的测试回答不同问题。EEG-FM-Compass 整理了这类评估。</p></div>
<div><h3>视觉解码与生成</h3><p>DreamDiffusion 把脑电表征连接到预训练图像生成模型，并利用 CLIP 视觉监督。EEG-CLIP 是另一条对齐路线，可对照它们怎样建立信号与图像的联系。</p></div>
</div>
<ol class="route">
<li><span>信号处理</span><strong>时频特征</strong><p>从通道与时间认识数据</p></li>
<li><span>2023</span><strong>DreamDiffusion</strong><p>信号对齐与条件生成</p></li>
<li><span>2026</span><strong>EEG-FM-Compass</strong><p>基础模型与迁移评估</p></li>
</ol>
<details class="deeper"><summary>继续读</summary>
<h3>怎样检查解码用了什么信息</h3><p>先固定刺激和被试划分，再比较正确配对、打乱配对和移除脑电条件的结果。这样能观察生成结果有多少依赖输入信号，以及新被试、会话或设备会带来什么变化。</p>
</details>
<div data-ai4x-papers="dreamdiffusion"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/2601.17883">EEG-FM-Compass ↗</a><span>2026 · 综述与评估</span></li>
<li><a href="https://arxiv.org/abs/2306.16934">DreamDiffusion ↗</a><span>脑电引导图像生成</span></li>
<li><a href="https://doi.org/10.1016/j.neunet.2025.108167">EEG-CLIP ↗</a><span>脑电与视觉表征对齐</span></li>
<li><a href="https://mne.tools/stable/auto_tutorials/index.html">MNE 教程 ↗</a><span>脑电数据、预处理与可视化</span></li>
</ul>
<dl class="terms">
<div><dt>被试</dt><dd>参与实验、提供神经信号的人。</dd></div>
<div><dt>伪迹</dt><dd>眼动、肌电或设备等引入的非目标信号。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>用 MNE 查看一段公开脑电，画出原始波形与功率谱，再做一个事件分类。把训练与测试按被试分开，比较传统特征和预训练表示。</p></div>
</section>

<section class="ai4x-domain" data-topic="image" data-group="自然科学与医学" data-short="医学影像">
<h2 id="image">医学影像：定位结构，测量运动与功能</h2>
<p>在 CT、MRI 或病理图像中，模型可以标出器官与病灶、对齐不同图像，再从轮廓和运动中计算体积等指标。影像方法由计算机视觉发展而来，研究问题则来自具体的检查与测量需求。</p>
<button type="button" class="see-process" data-scene="image">查看过程图 ↗</button>
<div class="task-list">
<div><h3>三维分割</h3><p>3D U-Net、V-Net 处理体数据；UNet++ 调整多尺度特征融合；Swin UNETR 引入 Transformer 上下文建模。可以对照它们怎样保留细节、利用空间关系。</p></div>
<div><h3>配准与功能测量</h3><p>配准估计图像或不同时间帧之间的对应。CMRINet 联合分析心脏电影 MRI 的配准与分割，把结构识别连接到心脏功能量化。</p></div>
<div><h3>纵向变化</h3><p>随访图像帮助研究病程与变化。需要记录采样时间、治疗、缺失随访等条件；外部中心与设备的数据可用于检验方法的适用性。</p></div>
</div>
<ol class="route">
<li><span>2016</span><strong>3D U-Net / V-Net</strong><p>体数据分割</p></li>
<li><span>2018–2022</span><strong>UNet++ / Swin UNETR</strong><p>特征融合与全局上下文</p></li>
<li><span>2025</span><strong>CMRINet</strong><p>时序结构与功能分析</p></li>
</ol>
<div data-ai4x-papers="cmrinet"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/1606.06650">3D U-Net ↗</a><span>三维分割</span></li>
<li><a href="https://arxiv.org/abs/1606.04797">V-Net ↗</a><span>体数据与 Dice 目标</span></li>
<li><a href="https://arxiv.org/abs/1807.10165">UNet++ ↗</a><span>嵌套跳跃连接</span></li>
<li><a href="https://arxiv.org/abs/2201.01266">Swin UNETR ↗</a><span>三维 Transformer 分割</span></li>
<li><a href="https://arxiv.org/abs/1904.10030">边界损失 ↗</a><span>类别不平衡与轮廓</span></li>
<li><a href="https://arxiv.org/abs/2505.16452">CMRINet ↗</a><span>联合配准与分割</span></li>
<li><a href="https://github.com/Project-MONAI/tutorials">MONAI Tutorials ↗</a><span>数据处理与训练示例</span></li>
</ul>
<dl class="terms">
<div><dt>体素</dt><dd>三维图像中的一个小体积单元，对应二维图像的像素。</dd></div>
<div><dt>Dice / HD95</dt><dd>前者衡量区域重叠，后者描述轮廓距离，两者关注不同错误。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>从 MONAI 的一个分割例子开始，按患者划分数据。并排显示原图、标注和预测，比较区域重叠与边界距离，挑出三种典型错误。</p></div>
</section>

<section class="ai4x-domain" data-topic="math" data-group="数学、金融与数据" data-short="数学与算法发现">
<h2 id="math">数学与算法：搜索证明，发现更好的构造</h2>
<p>数学中的 AI 可以提出证明步骤、补充几何构造，也可以搜索满足条件的对象和更高效的算法。一个关键优势是：不少候选能交给形式化证明器、程序或精确计算来检查。</p>
<button type="button" class="see-process" data-scene="math">查看过程图 ↗</button>
<div class="task-list">
<div><h3>证明搜索</h3><p>AlphaGeometry 将语言模型提出的辅助构造与符号推理结合。形式化证明路线则把命题和步骤写进 Lean 等系统，由内核检查证明。</p></div>
<div><h3>数学构造</h3><p>FunSearch 让语言模型提出程序，再运行评价函数挑选有用的候选；论文研究了 cap set 等组合问题。模型搜索的是产生构造的程序。</p></div>
<div><h3>算法发现</h3><p>AlphaEvolve 将代码生成、评价器与进化搜索结合，寻找更好的算法和数学构造。运行速度、正确性或目标值可以成为反馈。</p></div>
</div>
<ol class="route">
<li><span>2023</span><strong>FunSearch</strong><p>程序生成 + 评价</p></li>
<li><span>2024</span><strong>AlphaGeometry / AlphaProof</strong><p>构造搜索与证明</p></li>
<li><span>2025</span><strong>AlphaEvolve</strong><p>算法的迭代优化</p></li>
</ol>
<div data-ai4x-papers="alphageometry"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://www.nature.com/articles/s41586-023-06924-6">FunSearch ↗</a><span>2023 · 数学构造与程序搜索</span></li>
<li><a href="https://deepmind.google/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/">AlphaGeometry ↗</a><span>2024 · 辅助构造与符号推理</span></li>
<li><a href="https://deepmind.google/blog/ai-solves-imo-problems-at-silver-medal-level/">AlphaProof ↗</a><span>形式化数学推理</span></li>
<li><a href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/">AlphaEvolve ↗</a><span>2025 · 算法发现</span></li>
<li><a href="https://leanprover-community.github.io/mathematics_in_lean/">Mathematics in Lean ↗</a><span>形式化证明入门</span></li>
</ul>
<dl class="terms">
<div><dt>形式化证明</dt><dd>用精确定义和推理规则写出、由证明助手检查的证明。</dd></div>
<div><dt>评价器</dt><dd>执行候选并给出正确性或目标分数的程序。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>可以先用 Lean 完成几道基础证明，看看“步骤看起来对”和“系统接受证明”之间需要补哪些条件；也可以给一个装箱启发式写评价器，让模型提出修改并在留出的实例上比较。</p></div>
</section>

<section class="ai4x-domain" data-topic="finance" data-group="数学、金融与数据" data-short="金融与量化研究">
<h2 id="finance">金融：从文本和时序数据到预测与决策</h2>
<p>金融 AI 涉及财报与新闻理解、风险识别、时间序列预测、组合构建和交易执行。模型的输入既有价格、成交量等结构化数据，也有公告和报告中的文字。</p>
<button type="button" class="see-process" data-scene="finance">查看过程图 ↗</button>
<div class="task-list">
<div><h3>金融文本</h3><p>FinGPT 提供金融语言模型及数据、微调等研究入口，可以从情绪、事件和信息抽取任务理解领域语言建模。</p></div>
<div><h3>量化预测与回测</h3><p>Qlib 把数据处理、特征、模型、组合与回测连接起来。因子是用于描述或预测市场行为的特征，研究需要追踪它在什么时间能够被获得。</p></div>
<div><h3>决策与自动研发</h3><p>FinRL 研究序列决策；RD-Agent-Quant 让 Agent 迭代因子和模型。评价中会同时看收益、风险、换手率、交易成本和不同市场时期的表现。</p></div>
</div>
<ol class="route">
<li><span>2020</span><strong>Qlib</strong><p>完整量化研究流程</p></li>
<li><span>2021–2023</span><strong>FinRL / FinGPT</strong><p>决策与金融语言模型</p></li>
<li><span>2025</span><strong>RD-Agent-Quant</strong><p>因子与模型联合优化</p></li>
</ol>
<div data-ai4x-papers="qlib"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://github.com/microsoft/qlib">Qlib ↗</a><span>框架、论文与研究示例</span></li>
<li><a href="https://github.com/AI4Finance-Foundation/FinGPT">FinGPT ↗</a><span>金融文本与大模型</span></li>
<li><a href="https://arxiv.org/abs/2111.09395">FinRL ↗</a><span>强化学习交易研究框架</span></li>
<li><a href="https://arxiv.org/abs/2505.15155">RD-Agent-Quant ↗</a><span>因子与模型自动优化</span></li>
<li><a href="https://qlib.readthedocs.io/en/stable/">Qlib 文档 ↗</a><span>数据与回测流程</span></li>
</ul>
<dl class="terms">
<div><dt>回测</dt><dd>按历史时间推进，模拟当时可获得的信息与决策结果。</dd></div>
<div><dt>前视偏差</dt><dd>在预测或决策时使用了当时尚不可获得的信息。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>阅读 Qlib 的一个预测与回测例子，标出特征、标签、训练期和测试期。用同一时间划分比较一个简单模型与复杂模型，并查看计入交易成本前后的结果。</p></div>
</section>

<section class="ai4x-domain" data-topic="graphs" data-group="数学、金融与数据" data-short="图学习与时间序列">
<h2 id="graphs">图学习与时间序列：研究关系和变化</h2>
<p>交通、社交、交易和电网都包含关系，也随时间变化。图学习处理“谁与谁相连”，时间序列处理“过去怎样影响未来”，两者还可以组合成时空预测。</p>
<button type="button" class="see-process" data-scene="graphs">查看过程图 ↗</button>
<div class="task-list">
<div><h3>节点、边和整体结构</h3><p>图任务可以预测节点类别、是否存在一条关系，或整张图的性质。分子图与社交网络共享消息传递等方法，但标签和评价不同。</p></div>
<div><h3>趋势、周期与预测</h3><p>时序研究会区分趋势、周期和异常，比较统计方法与深度学习方法。测试按时间推进，以匹配真正预测未来的使用方式。</p></div>
<div><h3>时空系统</h3><p>路网中的道路相连，交通状态又随时间变化。建模时既要描述空间依赖，也要解释外部事件和时间尺度。</p></div>
</div>
<ol class="route">
<li><span>关系</span><strong>图与消息传递</strong><p>节点、边、整图任务</p></li>
<li><span>变化</span><strong>趋势与周期</strong><p>时间顺序中的预测</p></li>
<li><span>组合</span><strong>时空图</strong><p>交通等动态系统</p></li>
</ol>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://web.stanford.edu/class/cs224w/">Stanford CS224W ↗</a><span>图机器学习课程</span></li>
<li><a href="https://otexts.com/fpp3/">Forecasting: Principles and Practice ↗</a><span>统计预测教材 · R</span></li>
<li><a href="https://github.com/timeseriesAI/tsai">tsai ↗</a><span>Python 时间序列工具</span></li>
</ul>
<dl class="terms">
<div><dt>消息传递</dt><dd>节点聚合邻居与边的信息，逐层更新自己的表示。</dd></div>
<div><dt>滚动预测</dt><dd>随着时间前移，反复使用当时已有的数据预测后续区间。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>在一个时间序列上比较“最后一个值”、季节性参照与学习模型，做滚动预测；图任务则先画出节点和边各代表什么，再决定训练与测试怎样划分。</p></div>
</section>

<section class="ai4x-domain" data-topic="automl" data-group="让研究过程自动化" data-short="AutoML">
<h2 id="automl">AutoML：自动选择模型和训练配置</h2>
<p>学习率、树的深度、特征处理和网络结构都会影响结果。AutoML 研究怎样在给定任务和计算预算内，自动找到较好的模型与训练方案。</p>
<button type="button" class="see-process" data-scene="automl">查看过程图 ↗</button>
<div class="task-list">
<div><h3>超参数优化</h3><p>网格搜索、随机搜索、贝叶斯优化等方法决定下一组配置。Optuna 支持动态搜索空间和剪枝，提前停止表现不佳的试验。</p></div>
<div><h3>模型与流程选择</h3><p>自动选择数据预处理、特征处理、模型和集成方案。比较时需固定数据划分和预算，记录搜索本身的开销。</p></div>
<div><h3>结构搜索与元学习</h3><p>神经架构搜索（NAS）寻找网络结构；元学习利用过去任务的经验帮助新任务。可以研究怎样减少搜索成本、怎样跨任务迁移。</p></div>
</div>
<ol class="route">
<li><span>配置</span><strong>HPO</strong><p>学习率等超参数</p></li>
<li><span>流程</span><strong>模型与特征选择</strong><p>完整学习流程</p></li>
<li><span>结构与经验</span><strong>NAS / Meta-learning</strong><p>结构搜索与跨任务知识</p></li>
</ol>
<div data-ai4x-papers="optuna"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://www.automl.org/book/">AutoML 教材 ↗</a><span>方法、系统与开放问题</span></li>
<li><a href="https://optuna.org/">Optuna ↗</a><span>搜索、剪枝与可视化</span></li>
<li><a href="https://arxiv.org/abs/1907.10902">Optuna 论文 ↗</a><span>2019 · KDD</span></li>
</ul>
<dl class="terms">
<div><dt>超参数</dt><dd>训练前设定的配置，如学习率、正则强度或层数。</dd></div>
<div><dt>剪枝</dt><dd>根据中途结果停止希望较小的训练，把预算留给其他试验。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>给一个已有分类器限定 20 次训练预算，比较随机搜索与 Optuna。画出“累计耗时—当前最佳验证分数”，最后只用保留的测试集评价选出的配置。</p></div>
</section>

<section class="ai4x-domain" data-topic="research" data-group="让研究过程自动化" data-short="自动研究">
<h2 id="research">自动研究：让想法进入实验，再用结果继续推进</h2>
<p>科研中有不少可执行环节：查资料、提出候选、改代码、运行实验、分析结果和写报告。自动研究系统尝试把这些环节连接起来，让上一次结果影响下一步实验。</p>
<button type="button" class="see-process" data-scene="research">查看过程图 ↗</button>
<div class="task-list">
<div><h3>实验循环</h3><p>autoresearch 围绕单 GPU 的语言模型训练实验，让 Agent 修改训练代码并比较结果。系统根据评价指标选择是否保留改动，实验受固定的训练预算约束。</p></div>
<div><h3>从想法到论文</h3><p>AI Scientist 将实验设计、代码执行、结果分析和论文撰写组织在同一流程中；v2 进一步探索 Agent 驱动的树搜索。</p></div>
<div><h3>研究证据与记录</h3><p>每个候选对应配置、代码版本、运行日志和结果。读这类系统时，可以从一个结论反查它由哪些实验支持，以及失败的候选如何影响后续选择。</p></div>
</div>
<ol class="route">
<li><span>2024</span><strong>AI Scientist</strong><p>实验、分析与写作</p></li>
<li><span>2025</span><strong>AI Scientist-v2</strong><p>Agent 驱动的树搜索</p></li>
<li><span>训练实验</span><strong>autoresearch</strong><p>受预算约束的迭代</p></li>
</ol>
<div data-ai4x-papers="ai-scientist"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://github.com/SakanaAI/AI-Scientist">AI Scientist ↗</a><span>初代系统与实验模板</span></li>
<li><a href="https://arxiv.org/abs/2504.08066">AI Scientist-v2 ↗</a><span>2025 · 树搜索研究流程</span></li>
<li><a href="https://github.com/karpathy/autoresearch">autoresearch ↗</a><span>自动迭代训练实验</span></li>
</ul>
<dl class="terms">
<div><dt>实验预算</dt><dd>允许消耗的训练时间、算力、调用次数等资源。</dd></div>
<div><dt>Agentic tree search</dt><dd>把不同实验方案及后续改动组织成树，根据已有结果继续探索。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>从已有的小实验开始，固定数据、评价与运行预算，让 Agent 提出三种修改并实际执行。把每个修改、日志和结果放在一起，写出下一轮选择哪条路线及原因。</p></div>
</section>

<section class="ai4x-domain" data-topic="rsi" data-group="让研究过程自动化" data-short="RSI 与自我改进">
<h2 id="rsi">RSI：系统能否改进自身的改进能力</h2>
<p>递归自我改进（Recursive Self-Improvement）关注一个更进一步的问题：系统修改自己之后，能否变得更擅长做下一轮改进？研究对象可以是 Agent 的代码、工具、搜索策略，也可以涉及学习算法。</p>
<button type="button" class="see-process" data-scene="rsi">查看过程图 ↗</button>
<div class="task-list">
<div><h3>谁在被修改</h3><p>AutoML 通常搜索预设空间中的配置；自动研究系统推进外部课题；自我改进系统还把自身工作方式作为修改对象。阅读时先找到实际变化的代码、策略或参数。</p></div>
<div><h3>怎样保存和选择版本</h3><p>Darwin Gödel Machine（DGM）让编码 Agent 修改自身代码，保存多个版本，并通过编码任务评估后继续探索。它的核心循环是版本生成、测试、保留与再次修改。</p></div>
<div><h3>怎样观察持续改进</h3><p>除了单次任务分数，还要比较多轮改进曲线、总计算成本和新任务上的效果。下一轮究竟因为系统能力改变而更好，还是因为投入了更多搜索，需要设计对照。</p></div>
</div>
<ol class="route">
<li><span>提出修改</span><strong>自身代码与工具</strong><p>形成新版本</p></li>
<li><span>执行测试</span><strong>固定任务与预算</strong><p>比较能力变化</p></li>
<li><span>继续改进</span><strong>版本档案与选择</strong><p>追踪多轮效果</p></li>
</ol>
<div data-ai4x-papers="dgm"></div>
<h3>论文与学习入口</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/2505.22954">Darwin Gödel Machine ↗</a><span>2025 · 自我改进编码 Agent</span></li>
<li><a href="https://sakana.ai/dgm/">DGM 项目介绍 ↗</a><span>方法、实验与代码入口</span></li>
<li><a href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/">AlphaEvolve ↗</a><span>对照：有评价器的代码搜索</span></li>
</ul>
<dl class="terms">
<div><dt>自我修改</dt><dd>系统改变自身的代码、工具或策略。DGM 主要修改 Agent 代码。</dd></div>
<div><dt>递归改进</dt><dd>一次改进还改变了继续改进的能力，从而形成后续迭代。</dd></div>
</dl>
<div class="exercise"><h3>可以动手做什么</h3><p>先读 DGM 的版本树，挑一个具体代码改动，追踪它怎样被提出、怎样被测量、后续版本是否继承它。再为一个简单工具 Agent 设计固定预算的版本对照。</p></div>
</section>

## 把一个交叉问题做成小项目

选定一个问题后，把数据、模型和验证接成一条完整的研究流程。

1. **说清研究对象。** 一个样本是一条序列、一名患者、一个细胞，还是某个时刻的市场？目标量怎样测得，有什么单位？
2. **保留学科结构。** 分子有旋转与对称性，图有关系，时序有先后，医学图像有体素间距。表示、模型和损失各自保留了哪些信息？
3. **确定要面对的新条件。** 新分子骨架、新蛋白质家族、新供体、新被试、新患者或未来时间段，对应不同的数据划分。
4. **建立参照，再分析变化。** 比较简单方法与新模型，检查错误集中在哪些条件；候选设计接入后续计算或实验，记录这轮结果怎样影响下一步。

学习时间序列还可以看 [Forecasting: Principles and Practice](https://otexts.com/fpp3/) 的趋势、预测与评价方法，教材示例使用 R；Python 项目可看 [tsai](https://github.com/timeseriesAI/tsai)。

[AI for Science 资料索引](https://github.com/ai4s-research/awesome-ai-for-science) · [AI4X 资料目录](catalog-directions.md#topic-23) · [科研问答](research.md) · [联系与合作](contact.md) · [实验与记录](experiments.md)
