import { Module } from "../explore-syllabus";

export const DEMO_MODULES: Module[] = [
  {
    id: "mod-1",
    title: "Module 1: Foundations of Artificial Intelligence",
    lessons: [
      {
        id: "les-1-1",
        title: "1. What is AI?",
        type: "lesson",
        completed: true,
        content: [
          {
            title: "Defining AI",
            body: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions.",
            icon: "bulb-outline",
          },
          {
            title: "Brief History of AI",
            body: "The term was coined in 1956 at a Dartmouth College conference. Since then, AI has undergone several boom and bust cycles, known as AI summers and winters.",
            icon: "time-outline",
          },
        ],
      },
      {
        id: "les-1-2",
        title: "2. Types of AI",
        type: "lesson",
        completed: false,
        content: [
          {
            title: "ANI, AGI, ASI",
            body: "Narrow AI is designed for specific tasks. General AI (AGI) aims to perform any intellectual task a human can. Super Intelligent AI (ASI) would surpass human intelligence.",
            icon: "layers-outline",
          },
        ],
      },
      {
        id: "les-1-3",
        title: "3. Fundamentals Quiz",
        type: "quiz",
        completed: false,
        quiz: [
          {
            question: "Which term refers to AI that surpasses human intelligence?",
            options: ["Narrow AI", "General AI", "Super Intelligent AI", "Generative AI"],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: "mod-2",
    title: "Module 2: Machine Learning vs Deep Learning",
    lessons: [
      {
        id: "les-2-1",
        title: "1. Machine Learning Basics",
        type: "lesson",
        completed: false,
        content: [
          {
            title: "How Machines Learn",
            body: "Machine learning is a subset of AI that involves training algorithms to learn patterns from data, enabling them to make predictions or decisions.",
            icon: "cog-outline",
          },
        ],
      },
      {
        id: "les-2-2",
        title: "2. The Deep Learning Revolution",
        type: "lesson",
        completed: false,
        content: [
          {
            title: "Neural Networks",
            body: "Deep learning uses multi-layered artificial neural networks, inspired by the human brain, to process data in complex ways.",
            icon: "git-network-outline",
          },
        ],
      },
    ],
  },
];
