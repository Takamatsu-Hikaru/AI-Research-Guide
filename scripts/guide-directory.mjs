const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(url,name)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(name)} ↗</a>`;
export const companies=[
 ['tencent','腾讯 · 混元','Tencent · Hunyuan','https://hunyuan.tencent.com/','https://github.com/Tencent-Hunyuan','语言、多模态、图像与视频生成；从混元开源项目进入模型、报告与示例。','Language, multimodal, image and video models; explore releases, reports and examples through Hunyuan.'],
 ['xiaomi','小米 · MiMo','Xiaomi · MiMo','https://mimo.xiaomi.com/','https://mimo.xiaomi.com/papers/','语言推理、视觉与语音模型；论文入口集中展示训练方法和模型设计。','Reasoning, vision and speech models, with papers on training methods and model design.'],
 ['bytedance','字节跳动 · Seed','ByteDance · Seed','https://seed.bytedance.com/','https://seed.bytedance.com/en/research','大模型、语音、视觉、世界模型与 AI 系统；研究页可以按主题追踪项目。','Language, speech, vision, world models and AI systems, organized by research area.'],
 ['kimi','月之暗面 · Kimi','Moonshot AI · Kimi','https://www.kimi.com/','https://github.com/MoonshotAI','长上下文、推理与 Agent；从 Kimi 的开源模型看训练、工具使用和评测。','Long context, reasoning and agents; open models connect training, tool use and evaluation.'],
 ['deepseek','DeepSeek','DeepSeek','https://www.deepseek.com/','https://www.deepseek.com/en/transparency/','MoE、训练效率与推理模型；技术报告能串起架构、训练和工程取舍。','MoE, efficient training and reasoning models, with reports connecting architecture, training and engineering.'],
 ['qwen','阿里巴巴 · Qwen','Alibaba · Qwen','https://qwen.ai/','https://github.com/QwenLM','语言、代码、视觉语言与全模态模型；按模型系列找权重、示例和报告。','Language, code, vision-language and omni-modal models, with weights, examples and reports by model family.'],
 ['minimax','MiniMax','MiniMax','https://www.minimax.io/','https://github.com/MiniMax-AI','长上下文、推理及多模态生成；可对照注意力设计与推理成本读报告。','Long-context reasoning and multimodal generation; compare attention design and inference cost.'],
 ['glm','智谱 · GLM','Z.ai · GLM','https://z.ai/','https://github.com/zai-org','语言推理、代码和 Agent；GLM 系列提供模型实现、使用方法与研究材料。','Reasoning, coding and agents, with model implementations, usage examples and research material.'],
 ['google','Google DeepMind','Google DeepMind','https://deepmind.google/','https://deepmind.google/research/publications/','Gemini、机器人、强化学习与科学发现；论文页连接模型报告和具体研究。','Gemini, robotics, reinforcement learning and scientific discovery, with papers and model reports.'],
 ['openai','OpenAI','OpenAI','https://openai.com/','https://openai.com/research/','语言、多模态、推理与 Agent；研究发布和系统卡介绍能力、评测与模型行为。','Language, multimodal, reasoning and agent research, with evaluations and system cards.'],
 ['anthropic','Anthropic','Anthropic','https://www.anthropic.com/','https://www.anthropic.com/research','Claude、可解释性与对齐；研究文章常展开实验设计和模型内部行为。','Claude, interpretability and alignment, including experimental methods and model behavior.'],
 ['meta','Meta AI','Meta AI','https://ai.meta.com/','https://ai.meta.com/research/','Llama、视觉与多模态研究；开放模型报告提供数据、训练和部署的系统描述。','Llama, vision and multimodal research, with open-model reports covering data, training and deployment.']
];
export const reports=[
 ['openai','GPT-4',2023,'report','2303.08774','规模预测、能力评测与后训练。','Scaling predictions, capability evaluation and post-training.'],
 ['openai','GPT-4o',2024,'card','2410.21276','多模态输入输出与语音交互的系统评测。','Multimodal input/output and evaluations of voice interaction.'],
 ['anthropic','Claude Sonnet 4.5',2025,'card','https://assets.anthropic.com/m/12f214efcc2f457a/original/Claude-Sonnet-4-5-System-Card.pdf','编码与 Agent 评测、对齐及模型行为测试。','Coding and agent evaluations, alignment and model behavior tests.'],
 ['google','Gemini 1.5',2024,'report','2403.05530','长上下文检索、跨模态理解与百万 token 评测。','Long-context retrieval, multimodal understanding and million-token evaluations.'],
 ['google','Gemini 2.5',2025,'report','2507.06261','推理、多模态与 Agent 能力的训练和评测。','Training and evaluation of reasoning, multimodal and agent capabilities.'],
 ['meta','Llama 3',2024,'report','2407.21783','数据配比、预训练、后训练和大规模训练基础设施。','Data mixtures, pre-training, post-training and large-scale infrastructure.'],
 ['deepseek','DeepSeek-V3',2024,'report','2412.19437','MoE、MLA、负载均衡与 FP8 训练。','MoE, MLA, load balancing and FP8 training.'],
 ['deepseek','DeepSeek-R1',2025,'report','2501.12948','推理强化学习、冷启动数据与蒸馏。','Reasoning through RL, cold-start data and distillation.'],
 ['qwen','Qwen2.5',2024,'report','2412.15115','预训练数据、指令微调与不同规模模型的能力。','Pre-training data, instruction tuning and capabilities across model sizes.'],
 ['qwen','Qwen2.5-VL',2025,'report','2502.13923','动态分辨率、视频理解与视觉定位。','Dynamic resolution, video understanding and visual localization.'],
 ['qwen','Qwen3',2025,'report','2505.09388','稠密与 MoE、思考模式、多语言和蒸馏。','Dense and MoE models, thinking modes, multilingual training and distillation.'],
 ['qwen','Qwen3-Omni',2025,'report','2509.17765','文本、图像、音频和视频的统一处理。','Unified processing of text, images, audio and video.'],
 ['kimi','Kimi K2',2025,'report','2507.20534','MoE、优化器与大规模工具交互训练。','MoE, optimization and large-scale training for tool interaction.'],
 ['glm','GLM-4.5',2025,'report','2508.06471','混合推理模式、多阶段后训练、代码与 Agent。','Hybrid reasoning modes, staged post-training, coding and agents.'],
 ['minimax','MiniMax-01',2025,'report','2501.08313','Lightning Attention、MoE 与长上下文。','Lightning Attention, MoE and long context.'],
 ['minimax','MiniMax-M1',2025,'report','2506.13585','长上下文推理与测试时计算。','Long-context reasoning and test-time computation.'],
 ['tencent','Hunyuan-Large',2024,'report','2411.02265','MoE 架构、数据合成和训练扩展。','MoE architecture, synthetic data and training at scale.'],
 ['bytedance','Seed1.5-Thinking',2025,'report','2504.13914','推理强化学习、训练稳定性与能力评测。','Reasoning RL, training stability and capability evaluation.'],
 ['xiaomi','MiMo',2025,'report','2505.07608','预训练与后训练怎样共同改善推理。','How pre-training and post-training jointly improve reasoning.'],
 ['deepseek','DeepSeek-V3.2',2025,'report','https://huggingface.co/deepseek-ai/DeepSeek-V3.2/blob/main/assets/paper.pdf','稀疏注意力、推理强化学习与 Agent 任务合成。','Sparse attention, reasoning RL and synthetic agent tasks.'],
 ['deepseek','DeepSeek-V4',2026,'report','2606.19348','混合压缩注意力、长上下文与后训练流程。','Hybrid compressed attention, long context and the post-training pipeline.'],
 ['kimi','Kimi K2.5',2026,'report','2602.02276','视觉与语言训练、工具使用和并行 Agent。','Vision-language training, tool use and parallel agents.'],
 ['glm','GLM-5',2026,'report','2602.15763','长任务 Agent、异步强化学习与软件工程评测。','Long-horizon agents, asynchronous RL and software-engineering evaluations.'],
 ['xiaomi','MiMo-Audio',2025,'report','https://mimo.xiaomi.com/papers/mimo-audio.pdf','语音表示、音频语言建模与语音任务评测。','Speech representations, audio language modeling and speech-task evaluation.'],
 ['xiaomi','MiMo-V2-Flash',2026,'report','2601.02780','模型架构、注意力设计与推理效率。','Model architecture, attention design and inference efficiency.']
];
export function reportDirectory(lang){const zh=lang==='zh';return `<section class="report-directory"><h2 id="industry-reports">${zh?'模型家族与技术报告':'Model families and technical reports'}</h2><p>${zh?'读报告时可以沿着一个问题比较：数据怎样选，训练目标怎样变，推理能力怎样测，成本又花在哪里。下面按团队整理原文和阅读重点。':'Compare reports through a concrete question: how data is chosen, how training objectives change, how reasoning is measured, or where compute is spent.'}</p>${companies.filter(c=>reports.some(r=>r[0]===c[0])).map(c=>`<section class="report-family" id="reports-${c[0]}"><h3><img src="../brands/${c[0]}.png" width="36" height="36" alt="">${esc(c[zh?1:2])}</h3><ul>${reports.filter(r=>r[0]===c[0]).map(r=>`<li><div>${link(r[4].startsWith('http')?r[4]:'https://arxiv.org/abs/'+r[4],r[1])}<span>${r[2]} · ${r[3]==='card'?(zh?'系统卡':'System card'):(zh?'技术报告':'Technical report')}</span></div><p>${esc(r[zh?5:6])}</p></li>`).join('')}</ul><p class="family-source">${link(c[4],zh?'团队研究与后续发布':'Research and further releases')}</p></section>`).join('')}</section>`}
export function companyDirectory(lang){const zh=lang==='zh';return `<section class="company-directory"><h2 id="company-research">${zh?'国内外 AI 团队与模型发布':'AI teams and model releases'}</h2><div class="company-grid">${companies.map(c=>`<section class="company-card"><h3><img src="../brands/${c[0]}.png" width="44" height="44" alt="">${esc(c[zh?1:2])}</h3><p>${esc(c[zh?5:6])}</p><div>${link(c[3],zh?'官网':'Website')}${link(c[4],zh?'研究与开源':'Research & releases')}</div></section>`).join('')}</div><p>${link('llm.html#industry-reports',zh?'按模型家族读技术报告':'Read technical reports by model family')}</p></section>`}
export function enrichDirectory(id,lang,html){if(id==='lookout'){const at=html.indexOf('<h2');html=html.slice(0,at)+companyDirectory(lang)+html.slice(at)}if(id==='home'||id==='lookout')html=html.replace(/(<h2[^>]*>[^<]*Lumina<\/h2>)/,m=>m+'<a href="https://lumina-embodied.ai/" target="_blank" rel="noopener"><img class="community-logo" src="../brands/lumina.webp" alt="Lumina"></a>');return html}
