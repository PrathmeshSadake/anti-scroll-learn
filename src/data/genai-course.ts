export type IconType =
  | "cpu" | "layers" | "brain" | "pencil" | "target"
  | "book" | "shield" | "eye" | "zap" | "globe"
  | "terminal" | "compass" | "grid" | "star" | "lock"
  | "unlock" | "play" | "hash" | "message-circle" | "bar-chart"
  | "award" | "sparkles" | "rotate" | "clock" | "bookmark"
  | "sun" | "moon" | "chevron-right" | "chevron-left" | "chevron-down"
  | "arrow-left" | "arrow-right" | "check" | "x";

export interface HookCard {
  type: "hook";
  headline: string;
  subheadline: string;
}

export interface ConceptCard {
  type: "concept";
  title: string;
  body: string;
  analogy: string;
}

export interface VisualCard {
  type: "visual";
  title: string;
  steps: { label: string; description: string }[];
}

export interface CheckCard {
  type: "check";
  question: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}

export interface RealWorldCard {
  type: "realworld";
  company: string;
  what: string;
  result: string;
}

export interface TakeawayCard {
  type: "takeaway";
  summary: string;
  nextTeaser: string;
}

export interface InteractiveCard {
  type: "interactive";
  title: string;
  instruction: string;
  interactionType: "drag-drop" | "sequence" | "fill-blank";
  items: { id: string; label: string; correctPosition?: number }[];
  feedback: { correct: string; incorrect: string };
}

export type ModuleCard = HookCard | ConceptCard | VisualCard | CheckCard | RealWorldCard | TakeawayCard | InteractiveCard;

export interface Module {
  id: number;
  level: 1 | 2 | 3;
  levelName: string;
  category: string;
  title: string;
  moduleType: string;
  icon: IconType;
  outcomes: string[];
  isPro: boolean;
  unlockGate: string;
  cards: ModuleCard[];
}

