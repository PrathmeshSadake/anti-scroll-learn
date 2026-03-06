import type { IconType, ModuleCard } from "./genai-course";

export interface CourseModule {
  id: string;
  level: 1 | 2;
  levelName: string;
  category: string;
  title: string;
  moduleType: string;
  icon: IconType;
  estimatedMinutes: number;
  outcomes: string[];
  cards: ModuleCard[];
}

export interface CourseLevel {
  level: 1 | 2;
  name: string;
  subtitle: string;
  description: string;
  icon: IconType;
  accentColor: string;
  modules: CourseModule[];
}

/* ═══════════════════════════════════════════
   LEVEL 1 — LLM FUNDAMENTALS
   ═══════════════════════════════════════════ */

const level1Modules: CourseModule[] = [
  // ── Module 1: What is Generative AI? ──
  {
    id: "l1-m1",
    level: 1,
    levelName: "Beginner",
    category: "LLM Fundamentals",
    title: "What is Generative AI?",
    moduleType: "Core Concept",
    icon: "cpu",
    estimatedMinutes: 1,
    outcomes: [
      "Define generative AI vs traditional AI",
      "Identify 3 real-world Gen AI applications",
      "Understand high-level model training",
    ],
    cards: [
      {
        type: "hook",
        headline: "AI doesn't just analyze anymore — it creates.",
        subheadline:
          "From writing emails to generating code, generative AI is the biggest shift since the internet.",
      },
      {
        type: "concept",
        title: "Traditional AI vs Generative AI",
        body: "Traditional AI classifies data — spam or not spam, cat or dog. Generative AI creates brand new content: text, images, code, music. It learns patterns from billions of examples, then produces original outputs that never existed before.",
        analogy:
          "Traditional AI is like a judge at a talent show — it scores performances. Generative AI is the performer — it gets on stage and creates something new.",
      },
      {
        type: "visual",
        title: "How Generative AI Works",
        steps: [
          {
            label: "Training Data",
            description:
              "Billions of text, image, and code examples are fed to the model",
          },
          {
            label: "Pattern Learning",
            description:
              "The model learns statistical patterns and relationships",
          },
          {
            label: "Generation",
            description:
              "Given a prompt, it produces new content from learned patterns",
          },
          {
            label: "Output",
            description:
              "Text, images, code, audio — whatever it was trained to create",
          },
        ],
      },
      {
        type: "interactive",
        title: "Sort the AI Types",
        instruction:
          "Drag each example into the correct category: Traditional AI or Generative AI.",
        interactionType: "sequence",
        items: [
          { id: "1", label: "Spam filter", correctPosition: 0 },
          { id: "2", label: "ChatGPT writing an essay", correctPosition: 1 },
          { id: "3", label: "Face recognition unlock", correctPosition: 0 },
          { id: "4", label: "DALL-E creating an image", correctPosition: 1 },
          { id: "5", label: "Midjourney art generation", correctPosition: 1 },
          { id: "6", label: "Fraud detection system", correctPosition: 0 },
        ],
        feedback: {
          correct:
            "You've got it! Classification = Traditional AI. Creation = Generative AI.",
          incorrect:
            "Not quite — remember: if it creates new content, it's generative. If it sorts/classifies, it's traditional.",
        },
      },
      {
        type: "check",
        question: "What makes Generative AI different from traditional AI?",
        options: [
          { text: "It classifies data into categories", correct: false },
          {
            text: "It creates new, original content from learned patterns",
            correct: true,
          },
          { text: "It runs faster on modern hardware", correct: false },
          { text: "It only works with text data", correct: false },
        ],
        explanation:
          "Generative AI creates new content — text, images, code — by learning patterns from data. Traditional AI classifies or predicts but doesn't generate.",
      },
      {
        type: "realworld",
        company: "GitHub Copilot",
        what: "Used Gen AI to auto-complete and generate code for developers directly inside their editor.",
        result:
          "Developers completing tasks 55% faster. Over 100M lines of code generated daily.",
      },
      {
        type: "takeaway",
        summary:
          "Generative AI creates new content by learning patterns from massive datasets — it's the performer, not the judge.",
        nextTeaser:
          "Next: How do LLMs actually generate text, word by word? The answer is simpler (and weirder) than you think.",
      },
    ],
  },

  // ── Module 2: How LLMs Work ──
  {
    id: "l1-m2",
    level: 1,
    levelName: "Beginner",
    category: "LLM Fundamentals",
    title: "How LLMs Actually Work",
    moduleType: "Core Concept",
    icon: "brain",
    estimatedMinutes: 1,
    outcomes: [
      "Explain tokens, context windows, and next-token prediction",
      "Understand why LLMs hallucinate",
      "Describe base models vs instruction-tuned models",
    ],
    cards: [
      {
        type: "hook",
        headline:
          "LLMs don't understand language. They predict the next word.",
        subheadline:
          "The most powerful AI systems are autocomplete on steroids. Understanding this changes how you use them.",
      },
      {
        type: "concept",
        title: "Next-Token Prediction",
        body: "LLMs break text into tokens (roughly words). Given all previous tokens, the model predicts which comes next. It repeats thousands of times to generate paragraphs. The 'context window' is how many tokens it can see — typically 4K to 128K.",
        analogy:
          "Imagine the world's most well-read person playing a game: you say a sentence, they guess the next word. That's an LLM — except it's read the entire internet.",
      },
      {
        type: "visual",
        title: "From Input to Output",
        steps: [
          {
            label: "Tokenization",
            description: "Your text is split into small pieces called tokens",
          },
          {
            label: "Context Window",
            description:
              "All tokens feed into the model's attention mechanism",
          },
          {
            label: "Prediction",
            description:
              "The model calculates probability of every possible next token",
          },
          {
            label: "Sampling",
            description:
              "One token is selected, added to context, process repeats",
          },
        ],
      },
      {
        type: "interactive",
        title: "Build the LLM Pipeline",
        instruction:
          "Put these steps in the correct order to show how an LLM generates text.",
        interactionType: "sequence",
        items: [
          { id: "a", label: "Tokenize input text", correctPosition: 0 },
          {
            id: "b",
            label: "Feed tokens into attention layers",
            correctPosition: 1,
          },
          {
            id: "c",
            label: "Calculate next-token probabilities",
            correctPosition: 2,
          },
          {
            id: "d",
            label: "Sample and output a token",
            correctPosition: 3,
          },
        ],
        feedback: {
          correct:
            "That's the pipeline! Tokenize → Attend → Predict → Sample → Repeat.",
          incorrect:
            "Remember: the model first breaks text into tokens, processes them, predicts the next token, then samples it.",
        },
      },
      {
        type: "check",
        question:
          "Why do LLMs sometimes hallucinate (make up facts confidently)?",
        options: [
          {
            text: "They access a database and sometimes get errors",
            correct: false,
          },
          {
            text: "They predict the most likely next token, even if factually wrong",
            correct: true,
          },
          {
            text: "They run out of memory during generation",
            correct: false,
          },
          { text: "The training data was deleted", correct: false },
        ],
        explanation:
          "LLMs predict statistically likely text, not factually verified text. They'll confidently complete a sentence even when it's wrong — because it sounds right.",
      },
      {
        type: "realworld",
        company: "ChatGPT (OpenAI)",
        what: "Made LLMs accessible by instruction-tuning GPT-3.5 so it follows conversational instructions.",
        result:
          "Reached 100M users in 2 months — fastest-growing consumer app in history at the time.",
      },
      {
        type: "takeaway",
        summary:
          "LLMs are next-token predictors in a context window. They hallucinate because they predict what sounds right, not what is right.",
        nextTeaser:
          "Next: Tokens are the atoms of LLMs. How you think in tokens changes everything.",
      },
    ],
  },

  // ── Module 3: Tokens & Context Windows ──
  {
    id: "l1-m3",
    level: 1,
    levelName: "Beginner",
    category: "LLM Fundamentals",
    title: "Tokens & Context Windows",
    moduleType: "Core Concept",
    icon: "hash",
    estimatedMinutes: 1,
    outcomes: [
      "Understand what tokens are and how text is tokenized",
      "Know why context window size matters for your prompts",
      "Calculate approximate token counts",
    ],
    cards: [
      {
        type: "hook",
        headline: "You're charged per token. Do you even know what one is?",
        subheadline:
          "Every API call, every prompt, every response — it's all measured in tokens. Understanding them saves you money and gets better results.",
      },
      {
        type: "concept",
        title: "What Are Tokens?",
        body: "Tokens are chunks of text — roughly ¾ of a word in English. 'Chatbot' is 1 token. 'Unbelievable' is 3 tokens. Spaces and punctuation count too. Models see tokens, not words. This is why unusual spellings confuse them.",
        analogy:
          "Tokens are like LEGO bricks for language. The model doesn't see the whole castle (word) — it sees individual bricks it can combine in any order.",
      },
      {
        type: "visual",
        title: "Tokenization in Action",
        steps: [
          {
            label: "Input Text",
            description: '"The quick brown fox" → 4 tokens',
          },
          {
            label: "Subword Split",
            description:
              '"Unbelievable" → "Un" + "believ" + "able" = 3 tokens',
          },
          {
            label: "Context Window",
            description:
              "GPT-4: 128K tokens ≈ a 300-page book of context",
          },
          {
            label: "Cost Impact",
            description:
              "GPT-4o: ~$2.50 per 1M input tokens, ~$10 per 1M output tokens",
          },
        ],
      },
      {
        type: "check",
        question: "Approximately how many tokens is 750 words of English text?",
        options: [
          { text: "~500 tokens", correct: false },
          { text: "~750 tokens", correct: false },
          { text: "~1,000 tokens", correct: true },
          { text: "~2,000 tokens", correct: false },
        ],
        explanation:
          "The rule of thumb is 1 token ≈ ¾ of a word, so 750 words ≈ 1,000 tokens. This helps you estimate costs and context window usage.",
      },
      {
        type: "realworld",
        company: "Anthropic (Claude)",
        what: "Released Claude with a 200K token context window — enough to process entire codebases or legal documents in one go.",
        result:
          "Lawyers and developers use it to analyze 500-page documents without chunking, dramatically simplifying workflows.",
      },
      {
        type: "takeaway",
        summary:
          "Tokens are the atoms of LLMs — roughly ¾ of a word. Context window size determines how much the model can see at once.",
        nextTeaser:
          "Next: The prompt is everything. Learn the framework that turns mediocre AI answers into great ones.",
      },
    ],
  },

  // ── Module 4: Prompt Engineering ──
  {
    id: "l1-m4",
    level: 1,
    levelName: "Beginner",
    category: "LLM Fundamentals",
    title: "Prompt Engineering Basics",
    moduleType: "Core Concept + Interactive",
    icon: "pencil",
    estimatedMinutes: 1,
    outcomes: [
      "Write a clear, structured prompt using role-task-format",
      "Apply zero-shot vs few-shot prompting",
      "Identify why vague prompts produce poor results",
    ],
    cards: [
      {
        type: "hook",
        headline:
          "The difference between a bad AI answer and a great one? Your prompt.",
        subheadline:
          "80% of people get mediocre results because they ask mediocre questions. A few small changes fix everything.",
      },
      {
        type: "concept",
        title: "The Role-Task-Format Framework",
        body: "Every great prompt has three parts: Role (who the AI should be), Task (what it should do), and Format (how to structure the output). Adding context and constraints makes it even better. Vagueness in, vagueness out.",
        analogy:
          "Prompting AI is like briefing a very smart intern on their first day. They're capable of anything, but vague instructions get you vague work.",
      },
      {
        type: "visual",
        title: "Prompting Techniques",
        steps: [
          {
            label: "Zero-Shot",
            description:
              "Ask directly with no examples: 'Classify this review'",
          },
          {
            label: "Few-Shot",
            description:
              "Provide 2-3 examples before your request so the model learns the pattern",
          },
          {
            label: "Chain-of-Thought",
            description:
              "Ask the model to think step by step for complex reasoning",
          },
          {
            label: "System Prompt",
            description:
              "Set persistent behavior and persona for the conversation",
          },
        ],
      },
      {
        type: "interactive",
        title: "Fix the Prompt",
        instruction:
          "Arrange these prompt components in the best order to get a high-quality AI response.",
        interactionType: "sequence",
        items: [
          {
            id: "r",
            label: "Role: 'You are an expert copywriter'",
            correctPosition: 0,
          },
          {
            id: "c",
            label: "Context: 'For a B2B SaaS product launch'",
            correctPosition: 1,
          },
          {
            id: "t",
            label: "Task: 'Write 3 LinkedIn post ideas'",
            correctPosition: 2,
          },
          {
            id: "f",
            label: "Format: 'Keep each under 100 words, use bullet points'",
            correctPosition: 3,
          },
        ],
        feedback: {
          correct:
            "Role → Context → Task → Format. This structure consistently produces the best results!",
          incorrect:
            "Try: Role first (who), then Context (background), Task (what to do), Format (how to present it).",
        },
      },
      {
        type: "check",
        question: "Which prompt will produce better results?",
        options: [
          { text: "'Write something about marketing'", correct: false },
          {
            text: "'You are a CMO. Write 3 LinkedIn post ideas for a B2B SaaS launch. Keep each under 100 words.'",
            correct: true,
          },
          { text: "'Marketing. Go.'", correct: false },
          {
            text: "'Please help me with my marketing strategy'",
            correct: false,
          },
        ],
        explanation:
          "The second prompt uses Role (CMO), Task (3 LinkedIn posts for B2B SaaS), and Format (under 100 words). Specificity drives quality.",
      },
      {
        type: "realworld",
        company: "Anthropic (Claude)",
        what: "Published research showing structured system prompts with explicit constraints consistently outperform unstructured ones.",
        result:
          "Developers using structured prompts saw 40% improvement in output relevance across benchmarks.",
      },
      {
        type: "takeaway",
        summary:
          "Great prompts use Role-Task-Format. Few-shot examples teach the model your pattern. Specificity is everything.",
        nextTeaser:
          "You've completed LLM Fundamentals! Next: Level 2 — RAG. Learn how to give AI access to your data.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════
   LEVEL 2 — RAG (Retrieval-Augmented Generation)
   ═══════════════════════════════════════════ */

const level2Modules: CourseModule[] = [
  // ── Module 1: How RAG Works ──
  {
    id: "l2-m1",
    level: 2,
    levelName: "Intermediate",
    category: "RAG",
    title: "How RAG Works",
    moduleType: "Core Concept",
    icon: "book",
    estimatedMinutes: 1,
    outcomes: [
      "Explain the retrieve-augment-generate pipeline",
      "Understand vector embeddings and semantic search",
      "Know when to use RAG vs fine-tuning",
    ],
    cards: [
      {
        type: "hook",
        headline: "LLMs are smart but clueless about your data.",
        subheadline:
          "RAG fixes this by giving the model your documents at query time — no retraining needed.",
      },
      {
        type: "concept",
        title: "Retrieve, Augment, Generate",
        body: "RAG has three steps: retrieve relevant documents from your knowledge base using semantic search. Augment the LLM's prompt by injecting those documents as context. Then the model generates a grounded answer using both its knowledge and your data.",
        analogy:
          "RAG is like an open-book exam. The student (LLM) is smart, but instead of relying on memory, they look up the answer in their notes (your documents) first.",
      },
      {
        type: "visual",
        title: "The RAG Pipeline",
        steps: [
          {
            label: "Embed Documents",
            description:
              "Convert your documents into vector embeddings and store them",
          },
          {
            label: "User Query",
            description:
              "Convert the user's question into a vector embedding",
          },
          {
            label: "Semantic Search",
            description:
              "Find the most similar document chunks to the query",
          },
          {
            label: "Generate",
            description:
              "Feed retrieved chunks + query to the LLM for a grounded answer",
          },
        ],
      },
      {
        type: "interactive",
        title: "Build the RAG Pipeline",
        instruction:
          "Put these RAG pipeline steps in the correct order.",
        interactionType: "sequence",
        items: [
          {
            id: "a",
            label: "Split documents into chunks",
            correctPosition: 0,
          },
          {
            id: "b",
            label: "Generate vector embeddings for each chunk",
            correctPosition: 1,
          },
          {
            id: "c",
            label: "Store embeddings in a vector database",
            correctPosition: 2,
          },
          {
            id: "d",
            label: "Embed user query & search for similar chunks",
            correctPosition: 3,
          },
          {
            id: "e",
            label: "Inject retrieved chunks into the LLM prompt",
            correctPosition: 4,
          },
        ],
        feedback: {
          correct:
            "Chunk → Embed → Store → Search → Inject → Generate. You've nailed the RAG pipeline!",
          incorrect:
            "Think of it as: prepare data first (chunk → embed → store), then at query time (search → inject → generate).",
        },
      },
      {
        type: "check",
        question: "When should you use RAG instead of fine-tuning?",
        options: [
          {
            text: "When you want to change the model's writing style",
            correct: false,
          },
          {
            text: "When you need the model to access up-to-date or private documents",
            correct: true,
          },
          { text: "When you need faster inference speed", correct: false },
          {
            text: "When the model needs to learn a new language",
            correct: false,
          },
        ],
        explanation:
          "RAG is ideal for dynamic, private, or frequently updated data. Fine-tuning is better for changing model behavior or style.",
      },
      {
        type: "realworld",
        company: "Notion AI",
        what: "Uses RAG to let users ask questions about their own workspace. The AI retrieves relevant pages and generates answers grounded in your actual notes.",
        result:
          "Users get accurate, workspace-specific answers instead of generic LLM responses.",
      },
      {
        type: "takeaway",
        summary:
          "RAG retrieves your documents, injects them as context, and generates grounded answers. It's an open-book exam for LLMs.",
        nextTeaser:
          "Next: Vector embeddings — the secret math that makes semantic search possible.",
      },
    ],
  },

  // ── Module 2: Vector Embeddings & Search ──
  {
    id: "l2-m2",
    level: 2,
    levelName: "Intermediate",
    category: "RAG",
    title: "Vector Embeddings & Semantic Search",
    moduleType: "Core Concept",
    icon: "compass",
    estimatedMinutes: 1,
    outcomes: [
      "Understand what vector embeddings represent",
      "Explain how semantic search differs from keyword search",
      "Choose between different embedding models",
    ],
    cards: [
      {
        type: "hook",
        headline: "How does AI know 'happy' and 'joyful' mean the same thing?",
        subheadline:
          "Vector embeddings turn words into numbers that capture meaning. This math powers every RAG system.",
      },
      {
        type: "concept",
        title: "Embeddings: Meaning as Numbers",
        body: "An embedding converts text into a list of numbers (a vector) where similar meanings are close together in space. 'King' and 'Queen' are nearby. 'King' and 'Banana' are far apart. This lets you search by meaning, not just exact keywords.",
        analogy:
          "Embeddings are like GPS coordinates for meaning. Just as nearby GPS points mean nearby locations, nearby embeddings mean similar concepts.",
      },
      {
        type: "visual",
        title: "Keyword vs Semantic Search",
        steps: [
          {
            label: "Keyword Search",
            description:
              "Matches exact words: searching 'car' won't find 'automobile'",
          },
          {
            label: "Semantic Search",
            description:
              "Matches meaning: 'car', 'automobile', 'vehicle' all match",
          },
          {
            label: "Embedding Model",
            description:
              "Converts text to 768–1536 dimensional vectors capturing meaning",
          },
          {
            label: "Cosine Similarity",
            description:
              "Measures how close two vectors are — closer = more similar meaning",
          },
        ],
      },
      {
        type: "interactive",
        title: "Match by Meaning",
        instruction:
          "Which pairs would have HIGH cosine similarity? Put the most similar pair first.",
        interactionType: "sequence",
        items: [
          {
            id: "1",
            label: "'Happy' ↔ 'Joyful'",
            correctPosition: 0,
          },
          {
            id: "2",
            label: "'Car' ↔ 'Automobile'",
            correctPosition: 1,
          },
          {
            id: "3",
            label: "'Python' ↔ 'Snake'",
            correctPosition: 2,
          },
          {
            id: "4",
            label: "'Banana' ↔ 'Democracy'",
            correctPosition: 3,
          },
        ],
        feedback: {
          correct:
            "Exact synonyms are closest, then same-category words, then ambiguous words, then unrelated ones!",
          incorrect:
            "Think about how similar the meanings are — exact synonyms → related concepts → ambiguous → unrelated.",
        },
      },
      {
        type: "check",
        question:
          "Why is semantic search better than keyword search for RAG?",
        options: [
          { text: "It's faster to compute", correct: false },
          {
            text: "It finds relevant documents even when different words are used",
            correct: true,
          },
          { text: "It doesn't require a database", correct: false },
          { text: "It works without an embedding model", correct: false },
        ],
        explanation:
          "Semantic search understands meaning, so 'How do I fix this bug?' matches a doc titled 'Debugging Guide' even though no words match exactly.",
      },
      {
        type: "realworld",
        company: "Pinecone",
        what: "Built a purpose-built vector database for storing and searching embeddings at scale, optimized for RAG applications.",
        result:
          "Powers RAG systems at companies like Shopify and Notion, handling billions of vectors with millisecond search times.",
      },
      {
        type: "takeaway",
        summary:
          "Embeddings turn meaning into numbers. Semantic search finds relevant content regardless of exact wording. It's the backbone of RAG.",
        nextTeaser:
          "Next: RAG vs Fine-tuning vs Prompting — the decision framework you'll use every week.",
      },
    ],
  },

  // ── Module 3: RAG vs Fine-tuning vs Prompting ──
  {
    id: "l2-m3",
    level: 2,
    levelName: "Intermediate",
    category: "RAG",
    title: "RAG vs Fine-tuning vs Prompting",
    moduleType: "Comparison Module",
    icon: "target",
    estimatedMinutes: 1,
    outcomes: [
      "Compare all three approaches across cost, speed, accuracy",
      "Choose the right approach for a given scenario",
      "Understand data requirements for each approach",
    ],
    cards: [
      {
        type: "hook",
        headline: "Prompting, RAG, or fine-tuning? Wrong choice = wasted months.",
        subheadline:
          "Most teams pick the most complex approach first. Here's a framework to choose correctly in 60 seconds.",
      },
      {
        type: "concept",
        title: "Three Approaches, One Decision",
        body: "Prompting is free and fast — change the input. RAG adds your data at query time — no training needed. Fine-tuning rewires the model's behavior with your data — expensive but powerful. Start with prompting, add RAG for knowledge, fine-tune only for style/behavior.",
        analogy:
          "Prompting is giving someone better instructions. RAG is giving them a reference book. Fine-tuning is sending them to a specialized training program.",
      },
      {
        type: "visual",
        title: "When to Use What",
        steps: [
          {
            label: "Prompting",
            description:
              "Best for: quick iteration, style control. Cost: ~free",
          },
          {
            label: "RAG",
            description:
              "Best for: private/updated data, factual accuracy. Cost: low",
          },
          {
            label: "Fine-tuning",
            description:
              "Best for: behavior change, domain expertise. Cost: high",
          },
          {
            label: "Decision Rule",
            description:
              "Start simple → prompt first → add RAG → fine-tune only if needed",
          },
        ],
      },
      {
        type: "interactive",
        title: "Pick the Right Approach",
        instruction:
          "For each scenario, would you use Prompting (0), RAG (1), or Fine-tuning (2)? Order them by when you'd reach for each.",
        interactionType: "sequence",
        items: [
          {
            id: "a",
            label: "Quick formatting of output",
            correctPosition: 0,
          },
          {
            id: "b",
            label: "Answering questions from company docs",
            correctPosition: 1,
          },
          {
            id: "c",
            label: "Teaching model a brand-new domain language",
            correctPosition: 2,
          },
        ],
        feedback: {
          correct:
            "Prompt for formatting, RAG for data access, fine-tune for deep behavior change. Start simple!",
          incorrect:
            "Remember the rule: Prompt first (easy fixes) → RAG (data needs) → Fine-tune (behavior change).",
        },
      },
      {
        type: "check",
        question:
          "Your support bot needs to answer from product docs that change weekly. Best approach?",
        options: [
          {
            text: "Fine-tune the model on docs every week",
            correct: false,
          },
          {
            text: "Use RAG to retrieve current docs at query time",
            correct: true,
          },
          {
            text: "Write very detailed prompts with all product info",
            correct: false,
          },
          { text: "Train a custom model from scratch", correct: false },
        ],
        explanation:
          "RAG is perfect — docs change frequently, you need factual accuracy, and retraining weekly would be wasteful.",
      },
      {
        type: "realworld",
        company: "Stripe",
        what: "Uses RAG (for API docs) + prompt engineering (for formatting) to power their developer assistant.",
        result:
          "Developers get accurate, up-to-date answers about Stripe APIs without any model fine-tuning.",
      },
      {
        type: "takeaway",
        summary:
          "Start with prompting, add RAG for data, fine-tune for behavior. Most problems don't need fine-tuning.",
        nextTeaser:
          "Congratulations — you've completed Level 2! You now understand RAG end-to-end. Level 3 coming soon.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════ */

export const courseLevels: CourseLevel[] = [
  {
    level: 1,
    name: "LLM Fundamentals",
    subtitle: "How language models think",
    description:
      "Master the core concepts behind generative AI, tokens, context windows, and prompt engineering.",
    icon: "brain",
    accentColor: "#8B5CF6",
    modules: level1Modules,
  },
  {
    level: 2,
    name: "RAG",
    subtitle: "Give AI your data",
    description:
      "Learn how retrieval-augmented generation connects LLMs to your documents for grounded, accurate answers.",
    icon: "book",
    accentColor: "#3B82F6",
    modules: level2Modules,
  },
];

export default courseLevels;
