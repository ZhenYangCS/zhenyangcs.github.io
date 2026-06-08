// =====================================================================
//  Publication data for Zhen Yang
//  Update this file whenever a new paper is added.
//  Each entry supports: title, authors (array of {name, me?, equal?}),
//  venue, year, links {arxiv, code, page, pdf, hf}, thumbs (array of
//  image paths -> rendered as a carousel), abbr, tags, description.
// =====================================================================

window.PAPERS = [
  {
    title: "Streaming Communication in Multi-Agent Reasoning",
    authors: [
      { name: "Zhen Yang", me: true },
      "Xiaogang Xu", "Wen Wang", "Cong Chen", "Xander Xu", "Ying-Cong Chen"
    ],
    venue: "arXiv",
    year: 2026,
    links: {
      arxiv: "https://arxiv.org/abs/2606.05158",
      code: "https://github.com/EnVision-Research/StreamMA",
      page: "https://zhenyangcs.github.io/StreamMA-website/",
    },
    citations: 0,
    tags: ["Multi-Agent", "LLM Reasoning", "Efficiency"],
    abbr: "StreamMA",
    thumbs: [
      "images/papers/streamma/01.webp"
    ],
    description: "A streaming protocol that lets reasoning agents talk while they think — faster, cheaper, and more accurate.",
    tldr: "Streaming reasoning steps between multi-agents makes the pipeline both faster and more accurate, and reveals a new step-level scaling law.",
    bibtex: `@article{yang2026streaming,
  title={Streaming Communication in Multi-Agent Reasoning},
  author={Yang, Zhen and Xu, Xiaogang and Wang, Wen and Chen, Cong and Xu, Xander and Chen, Ying-Cong},
  journal={arXiv preprint arXiv:2606.05158},
  year={2026}
}`
  },
  {
    title: "Less is More: Improving LLM Reasoning with Minimal Test-Time Intervention",
    authors: [
      { name: "Zhen Yang", me: true },
      "Mingyang Zhang", "Feng Chen", "Ganggui Ding", "Liang Hou", "Xin Tao", "Ying-Cong Chen"
    ],
    venue: "ACL 2026",
    year: 2025,
    links: {
      arxiv: "https://arxiv.org/abs/2510.13940",
      code: "https://github.com/EnVision-Research/MTI",
    },
    citations: 4,
    tags: ["LLM Reasoning", "Efficiency"],
    abbr: "MTI",
    thumbs: [
      "images/papers/mti/01.webp"
    ],
    description: "We show a tiny test-time nudge — applied at the right token, at the right moment — beats heavy retraining for LLM reasoning.",
    tldr: "Less intervention, better reasoning: MTI intervenes only on high-entropy tokens to improve LLM reasoning with minimal computation.",
    bibtex: `@article{yang2025less,
  title={Less is More: Improving LLM Reasoning with Minimal Test-Time Intervention},
  author={Yang, Zhen and Zhang, Mingyang and Chen, Feng and Ding, Ganggui and Hou, Liang and Tao, Xin and Chen, Ying-Cong},
  journal={arXiv preprint arXiv:2510.13940},
  year={2025}
}`
  },
  {
    title: "RectifiedHR: Enable Efficient High-Resolution Synthesis via Energy Rectification",
    authors: [
      { name: "Zhen Yang", me: true, equal: true },
      { name: "Guibao Shen", equal: true },
      { name: "Minyang Li", equal: true },
      "Liang Hou", "Mushui Liu", "Luozhou Wang",
      "Xin Tao", "Ying-Cong Chen"
    ],
    venue: "CVPR 2026 (Findings)",
    year: 2025,
    links: {
      arxiv: "https://arxiv.org/abs/2503.02537",
      code: "https://github.com/zhenyangcs/RectifiedHR-Diffusion",
      page: "https://zhenyangcs.github.io/RectifiedHR-Diffusion/",
      hf: "https://huggingface.co/papers/2503.02537",
    },
    citations: 5,
    thumbs: [
      "images/papers/rectifiedhr/01.webp",
      "images/papers/rectifiedhr/method.webp"
    ],
    tags: ["Visual Generation"],
    description: "A training-free recipe for crisp, high-resolution diffusion outputs — by rectifying the latent energy along the denoising trajectory.",
    tldr: "Makes training-free high-resolution synthesis faster, better, and more elegant.",
    bibtex: `@inproceedings{yang2026rectifiedhr,
  title={RectifiedHR: Enable Efficient High-Resolution Synthesis via Energy Rectification},
  author={Yang, Zhen and Shen, Guibao and Li, Minyang and Hou, Liang and Liu, Mushui and Wang, Luozhou and Tao, Xin and Chen, Ying-Cong},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={3809--3819},
  year={2026}
}`
  },
  {
    title: "Object-aware Inversion and Reassembly for Image Editing",
    authors: [
      { name: "Zhen Yang", me: true },
      "Ganggui Ding", "Wen Wang", "Hao Chen", "Bohan Zhuang", "Chunhua Shen"
    ],
    venue: "ICLR 2024",
    year: 2024,
    links: {
      arxiv: "https://arxiv.org/abs/2310.12149",
      code: "https://github.com/aim-uofa/OIR-Diffusion",
      page: "https://aim-uofa.github.io/OIR-Diffusion/",
    },
    citations: 42,
    tags: ["Visual Editing"],
    abbr: "OIR",
    thumbs: [
      "images/papers/oir/01.webp",
      "images/papers/oir/02.webp",
      "images/papers/oir/method.webp"
    ],
    description: "Decouples multi-object editing into per-object inversions, then reassembles — letting each edit speak without interfering.",
    tldr: "Editing tasks differ in difficulty; OIR is the first inversion-based method to achieve superior multi-object editing.",
    bibtex: `@inproceedings{yang2024object,
  title={Object-aware inversion and reassembly for image editing},
  author={Yang, Zhen and Ding, Ganggui and Wang, Wen and Chen, Hao and Zhuang, Bohan and Shen, Chunhua},
  booktitle={International Conference on Learning Representations},
  volume={2024},
  pages={50839--50862},
  year={2024}
}`
  },
  {
    title: "FreeCustom: Tuning-Free Customized Image Generation for Multi-Concept Composition",
    authors: [
      "Ganggui Ding", "Canyu Zhao", "Wen Wang",
      { name: "Zhen Yang", me: true },
      "Zide Liu", "Hao Chen", "Chunhua Shen"
    ],
    venue: "CVPR 2024 / IJCV 2025 (FreerCustom)",
    year: 2024,
    links: {
      arxiv: "https://arxiv.org/abs/2405.13870",
      code: "https://github.com/aim-uofa/FreeCustom",
      page: "https://aim-uofa.github.io/FreeCustom/",
    },
    citations: 77,
    tags: ["Visual Customization"],
    thumbs: [
      "images/papers/freecustom/01.webp"
    ],
    description: "Tuning-free, reference-driven multi-concept image generation. Extended to video in IJCV 2025 (FreerCustom).",
    tldr: "The first training-free customization method using a single reference image.",
    bibtex: `@inproceedings{ding2024freecustom,
  title={Freecustom: Tuning-free customized image generation for multi-concept composition},
  author={Ding, Ganggui and Zhao, Canyu and Wang, Wen and Yang, Zhen and Liu, Zide and Chen, Hao and Shen, Chunhua},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={9089--9098},
  year={2024}
}`
  },
  {
    title: "StereoPilot: Learning Unified and Efficient Stereo Conversion via Generative Priors",
    authors: [
      "Guibao Shen", "Yihua Du", "Wenhang Ge", "Jing He", "Chongjie Chang",
      "Dewei Zhou",
      { name: "Zhen Yang", me: true },
      "Luozhou Wang", "Xin Tao", "Ying-Cong Chen"
    ],
    venue: "arXiv",
    year: 2025,
    links: {
      arxiv: "https://arxiv.org/abs/2512.16915",
      code: "https://github.com/KlingTeam/StereoPilot",
    },
    citations: 1,
    tags: ["Stereo Generation"],
    thumbs: [
      "images/papers/stereopilot/01.webp"
    ],
    description: "Turns any 2D video into high-quality 3D stereo in a single step using generative priors.",
    bibtex: `@article{shen2025stereopilot,
  title={StereoPilot: Learning Unified and Efficient Stereo Conversion via Generative Priors},
  author={Shen, Guibao and Du, Yihua and Ge, Wenhang and He, Jing and Chang, Chirui and Zhou, Donghao and Yang, Zhen and Wang, Luozhou and Tao, Xin and Chen, Ying-Cong},
  journal={arXiv preprint arXiv:2512.16915},
  year={2025}
}`
  },
  {
    title: "FlexPainter: Flexible and Multi-View Consistent Texture Generation",
    authors: [
      "Dongyu Yan", "Leyi Wu", "Jiantao Lin", "Luozhou Wang", "Tianshuo Xu",
      "Zhifei Chen",
      { name: "Zhen Yang", me: true },
      "Lihuang Xu", "Shunsi Zhang", "Yingcong Chen"
    ],
    venue: "arXiv",
    year: 2025,
    links: {
      arxiv: "https://arxiv.org/abs/2506.02620",
      code: "https://github.com/StarRealMan/FlexPainter",
    },
    citations: 2,
    tags: ["3D Texture Generation"],
    thumbs: [
      "images/papers/flexpainter/01.webp",
      "images/papers/flexpainter/method.webp"
    ],
    description: "Multi-view consistent texture synthesis for 3D meshes — flexible inputs, harmonized outputs.",
    bibtex: `@article{yan2025flexpainter,
  title={FlexPainter: Flexible and Multi-View Consistent Texture Generation},
  author={Yan, Dongyu and Wu, Leyi and Lin, Jiantao and Wang, Luozhou and Xu, Tianshuo and Chen, Zhifei and Yang, Zhen and Xu, Lie and Zhang, Shunsi and Chen, Yingcong},
  journal={arXiv preprint arXiv:2506.02620},
  year={2025}
}`
  },
  {
    title: "Streaming Video Diffusion: Online Video Editing with Diffusion Models",
    authors: [
      { name: "Feng Chen", equal: true },
      { name: "Zhen Yang", me: true, equal: true },
      "Bohan Zhuang", "Qi Wu"
    ],
    venue: "arXiv",
    year: 2025,
    links: {
      arxiv: "https://arxiv.org/abs/2405.19726",
      code: "https://github.com/Chenfeng1271/SVDiff",
    },
    citations: 8,
    tags: ["Visual Editing"],
    abbr: "StreamingVD",
    thumbs: [
      "images/papers/streamingvd/01.webp"
    ],
    description: "An online video diffusion editor that processes long sequences frame-by-frame in a streaming manner.",
    tldr: "The first streaming framework for video editing with diffusion models.",
    bibtex: `@article{chen2024streaming,
  title={Streaming Video Diffusion: Online Video Editing with Diffusion Models},
  author={Chen, Feng and Yang, Zhen and Zhuang, Bohan and Wu, Qi},
  journal={arXiv preprint arXiv:2405.19726},
  year={2024}
}`
  },
  {
    title: "FreeCompose: Generic Zero-Shot Image Composition with Diffusion Prior",
    authors: [
      "Zhekai Chen", "Wen Wang",
      { name: "Zhen Yang", me: true },
      "Zeqing Yuan", "Hao Chen", "Chunhua Shen"
    ],
    venue: "ECCV 2024",
    year: 2024,
    links: {
      arxiv: "https://arxiv.org/abs/2407.04947",
      code: "https://github.com/aim-uofa/FreeCompose",
    },
    citations: 17,
    tags: ["Visual Editing"],
    thumbs: [
      "images/papers/freecompose/01.webp"
    ],
    description: "Compose, harmonize and re-light objects across images — zero-shot, with a frozen diffusion prior.",
    tldr: "The first training-free, generic image composition framework built on a frozen diffusion prior.",
    bibtex: `@inproceedings{chen2024freecompose,
  title={Freecompose: Generic zero-shot image composition with diffusion prior},
  author={Chen, Zhekai and Wang, Wen and Yang, Zhen and Yuan, Zeqing and Chen, Hao and Shen, Chunhua},
  booktitle={European Conference on Computer Vision},
  pages={70--87},
  year={2024},
  organization={Springer}
}`
  },
  {
    title: "LLM4GEN: Leveraging Semantic Representation of LLMs for Text-to-Image Generation",
    authors: [
      "Mushui Liu", "Yuhang Ma",
      { name: "Zhen Yang", me: true },
      "Jianhua Dan", "Yong Yu", "Zhe Zhao", "Zheng Hu", "Bin Liu", "Chao Fan"
    ],
    venue: "AAAI 2025",
    year: 2024,
    links: {
      arxiv: "https://arxiv.org/abs/2407.00737",
      code: "https://github.com/YUHANG-Ma/LLM4GEN",
    },
    citations: 63,
    tags: ["Visual Generation"],
    abbr: "LLM4GEN",
    thumbs: [
      "images/papers/llm4gen/01.webp"
    ],
    description: "Plugs the semantic richness of LLMs into text-to-image diffusion for sharper, more compositional outputs.",
    tldr: "Replacing the language module of diffusion models with a larger LLM improves performance.",
    bibtex: `@inproceedings{liu2025llm4gen,
  title={Llm4gen: Leveraging semantic representation of llms for text-to-image generation},
  author={Liu, Mushui and Ma, Yuhang and Yang, Zhen and Dan, Jun and Yu, Yunlong and Zhao, Zeng and Hu, Zhipeng and Liu, Bai and Fan, Changjie},
  booktitle={Proceedings of the AAAI conference on Artificial Intelligence},
  volume={39},
  number={5},
  pages={5523--5531},
  year={2025}
}`
  },
  {
    title: "LoRAPrune: Structured Pruning Meets Low-Rank Parameter-Efficient Fine-Tuning",
    authors: [
      "Mingyang Zhang", "Hao Chen", "Chunhua Shen",
      { name: "Zhen Yang", me: true },
      "Linlin Ou", "Xinyi Yu", "Bohan Zhuang"
    ],
    venue: "ACL Findings 2024",
    year: 2024,
    links: {
      arxiv: "https://arxiv.org/abs/2305.18403",
      code: "https://github.com/aim-uofa/LoRAPrune",
    },
    citations: 234,
    tags: ["Efficiency"],
    thumbs: [
      "images/papers/loraprune/01.webp"
    ],
    description: "Couples structured pruning with LoRA so that compression and adaptation reinforce each other.",
    tldr: "Repurposes LoRA as the importance indicator for LLM pruning.",
    bibtex: `@inproceedings{zhang2024loraprune,
  title={Loraprune: Structured pruning meets low-rank parameter-efficient fine-tuning},
  author={Zhang, Mingyang and Chen, Hao and Shen, Chunhua and Yang, Zhen and Ou, Linlin and Yu, Xinyi and Zhuang, Bohan},
  booktitle={Findings of the Association for Computational Linguistics: ACL 2024},
  pages={3013--3026},
  year={2024}
}`
  },
  {
    title: "MemDreamer: Decoupling Perception and Reasoning for Long Video Understanding via Hierarchical Graph Memory and Agentic Retrieval Mechanism",
    authors: [
      "Cong Chen", "Guo Gan", "Kaixiang Ji", "ChaoYang Zhang",
      { name: "Zhen Yang", me: true },
      "Guangming Yao", "Hao Chen", "Jingdong Chen", "Yi Yuan", "Chunhua Shen"
    ],
    venue: "arXiv 2026",
    year: 2026,
    links: {
      arxiv: "https://arxiv.org/abs/2606.07512",
    },
    citations: 0,
    tags: ["Memory", "Long Video Understanding"],
    abbr: "MemDreamer",
    thumbs: [
      "images/papers/memdreamer/01.webp",
      "images/papers/memdreamer/method.webp"
    ],
    description: "Turns long-video understanding into agentic exploration — builds a hierarchical graph memory and reasons through it with an Observation–Reason–Action loop, reaching SOTA with just 2% of the full context.",
    bibtex: `@article{chen2026memdreamer,
  title={MemDreamer: Decoupling Perception and Reasoning for Long Video Understanding via Hierarchical Graph Memory and Agentic Retrieval Mechanism},
  author={Chen, Cong and Gan, Guo and Ji, Kaixiang and Zhang, ChaoYang and Yang, Zhen and Yao, Guangming and Chen, Hao and Chen, Jingdong and Yuan, Yi and Shen, Chunhua},
  journal={arXiv preprint arXiv:2606.07512},
  year={2026}
}`
  },
];
