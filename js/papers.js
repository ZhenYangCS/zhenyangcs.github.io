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
      "images/papers/streamma/01.jpg"
    ],
    description: "A streaming protocol that lets reasoning agents talk while they think — faster, cheaper, and more accurate."
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
      "images/papers/mti/01.jpg"
    ],
    description: "We show a tiny test-time nudge — applied at the right token, at the right moment — beats heavy retraining for LLM reasoning."
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
      "images/papers/rectifiedhr/01.jpg",
      "images/papers/rectifiedhr/method.jpg"
    ],
    tags: ["Visual Generation"],
    description: "A training-free recipe for crisp, high-resolution diffusion outputs — by rectifying the latent energy along the denoising trajectory."
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
      "images/papers/oir/01.jpg",
      "images/papers/oir/02.jpg",
      "images/papers/oir/method.jpg"
    ],
    description: "Decouples multi-object editing into per-object inversions, then reassembles — letting each edit speak without interfering."
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
      "images/papers/freecustom/01.jpg"
    ],
    description: "Tuning-free, reference-driven multi-concept image generation. Extended to video in IJCV 2025 (FreerCustom)."
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
    tags: ["Visual Generation"],
    thumbs: [
      "images/papers/stereopilot/01.jpg"
    ],
    description: "Turns any 2D video into high-quality 3D stereo in a single step using generative priors."
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
    tags: ["Visual Generation"],
    thumbs: [
      "images/papers/flexpainter/01.jpg",
      "images/papers/flexpainter/method.jpg"
    ],
    description: "Multi-view consistent texture synthesis for 3D meshes — flexible inputs, harmonized outputs."
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
      "images/papers/streamingvd/01.jpg"
    ],
    description: "An online video diffusion editor that processes long sequences frame-by-frame in a streaming manner."
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
      "images/papers/freecompose/01.jpg"
    ],
    description: "Compose, harmonize and re-light objects across images — zero-shot, with a frozen diffusion prior."
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
      "images/papers/llm4gen/01.jpg"
    ],
    description: "Plugs the semantic richness of LLMs into text-to-image diffusion for sharper, more compositional outputs."
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
      "images/papers/loraprune/01.jpg"
    ],
    description: "Couples structured pruning with LoRA so that compression and adaptation reinforce each other."
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
    tags: ["Long Video", "Multi-Agent", "LLM Reasoning"],
    abbr: "MemDreamer",
    thumbs: [
      "images/papers/memdreamer/01.jpg",
      "images/papers/memdreamer/method.jpg"
    ],
    description: "Turns long-video understanding into agentic exploration — builds a hierarchical graph memory and reasons through it with an Observation–Reason–Action loop, reaching SOTA with just 2% of the full context."
  },
];
