import { Lesson } from "../explore-syllabus";

export const DEMO_LESSONS: Lesson[] = [
  {
    id: "les-1-1",
    title: "1. Introduction to Large Language Models",
    type: "lesson",
    completed: true,
    content: [
      {
        title: "What are LLMs?",
        body: "Large Language Models (LLMs) are specialized AI models trained on vast amounts of text data. They excel at predicting the next word in a sequence and generating human-like text.",
        icon: "chatbubble-ellipses-outline",
      },
      {
        title: "Scale is Key",
        body: "LLMs achieve their capabilities through enormous scale—often billions or trillions of parameters, trained across huge clusters of specialized GPUs over months.",
        icon: "hardware-chip-outline",
      },
    ],
  },
  {
    id: "les-1-2",
    title: "2. The Architecture of LLMs",
    type: "lesson",
    completed: false,
    content: [
      {
        title: "The Transformer",
        body: "Most modern LLMs are based on the Transformer architecture introduced by Google in 2017. The key innovation was the 'attention mechanism'.",
        icon: "flash-outline",
      },
      {
        title: "Attention is All You Need",
        body: "Attention allows the model to weigh the importance of different words in a sentence relative to each other, maintaining context better than older architectures.",
        icon: "eye-outline",
      },
    ],
  },
  {
    id: "les-1-3",
    title: "3. Understanding Tokenization",
    type: "lesson",
    completed: false,
    content: [
      {
        title: "Tokens, not words",
        body: "LLMs do not read words; they process 'tokens'. A token could be a whole word, part of a word, or even just a single character.",
        icon: "cut-outline",
      },
      {
        title: "Why it matters",
        body: "The way text is tokenized affects performance and context limits. Models have a maximum 'context window' of tokens they can handle at once.",
        icon: "albums-outline",
      },
    ],
  },
];