const course: Module[] = [
  // ──────────── LEVEL 1: BEGINNER ────────────
  {
    id: 1,
    level: 1,
    levelName: "Beginner",
    category: "Fundamentals",
    title: "What is Generative AI?",
    moduleType: "Core Concept",
    icon: "cpu",
    outcomes: [
      "Define generative AI and how it differs from traditional AI",
      "Identify 3 real-world applications of Gen AI in daily work",
      "Understand how models are trained on data at a high level",
    ],
    isPro: false,
    unlockGate: "Free",
    cards: [
      {
        type: "hook",
        headline: "AI doesn't just analyze anymore. It creates.",
        subheadline: "From writing emails to generating code -- generative AI is the biggest shift in how we work since the internet.",
      },
      {
        type: "concept",
        title: "Traditional AI vs Generative AI",
        body: "Traditional AI classifies data -- spam or not spam, cat or dog. Generative AI creates brand new content: text, images, code, music. It learns patterns from billions of examples, then produces original outputs that never existed before.",
        analogy: "Traditional AI is like a judge at a talent show -- it scores performances. Generative AI is the performer -- it gets on stage and creates something new.",
      },
      {
        type: "visual",
        title: "How Generative AI Works",
        steps: [
          { label: "Training Data", description: "Billions of text, image, and code examples are fed to the model" },
          { label: "Pattern Learning", description: "The model learns statistical patterns and relationships in the data" },
          { label: "Generation", description: "Given a prompt, the model produces new content based on learned patterns" },
          { label: "Output", description: "Text, images, code, audio -- whatever the model was trained to produce" },
        ],
      },
      {
        type: "check",
        question: "What makes Generative AI different from traditional AI?",
        options: [
          { text: "It classifies data into categories", correct: false },
          { text: "It creates new, original content from learned patterns", correct: true },
          { text: "It runs faster on modern hardware", correct: false },
          { text: "It only works with text data", correct: false },
        ],
        explanation: "Generative AI creates new content -- text, images, code -- by learning patterns from data. Traditional AI classifies or predicts but doesn't generate new outputs.",
      },
      {
        type: "realworld",
        company: "GitHub Copilot",
        what: "Used Gen AI to auto-complete and generate code for developers directly inside their editor.",
        result: "Developers report completing tasks 55% faster. Over 100M lines of code generated daily.",
      },
      {
        type: "takeaway",
        summary: "Generative AI creates new content by learning patterns from massive datasets -- it's the performer, not the judge.",
        nextTeaser: "Next: How do LLMs actually generate text, word by word? The answer is simpler (and weirder) than you think.",
      },
    ],
  },
  {
    id: 2,
    level: 1,
    levelName: "Beginner",
    category: "Fundamentals",
    title: "How LLMs Actually Work",
    moduleType: "Core Concept",
    icon: "brain",
    outcomes: [
      "Explain tokens, context windows, and next-token prediction",
      "Understand why LLMs hallucinate and when to trust outputs",
      "Describe the difference between base models and instruction-tuned models",
    ],
    isPro: false,
    unlockGate: "Free",
    cards: [
      {
        type: "hook",
        headline: "LLMs don't understand language. They predict the next word.",
        subheadline: "The most powerful AI systems are, at their core, autocomplete on steroids. Understanding this changes how you use them.",
      },
      {
        type: "concept",
        title: "Next-Token Prediction",
        body: "LLMs break text into tokens (roughly words or word pieces). Given all previous tokens, the model predicts which token comes next. It repeats this thousands of times to generate paragraphs. The 'context window' is how many tokens it can see at once -- typically 4K to 128K.",
        analogy: "Imagine the world's most well-read person playing a game: you say a sentence, and they guess the next word. That's an LLM -- except it's read the entire internet.",
      },
      {
        type: "visual",
        title: "From Input to Output",
        steps: [
          { label: "Tokenization", description: "Your text is split into small pieces called tokens" },
          { label: "Context Window", description: "All tokens are fed into the model's attention mechanism" },
          { label: "Prediction", description: "The model calculates probability of every possible next token" },
          { label: "Sampling", description: "One token is selected, added to context, and the process repeats" },
        ],
      },
      {
        type: "check",
        question: "Why do LLMs sometimes hallucinate (make up facts confidently)?",
        options: [
          { text: "They access a database and sometimes get errors", correct: false },
          { text: "They predict the most likely next token, even if it's factually wrong", correct: true },
          { text: "They run out of memory during generation", correct: false },
          { text: "The training data was deleted", correct: false },
        ],
        explanation: "LLMs predict statistically likely text, not factually verified text. They'll confidently complete a sentence even when the completion is wrong -- because it sounds right based on patterns.",
      },
      {
        type: "realworld",
        company: "ChatGPT (OpenAI)",
        what: "Made LLMs accessible by instruction-tuning GPT-3.5 so it could follow conversational instructions instead of just completing text.",
        result: "Reached 100M users in 2 months -- the fastest-growing consumer app in history at that time.",
      },
      {
        type: "takeaway",
        summary: "LLMs are next-token predictors that work in a context window. They hallucinate because they predict what sounds right, not what is right.",
        nextTeaser: "Next: If the model just predicts words, how do you get it to actually do what you want? Enter prompt engineering.",
      },
    ],
  },
  {
    id: 3,
    level: 1,
    levelName: "Beginner",
    category: "Fundamentals",
    title: "Prompt Engineering Basics",
    moduleType: "Core Concept + Interactive",
    icon: "pencil",
    outcomes: [
      "Write a clear, structured prompt using role-task-format",
      "Apply zero-shot vs few-shot prompting in practice",
      "Identify why vague prompts produce poor results",
    ],
    isPro: false,
    unlockGate: "Free",
    cards: [
      {
        type: "hook",
        headline: "The difference between a bad AI answer and a great one? Your prompt.",
        subheadline: "80% of people get mediocre results from AI because they ask mediocre questions. A few small changes fix everything.",
      },
      {
        type: "concept",
        title: "The Role-Task-Format Framework",
        body: "Every great prompt has three parts: Role (who the AI should be), Task (what it should do), and Format (how to structure the output). Adding context and constraints makes it even better. The model follows instructions literally -- vagueness in, vagueness out.",
        analogy: "Prompting AI is like briefing a very smart intern on their first day. They're capable of anything, but if your instructions are vague, you'll get vague work back.",
      },
      {
        type: "visual",
        title: "Zero-Shot vs Few-Shot Prompting",
        steps: [
          { label: "Zero-Shot", description: "Ask directly with no examples: 'Classify this review as positive or negative'" },
          { label: "Few-Shot", description: "Provide 2-3 examples before your actual request so the model learns the pattern" },
          { label: "Chain-of-Thought", description: "Ask the model to think step by step before answering for complex reasoning" },
          { label: "System Prompt", description: "Set persistent behavior and persona for the entire conversation" },
        ],
      },
      {
        type: "check",
        question: "Which prompt will produce better results?",
        options: [
          { text: "'Write something about marketing'", correct: false },
          { text: "'You are a CMO. Write 3 LinkedIn post ideas for a B2B SaaS launch. Keep each under 100 words.'", correct: true },
          { text: "'Marketing. Go.'", correct: false },
          { text: "'Please help me with my marketing strategy document'", correct: false },
        ],
        explanation: "The second prompt uses Role (CMO), Task (3 LinkedIn posts for B2B SaaS), and Format (under 100 words). Specificity drives quality.",
      },
      {
        type: "realworld",
        company: "Anthropic (Claude)",
        what: "Published research showing that structured system prompts with explicit constraints consistently outperform unstructured ones.",
        result: "Developers using structured prompts saw 40% improvement in output relevance across benchmarks.",
      },
      {
        type: "takeaway",
        summary: "Great prompts use Role-Task-Format. Few-shot examples teach the model your pattern. Specificity is everything.",
        nextTeaser: "Next: Chatbots are one thing. But what if AI could actually take actions in the real world? Meet AI agents.",
      },
    ],
  },
  {
    id: 4,
    level: 1,
    levelName: "Beginner",
    category: "AI Agents",
    title: "What is an AI Agent?",
    moduleType: "Core Concept",
    icon: "compass",
    outcomes: [
      "Define what makes an AI agent different from a chatbot",
      "Understand the observe-think-act loop",
      "Name 3 real tools agents use (search, code, browser)",
    ],
    isPro: false,
    unlockGate: "Free",
    cards: [
      {
        type: "hook",
        headline: "Chatbots talk. Agents do.",
        subheadline: "AI agents don't just answer questions -- they search the web, write code, click buttons, and complete multi-step tasks autonomously.",
      },
      {
        type: "concept",
        title: "The Observe-Think-Act Loop",
        body: "An AI agent is an LLM connected to tools. It observes context, thinks about what to do, acts by calling a tool, then observes the result -- repeating until the task is done. This loop is what separates agents from chatbots.",
        analogy: "A chatbot is like a librarian who answers questions. An agent is like a personal assistant who answers your question, books the meeting, sends the email, and follows up next week.",
      },
      {
        type: "visual",
        title: "The Agent Loop",
        steps: [
          { label: "Observe", description: "Read the user's request and current context" },
          { label: "Think", description: "Decide the best next step -- answer directly or call a tool" },
          { label: "Act", description: "Execute the action: search, write code, browse, or call an API" },
          { label: "Repeat", description: "Observe the result, think again, act again -- until task is complete" },
        ],
      },
      {
        type: "check",
        question: "What makes an AI agent different from a chatbot?",
        options: [
          { text: "Agents are always more accurate", correct: false },
          { text: "Agents can use tools and take real-world actions", correct: true },
          { text: "Agents don't use language models", correct: false },
          { text: "Agents work without any human input", correct: false },
        ],
        explanation: "The key difference is tool use. Agents connect LLMs to external tools (search, code execution, APIs) to take actions, not just generate text.",
      },
      {
        type: "realworld",
        company: "Devin by Cognition",
        what: "Built an AI software engineer agent that can plan, write code, debug, and deploy applications autonomously.",
        result: "Completed real Upwork tasks end-to-end, handling multi-step coding workflows that require dozens of decisions.",
      },
      {
        type: "takeaway",
        summary: "AI agents are LLMs + tools in an observe-think-act loop. They don't just talk -- they search, code, browse, and execute.",
        nextTeaser: "Next: How do agents actually call tools? The answer is function calling -- and it's simpler than you think.",
      },
    ],
  },
  {
    id: 5,
    level: 1,
    levelName: "Beginner",
    category: "AI Agents",
    title: "Tools & Function Calling",
    moduleType: "Core Concept + Interactive",
    icon: "terminal",
    outcomes: [
      "Explain how agents call external tools via function calling",
      "Understand when an agent decides to use a tool vs answer directly",
      "Read a simple tool-call JSON and interpret what the agent did",
    ],
    isPro: false,
    unlockGate: "Free",
    cards: [
      {
        type: "hook",
        headline: "When AI stops talking and starts doing, it's making a function call.",
        subheadline: "Function calling is how an LLM goes from 'I think the weather is nice' to actually checking the weather for you.",
      },
      {
        type: "concept",
        title: "How Function Calling Works",
        body: "You define tools as structured descriptions (name, parameters, purpose). The LLM reads the user request and decides: should I answer directly or call a tool? If it calls a tool, it outputs structured JSON with the function name and arguments. Your code executes it and feeds the result back.",
        analogy: "Function calling is like a manager delegating. They read the request, decide they need data from accounting, write a specific request memo, and wait for the response before answering.",
      },
      {
        type: "visual",
        title: "The Function Calling Flow",
        steps: [
          { label: "Define Tools", description: "Register available tools with names, parameters, and descriptions" },
          { label: "LLM Decides", description: "Model reads the prompt and chooses to call a tool or respond directly" },
          { label: "JSON Output", description: "Model outputs structured JSON: which function, what arguments" },
          { label: "Execute & Return", description: "Your code runs the function, feeds results back to the model" },
        ],
      },
      {
        type: "check",
        question: "When does an LLM decide to use a tool instead of answering directly?",
        options: [
          { text: "Every single time, for every question", correct: false },
          { text: "Only when explicitly told to by the user", correct: false },
          { text: "When it determines external data or action is needed to fulfill the request", correct: true },
          { text: "Randomly, based on internal probability", correct: false },
        ],
        explanation: "The LLM evaluates whether it can answer from its training data or if it needs real-time data/actions. It routes to tools only when needed.",
      },
      {
        type: "realworld",
        company: "OpenAI GPT-4",
        what: "Introduced native function calling, letting developers define tools that GPT can invoke during conversations.",
        result: "Enabled thousands of production AI apps: booking systems, data analysis tools, customer service bots that actually resolve issues.",
      },
      {
        type: "takeaway",
        summary: "Function calling lets LLMs invoke external tools via structured JSON. The model decides when to delegate vs answer directly.",
        nextTeaser: "Next: What if you could build a real app without writing code? That's vibe coding -- and it's changing who can build software.",
      },
    ],
  },
  {
    id: 6,
    level: 1,
    levelName: "Beginner",
    category: "Vibe Coding",
    title: "What is Vibe Coding?",
    moduleType: "Core Concept",
    icon: "sparkles",
    outcomes: [
      "Define vibe coding and why it matters for non-engineers",
      "Understand what AI coding tools can and cannot build reliably",
      "Identify 3 popular vibe coding tools (Lovable, Cursor, Bolt)",
    ],
    isPro: false,
    unlockGate: "Free",
    cards: [
      {
        type: "hook",
        headline: "You don't need to code to build software anymore.",
        subheadline: "Vibe coding means describing what you want in plain English and letting AI write, debug, and deploy the code for you.",
      },
      {
        type: "concept",
        title: "Vibe Coding Explained",
        body: "Vibe coding is building software by describing what you want in natural language. AI tools generate the actual code, handle debugging, and even deploy. You focus on the what and why; AI handles the how. It's not no-code -- it's AI-code.",
        analogy: "Vibe coding is like being an architect who sketches a building and has a robotic construction crew build it -- you design the vision, AI handles the bricks.",
      },
      {
        type: "visual",
        title: "The Vibe Coding Toolkit",
        steps: [
          { label: "Lovable", description: "Describe an app in plain English, get a deployed full-stack web app" },
          { label: "Cursor", description: "AI-powered code editor that writes and edits code with you in real-time" },
          { label: "Bolt", description: "Build and deploy web apps from a prompt, with instant preview" },
          { label: "Claude Code", description: "Agentic coding tool that builds, tests, and debugs in your terminal" },
        ],
      },
      {
        type: "check",
        question: "What does 'vibe coding' actually mean?",
        options: [
          { text: "Writing code while listening to music", correct: false },
          { text: "Describing what you want in plain language and letting AI generate the code", correct: true },
          { text: "Using templates from a library without customization", correct: false },
          { text: "A marketing term for drag-and-drop builders", correct: false },
        ],
        explanation: "Vibe coding means using natural language to direct AI coding tools. You describe the intent; AI writes, debugs, and deploys the actual code.",
      },
      {
        type: "realworld",
        company: "Lovable",
        what: "Enables non-technical founders to build and launch full-stack web applications by describing features in plain English.",
        result: "Thousands of MVPs launched by non-engineers. Some raised funding with apps built entirely through vibe coding.",
      },
      {
        type: "takeaway",
        summary: "Vibe coding lets anyone build software by describing what they want. Tools like Lovable, Cursor, and Bolt handle the actual code.",
        nextTeaser: "You've completed Level 1! Next level: RAG, fine-tuning, multi-agent systems, and building real apps with AI.",
      },
    ],
  },

  // ──────────── LEVEL 2: INTERMEDIATE ────────────
  {
    id: 7,
    level: 2,
    levelName: "Intermediate",
    category: "RAG & Finetuning",
    title: "How RAG Works",
    moduleType: "Core Concept",
    icon: "book",
    outcomes: [
      "Explain the retrieve-augment-generate pipeline step by step",
      "Understand vector embeddings and semantic search at a conceptual level",
      "Know when to use RAG vs fine-tuning for a given use case",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 1",
    cards: [
      {
        type: "hook",
        headline: "LLMs are smart but clueless about your data.",
        subheadline: "RAG fixes this by giving the model your documents at query time -- no retraining needed.",
      },
      {
        type: "concept",
        title: "Retrieve, Augment, Generate",
        body: "RAG has three steps: first, retrieve relevant documents from your knowledge base using semantic search. Then, augment the LLM's prompt by injecting those documents as context. Finally, the model generates a grounded answer using both its knowledge and your data.",
        analogy: "RAG is like an open-book exam. The student (LLM) is smart, but instead of relying on memory, they look up the answer in their notes (your documents) before responding.",
      },
      {
        type: "visual",
        title: "The RAG Pipeline",
        steps: [
          { label: "Embed Documents", description: "Convert your documents into vector embeddings and store them" },
          { label: "User Query", description: "Convert the user's question into a vector embedding" },
          { label: "Semantic Search", description: "Find the most similar document chunks to the query" },
          { label: "Generate", description: "Feed retrieved chunks + query to the LLM for a grounded answer" },
        ],
      },
      {
        type: "check",
        question: "When should you use RAG instead of fine-tuning?",
        options: [
          { text: "When you want to change the model's writing style", correct: false },
          { text: "When you need the model to access up-to-date or private documents", correct: true },
          { text: "When you need faster inference speed", correct: false },
          { text: "When the model needs to learn a new language", correct: false },
        ],
        explanation: "RAG is ideal for dynamic, private, or frequently updated data. Fine-tuning is better for changing model behavior or style.",
      },
      {
        type: "realworld",
        company: "Notion AI",
        what: "Uses RAG to let users ask questions about their own workspace. The AI retrieves relevant pages and generates answers grounded in your actual notes.",
        result: "Users get accurate, workspace-specific answers instead of generic LLM responses.",
      },
      {
        type: "takeaway",
        summary: "RAG retrieves your documents, injects them as context, and generates grounded answers. It's an open-book exam for LLMs.",
        nextTeaser: "Next: RAG vs fine-tuning vs prompting -- when to use which? A decision framework you'll use every week.",
      },
    ],
  },
  {
    id: 8,
    level: 2,
    levelName: "Intermediate",
    category: "RAG & Finetuning",
    title: "Fine-tuning vs Prompting vs RAG",
    moduleType: "Comparison Module",
    icon: "target",
    outcomes: [
      "Compare all three approaches across cost, speed, and accuracy",
      "Choose the right approach for a given business scenario",
      "Understand what data is required for each approach",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 1",
    cards: [
      {
        type: "hook",
        headline: "Prompting, RAG, or fine-tuning? Wrong choice = wasted months.",
        subheadline: "Most teams pick the most complex approach first. Here's a framework to choose correctly in 60 seconds.",
      },
      {
        type: "concept",
        title: "Three Approaches, One Decision",
        body: "Prompting is free and fast -- change the input. RAG adds your data at query time -- no training needed. Fine-tuning rewires the model's behavior with your data -- expensive but powerful. Start with prompting, add RAG for knowledge, fine-tune only for style/behavior changes.",
        analogy: "Prompting is giving someone better instructions. RAG is giving them a reference book. Fine-tuning is sending them to a specialized training program.",
      },
      {
        type: "visual",
        title: "When to Use What",
        steps: [
          { label: "Prompting", description: "Best for: quick iteration, style control, simple tasks. Cost: ~free" },
          { label: "RAG", description: "Best for: private/updated data, factual accuracy. Cost: low (embedding + storage)" },
          { label: "Fine-tuning", description: "Best for: behavior change, domain expertise, consistent style. Cost: high" },
          { label: "Decision Rule", description: "Start simple: prompt first, add RAG, fine-tune only if needed" },
        ],
      },
      {
        type: "check",
        question: "Your customer support bot needs to answer questions about your product docs that change weekly. Best approach?",
        options: [
          { text: "Fine-tune the model on your docs every week", correct: false },
          { text: "Use RAG to retrieve current docs at query time", correct: true },
          { text: "Write very detailed prompts with all product info", correct: false },
          { text: "Train a custom model from scratch", correct: false },
        ],
        explanation: "RAG is perfect here -- docs change frequently, you need factual accuracy, and retraining weekly would be wasteful and expensive.",
      },
      {
        type: "realworld",
        company: "Stripe",
        what: "Uses a combination of RAG (for API docs) and prompt engineering (for formatting) to power their developer assistant.",
        result: "Developers get accurate, up-to-date answers about Stripe's APIs without Stripe needing to fine-tune any models.",
      },
      {
        type: "takeaway",
        summary: "Start with prompting, add RAG for data, fine-tune for behavior. Most problems don't need fine-tuning.",
        nextTeaser: "Next: MCP -- the protocol that lets AI agents connect to any data source. It's changing how agents work.",
      },
    ],
  },
  {
    id: 9,
    level: 2,
    levelName: "Intermediate",
    category: "AI Agents",
    title: "Basics of MCP",
    moduleType: "Tool Deep-Dive",
    icon: "globe",
    outcomes: [
      "Understand why MCP was created and what problem it solves",
      "Explain how MCP connects AI models to external data sources",
      "Connect a simple chatbot to an MCP server conceptually",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 1",
    cards: [
      {
        type: "hook",
        headline: "Every AI app reinvents how to connect to data. MCP says: stop.",
        subheadline: "Model Context Protocol is a universal standard for connecting AI to any data source. Think USB-C for AI tools.",
      },
      {
        type: "concept",
        title: "One Protocol to Connect Them All",
        body: "MCP is an open protocol by Anthropic that standardizes how AI models access external data and tools. Instead of building custom integrations for each data source, you build one MCP server -- and any MCP-compatible AI client can connect to it.",
        analogy: "Before USB, every device had a different charger. MCP is USB-C for AI: one standard plug that connects any AI model to any data source.",
      },
      {
        type: "visual",
        title: "MCP Architecture",
        steps: [
          { label: "MCP Client", description: "The AI application (Claude, Cursor, etc.) that needs data" },
          { label: "MCP Protocol", description: "The standardized communication layer between client and server" },
          { label: "MCP Server", description: "A lightweight wrapper around your data source (DB, API, files)" },
          { label: "Data Source", description: "Your actual data: databases, documents, APIs, services" },
        ],
      },
      {
        type: "check",
        question: "What problem does MCP solve?",
        options: [
          { text: "Making LLMs generate text faster", correct: false },
          { text: "Standardizing how AI models connect to external data and tools", correct: true },
          { text: "Training models on private data", correct: false },
          { text: "Reducing the cost of API calls", correct: false },
        ],
        explanation: "MCP creates a universal standard for AI-to-data connections, eliminating the need to build custom integrations for every data source.",
      },
      {
        type: "realworld",
        company: "Anthropic (Claude)",
        what: "Released MCP as an open protocol and integrated it into Claude Desktop, allowing users to connect Claude to local files, databases, and APIs.",
        result: "Thousands of community-built MCP servers now exist for GitHub, Slack, databases, and more.",
      },
      {
        type: "takeaway",
        summary: "MCP is USB-C for AI: one standard protocol connecting any AI client to any data source or tool.",
        nextTeaser: "Next: What happens when multiple agents work together? Multi-agent workflows are where things get really powerful.",
      },
    ],
  },
  {
    id: 10,
    level: 2,
    levelName: "Intermediate",
    category: "AI Agents",
    title: "Multi-Agent Workflows",
    moduleType: "Core Concept",
    icon: "grid",
    outcomes: [
      "Define orchestrator vs sub-agent roles in a pipeline",
      "Understand how agents hand off tasks to each other",
      "Identify failure modes in multi-agent systems",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 1",
    cards: [
      {
        type: "hook",
        headline: "One agent is useful. A team of agents is transformational.",
        subheadline: "Multi-agent systems break complex tasks into pieces and assign specialized agents to each -- like a well-run company.",
      },
      {
        type: "concept",
        title: "Orchestrators and Sub-Agents",
        body: "A multi-agent system has an orchestrator (the manager) that breaks tasks into subtasks, assigns them to specialized sub-agents (researcher, coder, reviewer), and synthesizes results. Each agent has its own tools and expertise.",
        analogy: "It's like a film production: the director (orchestrator) coordinates specialists -- the writer, cinematographer, editor (sub-agents) -- each doing what they're best at.",
      },
      {
        type: "visual",
        title: "Multi-Agent Architecture",
        steps: [
          { label: "User Request", description: "A complex task arrives that requires multiple capabilities" },
          { label: "Orchestrator", description: "The manager agent breaks the task into subtasks" },
          { label: "Sub-Agents", description: "Specialized agents (researcher, coder, reviewer) execute subtasks" },
          { label: "Synthesis", description: "Orchestrator combines results and delivers the final output" },
        ],
      },
      {
        type: "check",
        question: "What is the biggest risk in multi-agent systems?",
        options: [
          { text: "They use too much electricity", correct: false },
          { text: "Agent loops -- agents passing tasks back and forth indefinitely", correct: true },
          { text: "They can only work with text", correct: false },
          { text: "They require custom hardware", correct: false },
        ],
        explanation: "The most common failure mode is loops: Agent A asks Agent B, who asks Agent A, endlessly. Good orchestration, timeouts, and max-iteration limits prevent this.",
      },
      {
        type: "realworld",
        company: "Factory (Droids)",
        what: "Uses multi-agent architecture where specialized 'droids' handle different parts of the software development lifecycle -- code review, testing, deployment.",
        result: "Complex engineering tasks that took hours are completed autonomously in minutes with specialized agent coordination.",
      },
      {
        type: "takeaway",
        summary: "Multi-agent systems use an orchestrator to coordinate specialized sub-agents. Watch out for loops and unclear handoffs.",
        nextTeaser: "Next: Build a real app without code using Lovable. Hands-on, start to finish.",
      },
    ],
  },
  {
    id: 11,
    level: 2,
    levelName: "Intermediate",
    category: "Vibe Coding",
    title: "Build an App on Lovable",
    moduleType: "Practical Workflow",
    icon: "play",
    outcomes: [
      "Set up a project and define scope with AI assistance",
      "Iterate on a working prototype using natural language",
      "Deploy a simple web app without writing code manually",
    ],
    isPro: true,
    unlockGate: "Complete 70% of Level 1",
    cards: [
      {
        type: "hook",
        headline: "From idea to deployed app in 30 minutes. No code.",
        subheadline: "Lovable turns natural language into full-stack web apps. This walkthrough shows you exactly how -- step by step.",
      },
      {
        type: "concept",
        title: "The Lovable Workflow",
        body: "Start by describing your app idea clearly. Lovable generates a complete codebase with frontend, backend, and database. Iterate by describing changes in plain English. Preview live, then deploy with one click. Think of it as pair programming where AI writes 100% of the code.",
        analogy: "It's like hiring the world's fastest developer who only takes instructions in plain English -- no technical specs needed, just clear descriptions.",
      },
      {
        type: "visual",
        title: "Build Flow",
        steps: [
          { label: "Describe", description: "Write a clear description of what your app does and who it's for" },
          { label: "Generate", description: "Lovable creates the full codebase: React frontend, Supabase backend" },
          { label: "Iterate", description: "Describe changes in natural language. Lovable updates the code" },
          { label: "Deploy", description: "One-click deploy to a live URL. Share with anyone." },
        ],
      },
      {
        type: "check",
        question: "What's the most important factor for getting good results from Lovable?",
        options: [
          { text: "Knowing React and TypeScript", correct: false },
          { text: "Writing clear, specific descriptions of what you want", correct: true },
          { text: "Having a fast internet connection", correct: false },
          { text: "Using the paid plan", correct: false },
        ],
        explanation: "Lovable is only as good as your descriptions. Clear, specific prompts about features, layout, and behavior produce the best apps.",
      },
      {
        type: "realworld",
        company: "Indie Makers",
        what: "Non-technical founders use Lovable to build and launch MVPs for validation -- CRM tools, booking apps, dashboards.",
        result: "Multiple Lovable-built apps have raised pre-seed funding. Time from idea to live product: hours, not months.",
      },
      {
        type: "takeaway",
        summary: "Lovable turns plain English descriptions into deployed web apps. Clarity of description is the only skill you need.",
        nextTeaser: "Next: How do AI image generators actually work? The answer involves noise -- lots of it.",
      },
    ],
  },
  {
    id: 12,
    level: 2,
    levelName: "Intermediate",
    category: "Image/Audio/Video Models",
    title: "How Image Generation Works",
    moduleType: "Core Concept",
    icon: "eye",
    outcomes: [
      "Understand diffusion models at a conceptual level",
      "Distinguish between Midjourney, DALL-E, and Stable Diffusion use cases",
      "Write an effective image generation prompt",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 1",
    cards: [
      {
        type: "hook",
        headline: "AI generates images by starting with pure noise and removing it.",
        subheadline: "Diffusion models learn to reverse chaos into art. Understanding this makes you 10x better at writing image prompts.",
      },
      {
        type: "concept",
        title: "Diffusion: From Noise to Image",
        body: "Diffusion models are trained by gradually adding noise to images until they become pure static, then learning to reverse the process. At generation time, you start with random noise and the model removes it step by step, guided by your text prompt, until a clear image emerges.",
        analogy: "Imagine a sculptor who starts with a block of marble (noise) and chisels away guided by your description until the statue (image) appears. Each step removes more randomness.",
      },
      {
        type: "visual",
        title: "The Diffusion Process",
        steps: [
          { label: "Random Noise", description: "Generation starts with pure random static -- no image at all" },
          { label: "Guided Denoising", description: "Your text prompt guides the model on what to denoise toward" },
          { label: "Iterative Steps", description: "Over 20-50 steps, the image becomes clearer and more detailed" },
          { label: "Final Image", description: "A fully rendered image that matches your text description" },
        ],
      },
      {
        type: "check",
        question: "How does a diffusion model generate an image?",
        options: [
          { text: "It searches a database of existing images and combines them", correct: false },
          { text: "It starts with noise and progressively removes it, guided by the text prompt", correct: true },
          { text: "It draws the image pixel by pixel from top to bottom", correct: false },
          { text: "It converts text directly into pixel values", correct: false },
        ],
        explanation: "Diffusion models learn to reverse noise into images. Your prompt guides the denoising process toward the content you described.",
      },
      {
        type: "realworld",
        company: "Midjourney",
        what: "Built a diffusion-based image generator accessible through Discord that excels at artistic, stylized imagery.",
        result: "Used by millions for marketing, concept art, and design. A Midjourney-generated image won a state fair art competition in 2022.",
      },
      {
        type: "takeaway",
        summary: "Diffusion models generate images by removing noise, guided by your text. Better prompts = better guidance = better images.",
        nextTeaser: "You've completed Level 2! Next: production agents, advanced RAG, local models, and real fine-tuning.",
      },
    ],
  },

  // ──────────── LEVEL 3: ADVANCED ────────────
  {
    id: 13,
    level: 3,
    levelName: "Advanced",
    category: "AI Agents",
    title: "Building Production AI Agents",
    moduleType: "Deep Dive",
    icon: "layers",
    outcomes: [
      "Design an agent architecture for a real business problem",
      "Handle tool failures, retries, and agent loops gracefully",
      "Evaluate agent performance using evals and tracing",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 2",
    cards: [
      {
        type: "hook",
        headline: "Demo agents are easy. Production agents are engineering.",
        subheadline: "The gap between a cool demo and a reliable agent that handles edge cases, failures, and scale is massive. Let's close it.",
      },
      {
        type: "concept",
        title: "From Demo to Production",
        body: "Production agents need: guardrails (to prevent harmful actions), retry logic (for tool failures), max-iteration limits (to prevent loops), observability (to trace what the agent did and why), and evals (to measure performance over time). Without these, agents break silently.",
        analogy: "A demo agent is like a self-driving car on a closed track. A production agent is that car in rush-hour traffic -- it needs safety systems, error handling, and monitoring.",
      },
      {
        type: "visual",
        title: "Production Agent Checklist",
        steps: [
          { label: "Guardrails", description: "Input validation, output filtering, action approval gates" },
          { label: "Error Handling", description: "Tool failure retries, graceful fallbacks, timeout limits" },
          { label: "Observability", description: "Trace every step, log decisions, monitor cost and latency" },
          { label: "Evals", description: "Test suite that measures accuracy, reliability, and safety over time" },
        ],
      },
      {
        type: "check",
        question: "What's the most critical system for a production AI agent?",
        options: [
          { text: "A faster LLM model", correct: false },
          { text: "Observability and tracing to understand agent decisions", correct: true },
          { text: "More available tools", correct: false },
          { text: "A better UI design", correct: false },
        ],
        explanation: "Without observability, you can't debug failures, measure performance, or understand why the agent made specific decisions. It's the foundation of production reliability.",
      },
      {
        type: "realworld",
        company: "LangSmith (LangChain)",
        what: "Built a tracing and observability platform specifically for AI agents, letting teams see every step of agent execution.",
        result: "Teams using tracing catch agent failures 10x faster and reduce debugging time from hours to minutes.",
      },
      {
        type: "takeaway",
        summary: "Production agents need guardrails, retry logic, observability, and evals. Without these, they break silently at scale.",
        nextTeaser: "Next: Advanced RAG patterns -- hybrid search, re-ranking, and chunking strategies that actually work.",
      },
    ],
  },
  {
    id: 14,
    level: 3,
    levelName: "Advanced",
    category: "RAG & Finetuning",
    title: "Advanced RAG Patterns",
    moduleType: "Deep Dive",
    icon: "hash",
    outcomes: [
      "Implement hybrid search (keyword + semantic) for better retrieval",
      "Understand re-ranking and its impact on answer quality",
      "Design a chunking strategy for different document types",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 2",
    cards: [
      {
        type: "hook",
        headline: "Basic RAG gets you 60% accuracy. Advanced RAG gets you 95%.",
        subheadline: "The difference is three techniques: hybrid search, re-ranking, and smart chunking. Most teams skip all three.",
      },
      {
        type: "concept",
        title: "Beyond Basic Retrieval",
        body: "Basic RAG uses only semantic search, which misses keyword matches. Hybrid search combines keyword and semantic for broader recall. Re-ranking then scores results by relevance. Smart chunking ensures documents are split at meaningful boundaries, not arbitrary character counts.",
        analogy: "Basic RAG is like searching with Google's 'I'm feeling lucky.' Advanced RAG searches broadly, ranks results carefully, and makes sure each result is a complete, useful chunk.",
      },
      {
        type: "visual",
        title: "Advanced RAG Pipeline",
        steps: [
          { label: "Smart Chunking", description: "Split docs at paragraph/section boundaries, not fixed character counts" },
          { label: "Hybrid Search", description: "Combine keyword (BM25) + semantic (vector) search for broader recall" },
          { label: "Re-Ranking", description: "Score all retrieved chunks by relevance to the query" },
          { label: "Context Window", description: "Feed only top-ranked, relevant chunks to the LLM" },
        ],
      },
      {
        type: "check",
        question: "Why is hybrid search better than pure semantic search?",
        options: [
          { text: "It's faster to compute", correct: false },
          { text: "It catches both meaning-based and exact keyword matches", correct: true },
          { text: "It uses less storage", correct: false },
          { text: "It works without embeddings", correct: false },
        ],
        explanation: "Semantic search finds conceptual matches but misses exact terms. Keyword search catches exact matches but misses meaning. Hybrid search gets both.",
      },
      {
        type: "realworld",
        company: "Perplexity AI",
        what: "Uses advanced RAG with hybrid search, re-ranking, and source attribution to deliver accurate, cited answers to any question.",
        result: "Became a $9B company by outperforming basic RAG systems on answer accuracy and trustworthiness.",
      },
      {
        type: "takeaway",
        summary: "Advanced RAG = smart chunking + hybrid search + re-ranking. These three upgrades take accuracy from 60% to 95%.",
        nextTeaser: "Next: Run AI models on your own machine. No cloud, no API costs, full privacy.",
      },
    ],
  },
  {
    id: 15,
    level: 3,
    levelName: "Advanced",
    category: "Fundamentals",
    title: "Run Models Locally with Ollama",
    moduleType: "Practical Workflow",
    icon: "terminal",
    outcomes: [
      "Install Ollama and run a model on your machine",
      "Understand the trade-offs of local vs cloud inference",
      "Choose the right model size for your hardware",
    ],
    isPro: true,
    unlockGate: "Complete 70% of Level 2",
    cards: [
      {
        type: "hook",
        headline: "What if you could run GPT-level AI on your laptop? You can.",
        subheadline: "Ollama lets you download and run open-source LLMs locally. Zero API costs. Full privacy. Surprisingly capable.",
      },
      {
        type: "concept",
        title: "Local Inference with Ollama",
        body: "Ollama is a tool that downloads and runs open-source models (Llama, Mistral, Gemma) on your machine. One command to install, one command to run. Trade-offs: local models are smaller and less capable than cloud APIs, but they're free, private, and work offline.",
        analogy: "Cloud AI is like renting a supercomputer by the minute. Local AI is like owning a capable laptop -- less powerful, but it's yours, it's free, and nobody sees your data.",
      },
      {
        type: "visual",
        title: "Getting Started",
        steps: [
          { label: "Install", description: "One command: curl + install script. Works on Mac, Linux, Windows" },
          { label: "Pull a Model", description: "'ollama pull llama3.2' downloads the model to your machine" },
          { label: "Run", description: "'ollama run llama3.2' starts a chat. It's that simple" },
          { label: "Integrate", description: "Use the local API (localhost:11434) in your apps" },
        ],
      },
      {
        type: "check",
        question: "What's the main trade-off of running models locally vs cloud?",
        options: [
          { text: "Local models are always better quality", correct: false },
          { text: "Local models are free and private but less capable than frontier cloud models", correct: true },
          { text: "Cloud models are free but local models cost money", correct: false },
          { text: "Local models need an internet connection", correct: false },
        ],
        explanation: "Local models are free and private but smaller. Frontier cloud models (GPT-4, Claude) are more capable but cost money and send data to servers.",
      },
      {
        type: "realworld",
        company: "Meta (Llama)",
        what: "Released Llama 3 as an open-source model that anyone can download and run locally. Competitive with GPT-3.5 on many benchmarks.",
        result: "Millions of developers run Llama locally for prototyping, privacy-sensitive applications, and offline use cases.",
      },
      {
        type: "takeaway",
        summary: "Ollama makes local AI simple: install, pull, run. Free, private, offline-capable -- but less powerful than cloud frontier models.",
        nextTeaser: "Next: Claude Code -- the agentic coding tool that builds, debugs, and deploys from your terminal.",
      },
    ],
  },
  {
    id: 16,
    level: 3,
    levelName: "Advanced",
    category: "Vibe Coding",
    title: "Install and Use Claude Code",
    moduleType: "Tool Deep-Dive",
    icon: "terminal",
    outcomes: [
      "Set up Claude Code in a real project directory",
      "Use agentic coding to build and debug features end-to-end",
      "Understand when Claude Code is faster than Cursor or Copilot",
    ],
    isPro: false,
    unlockGate: "Complete 70% of Level 2",
    cards: [
      {
        type: "hook",
        headline: "Claude Code doesn't autocomplete. It builds.",
        subheadline: "It reads your codebase, plans changes, edits multiple files, runs tests, and fixes errors -- all from a single instruction.",
      },
      {
        type: "concept",
        title: "Agentic Coding in Your Terminal",
        body: "Claude Code is a terminal-based agentic coding tool. You give it a task, it reads your codebase for context, plans the changes, edits files, runs commands, and iterates until the task is done. Unlike Copilot (autocomplete) or Cursor (editor), Claude Code operates at the project level.",
        analogy: "Copilot completes your sentences. Cursor edits your paragraph. Claude Code writes the entire chapter -- reading previous chapters first to stay consistent.",
      },
      {
        type: "visual",
        title: "Claude Code Workflow",
        steps: [
          { label: "Install", description: "'npm install -g @anthropic-ai/claude-code' in your terminal" },
          { label: "Launch", description: "Navigate to your project directory and type 'claude'" },
          { label: "Instruct", description: "Describe the feature, bug fix, or refactor you want" },
          { label: "Execute", description: "Claude reads your code, makes changes, runs tests, iterates" },
        ],
      },
      {
        type: "check",
        question: "When is Claude Code a better choice than Cursor?",
        options: [
          { text: "For small, inline code completions", correct: false },
          { text: "For multi-file changes that require understanding the full codebase", correct: true },
          { text: "For writing documentation only", correct: false },
          { text: "When you don't have a terminal installed", correct: false },
        ],
        explanation: "Claude Code excels at project-level tasks: multi-file refactors, feature implementation, and debugging that requires understanding how files relate to each other.",
      },
      {
        type: "realworld",
        company: "Anthropic",
        what: "Uses Claude Code internally for building Claude itself. Engineers describe features, and Claude Code implements them across the codebase.",
        result: "Internal teams report significant speedup on multi-file changes and debugging complex issues.",
      },
      {
        type: "takeaway",
        summary: "Claude Code is project-level agentic coding: it reads your whole codebase, plans changes, and executes across files.",
        nextTeaser: "Final module: Fine-tune your own model from scratch. The ultimate customization.",
      },
    ],
  },
  {
    id: 17,
    level: 3,
    levelName: "Advanced",
    category: "RAG & Finetuning",
    title: "Fine-tuning a Model",
    moduleType: "Practical Workflow",
    icon: "target",
    outcomes: [
      "Prepare and clean a dataset for supervised fine-tuning",
      "Run a fine-tuning job using OpenAI or Hugging Face APIs",
      "Evaluate fine-tuned model vs base model on your task",
    ],
    isPro: true,
    unlockGate: "Complete 70% of Level 2",
    cards: [
      {
        type: "hook",
        headline: "Fine-tuning isn't magic. It's 80% data prep, 20% training.",
        subheadline: "The secret to a great fine-tuned model isn't more data -- it's better data. Here's the full workflow.",
      },
      {
        type: "concept",
        title: "Supervised Fine-Tuning",
        body: "Fine-tuning takes a pre-trained model and trains it further on your specific task data. You provide input-output pairs (examples of ideal behavior). The model adjusts its weights to better match your examples. Result: a model that behaves exactly how you want on your specific task.",
        analogy: "Pre-training is like getting a medical degree. Fine-tuning is specializing in cardiology. Same foundational knowledge, but now laser-focused on your specific need.",
      },
      {
        type: "visual",
        title: "Fine-Tuning Workflow",
        steps: [
          { label: "Collect Data", description: "Gather 50-500 high-quality input-output pairs for your task" },
          { label: "Format & Clean", description: "Structure as JSONL with system/user/assistant messages" },
          { label: "Train", description: "Upload to OpenAI or Hugging Face, configure hyperparameters, run job" },
          { label: "Evaluate", description: "Compare fine-tuned vs base model on held-out test data" },
        ],
      },
      {
        type: "check",
        question: "What's more important for fine-tuning success?",
        options: [
          { text: "Using the largest possible model", correct: false },
          { text: "Having millions of training examples", correct: false },
          { text: "High-quality, carefully curated training data", correct: true },
          { text: "Training for the longest possible time", correct: false },
        ],
        explanation: "Quality over quantity. 100 perfect examples often outperform 10,000 mediocre ones. Garbage in, garbage out applies doubly to fine-tuning.",
      },
      {
        type: "realworld",
        company: "Harvey AI",
        what: "Fine-tuned LLMs on legal documents to create an AI legal assistant that understands legal reasoning, citation, and precedent.",
        result: "Used by top law firms. The fine-tuned model outperforms base models on legal tasks by a wide margin.",
      },
      {
        type: "takeaway",
        summary: "Fine-tuning is data prep + training + evaluation. Quality data matters more than quantity. Start with 50-100 perfect examples.",
        nextTeaser: "Congratulations -- you've completed the full Gen AI course. You now understand the entire landscape.",
      },
    ],
  },
];

export default course;
