import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { courses, type Course } from './data/courses';
import { lessons, type Lesson } from './data/lessons';
import { tests, type Question, type TestSet } from './data/tests';

/** Діалоги сайту. Одночасно відкритий лише один. */
export type DialogId = 'course' | 'test' | 'practice' | 'login' | 'contact' | 'trial';

/** Уроків у повному курсі A1 — знаменник прогресу в кабінеті. */
const LESSONS_IN_COURSE = 12;

/** Набір питань, який показується, поки тест не обрано. */
const DEFAULT_QUESTIONS = tests[0].questions;

function levelForScore(correct: number): string {
  if (correct <= 3) return 'A1';
  if (correct <= 5) return 'A2';
  if (correct <= 8) return 'B1';
  return 'B2';
}

function useSiteStateValue() {
  const [activeDialog, setActiveDialog] = useState<DialogId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [savedWords, setSavedWords] = useState<string[]>(['hoi']);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [activeTest, setActiveTest] = useState<TestSet | null>(null);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [expandedWhy, setExpandedWhy] = useState<number | null>(null);

  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
  const [lessonNumber, setLessonNumber] = useState(1);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceChecked, setPracticeChecked] = useState(false);

  const [registered, setRegistered] = useState(false);
  const [trialReady, setTrialReady] = useState(false);
  const [email, setEmail] = useState('');

  const progress = useMemo(
    () => Math.round((lessonNumber / LESSONS_IN_COURSE) * 100),
    [lessonNumber]
  );

  const questions: Question[] = activeTest?.questions ?? DEFAULT_QUESTIONS;
  const correctCount = answers.reduce<number>(
    (total, answer, index) => total + Number(answer === questions[index]?.right),
    0
  );
  const recommendedLevel = levelForScore(correctCount);

  const closeDialog = useCallback(() => setActiveDialog(null), []);

  const openCourse = useCallback((course: Course) => {
    setSelectedCourse(course);
    setActiveDialog('course');
  }, []);

  /** Відкриває вибір тесту з чистого аркуша. */
  const openLevelTest = useCallback(() => {
    setActiveTest(null);
    setAnswers([]);
    setSubmitted(false);
    setExpandedWhy(null);
    setActiveDialog('test');
  }, []);

  const openPractice = useCallback((lesson: Lesson, index: number) => {
    setActiveLesson(lesson);
    setLessonNumber(index + 1);
    setPracticeAnswer('');
    setPracticeChecked(false);
    setActiveDialog('practice');
  }, []);

  const selectTest = useCallback((test: TestSet) => {
    setActiveTest(test);
    setAnswers([]);
    setSubmitted(false);
  }, []);

  const answerQuestion = useCallback((questionIndex: number, optionIndex: number) => {
    setAnswers((previous) => {
      const next = [...previous];
      next[questionIndex] = optionIndex;
      return next;
    });
  }, []);

  const toggleWord = useCallback((word: string) => {
    setSavedWords((previous) =>
      previous.includes(word) ? previous.filter((w) => w !== word) : [...previous, word]
    );
  }, []);

  return {
    activeDialog,
    openDialog: setActiveDialog,
    closeDialog,

    mobileMenuOpen,
    setMobileMenuOpen,

    selectedCourse,
    openCourse,

    savedWords,
    toggleWord,

    openFaq,
    setOpenFaq,

    activeTest,
    selectTest,
    clearTest: () => setActiveTest(null),
    answers,
    answerQuestion,
    submitted,
    submitTest: () => setSubmitted(true),
    expandedWhy,
    setExpandedWhy,
    questions,
    correctCount,
    recommendedLevel,
    openLevelTest,

    activeLesson,
    lessonNumber,
    openPractice,
    practiceAnswer,
    setPracticeAnswer,
    practiceChecked,
    setPracticeChecked,

    progress,

    registered,
    setRegistered,
    trialReady,
    setTrialReady,
    email,
    setEmail,
  };
}

type SiteState = ReturnType<typeof useSiteStateValue>;

const SiteStateContext = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const value = useSiteStateValue();
  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>;
}

export function useSiteState(): SiteState {
  const value = useContext(SiteStateContext);
  if (!value) throw new Error('useSiteState треба викликати всередині <SiteStateProvider>');
  return value;
}
