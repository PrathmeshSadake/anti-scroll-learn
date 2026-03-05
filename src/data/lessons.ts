export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface Lesson {
  id: number;
  topic: string;
  title: string;
  content: string;
  keyTakeaway: string;
  quiz: {
    question: string;
    options: QuizOption[];
  };
}

const lessons: Lesson[] = [
  {
    id: 1,
    topic: "JavaScript",
    title: "Closures",
    content:
      "A closure is a function that remembers the variables from its outer scope even after the outer function has finished executing. This lets inner functions access and manipulate those variables, creating powerful patterns like data privacy and function factories.",
    keyTakeaway:
      "Closures let functions 'remember' their creation environment.",
    quiz: {
      question: "What does a closure capture?",
      options: [
        { text: "Global variables only", correct: false },
        { text: "Variables from its outer scope", correct: true },
        { text: "Only primitive values", correct: false },
        { text: "The DOM elements", correct: false },
      ],
    },
  },
  {
    id: 2,
    topic: "Python",
    title: "List Comprehensions",
    content:
      "List comprehensions provide a concise way to create lists in Python. Instead of writing a multi-line for loop, you can generate a new list by applying an expression to each item in an iterable, optionally filtering with a condition -- all in a single readable line.",
    keyTakeaway:
      "List comprehensions turn multi-line loops into elegant one-liners.",
    quiz: {
      question: "What is the output of [x*2 for x in range(3)]?",
      options: [
        { text: "[0, 1, 2]", correct: false },
        { text: "[2, 4, 6]", correct: false },
        { text: "[0, 2, 4]", correct: true },
        { text: "[1, 2, 3]", correct: false },
      ],
    },
  },
  {
    id: 3,
    topic: "CSS",
    title: "Flexbox Basics",
    content:
      "Flexbox is a one-dimensional layout model that distributes space among items in a container. By setting display: flex, child elements automatically align in a row. Use justify-content for horizontal alignment and align-items for vertical alignment.",
    keyTakeaway:
      "Flexbox simplifies alignment and distribution of space in one dimension.",
    quiz: {
      question: "Which property aligns items along the main axis?",
      options: [
        { text: "align-items", correct: false },
        { text: "flex-direction", correct: false },
        { text: "justify-content", correct: true },
        { text: "flex-wrap", correct: false },
      ],
    },
  },
  {
    id: 4,
    topic: "React",
    title: "The useEffect Hook",
    content:
      "useEffect lets you perform side effects in functional components -- like fetching data, subscribing to events, or updating the document title. It runs after render and can optionally clean up by returning a function. The dependency array controls when it re-runs.",
    keyTakeaway:
      "useEffect handles side effects and runs after component renders.",
    quiz: {
      question: "When does useEffect with an empty dependency array run?",
      options: [
        { text: "On every render", correct: false },
        { text: "Only on mount", correct: true },
        { text: "Never", correct: false },
        { text: "Before render", correct: false },
      ],
    },
  },
  {
    id: 5,
    topic: "TypeScript",
    title: "Generics",
    content:
      "Generics allow you to write flexible, reusable functions and classes that work with multiple types while still preserving type safety. Instead of using 'any', a generic like <T> lets the caller decide the type, and TypeScript enforces it throughout.",
    keyTakeaway:
      "Generics provide type safety without sacrificing flexibility.",
    quiz: {
      question: "What does <T> represent in a generic function?",
      options: [
        { text: "A specific type called T", correct: false },
        { text: "A type parameter supplied by the caller", correct: true },
        { text: "The return type only", correct: false },
        { text: "A template string", correct: false },
      ],
    },
  },
  {
    id: 6,
    topic: "Algorithms",
    title: "Big O Notation",
    content:
      "Big O notation describes how an algorithm's time or space requirements grow as input size increases. O(1) is constant time, O(n) is linear, and O(n^2) is quadratic. It helps you compare algorithms and predict performance at scale.",
    keyTakeaway:
      "Big O tells you how an algorithm scales, not how fast it is.",
    quiz: {
      question: "What is the time complexity of searching an unsorted array?",
      options: [
        { text: "O(1)", correct: false },
        { text: "O(log n)", correct: false },
        { text: "O(n)", correct: true },
        { text: "O(n^2)", correct: false },
      ],
    },
  },
  {
    id: 7,
    topic: "Git",
    title: "Rebasing vs Merging",
    content:
      "Both rebase and merge integrate changes from one branch into another. Merge creates a new commit preserving history as-is. Rebase rewrites history by replaying your commits on top of another branch, resulting in a cleaner, linear commit log.",
    keyTakeaway:
      "Merge preserves history; rebase rewrites it for a linear log.",
    quiz: {
      question: "What does git rebase do to your commits?",
      options: [
        { text: "Deletes them permanently", correct: false },
        { text: "Replays them on top of another branch", correct: true },
        { text: "Squashes them into one", correct: false },
        { text: "Creates a merge commit", correct: false },
      ],
    },
  },
];

export function getTodaysLesson(): Lesson {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000
  );
  return lessons[dayOfYear % lessons.length];
}

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export default lessons;
