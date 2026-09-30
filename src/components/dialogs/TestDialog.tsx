import { ArrowRight, Check } from 'lucide-react';

import { courses } from '../../data/courses';
import { tests } from '../../data/tests';
import { useSiteState } from '../../site-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export function TestDialog() {
  const {
    activeDialog,
    closeDialog,
    openDialog,
    openCourse,
    activeTest,
    selectTest,
    clearTest,
    answers,
    answerQuestion,
    submitted,
    submitTest,
    expandedWhy,
    setExpandedWhy,
    questions,
    correctCount,
    recommendedLevel,
  } = useSiteState();

  const answeredAll = answers.filter((answer) => answer !== undefined).length >= questions.length;

  return (
    <Dialog open={activeDialog === 'test'} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="test-dialog">
        <DialogHeader>
          <DialogTitle>Визнач свій рівень</DialogTitle>
          <DialogDescription>
            Обери формат. Кожен тест містить 10 різних запитань із поясненнями.
          </DialogDescription>
        </DialogHeader>

        {!activeTest ? (
          // Крок 1 — вибір формату перевірки.
          <div className="test-variants">
            {tests.map((test) => (
              <button key={test.id} onClick={() => selectTest(test)}>
                <span>10 запитань</span>
                <b>{test.title}</b>
                <small>{test.note}</small>
                <ArrowRight />
              </button>
            ))}
            <button className="teacher-test" onClick={() => openDialog('contact')}>
              <span>Особисто</span>
              <b>Визначити рівень з викладачем</b>
              <small>Коротка розмова та точна рекомендація</small>
              <ArrowRight />
            </button>
          </div>
        ) : !submitted ? (
          // Крок 2 — самі питання.
          <div className="test-list">
            <button className="back-test" onClick={clearTest}>
              ← Обрати інший тест
            </button>
            {questions.map((question, questionIndex) => (
              <fieldset key={question.q}>
                <legend>
                  {questionIndex + 1}. {question.q}
                </legend>
                {question.options.map((option, optionIndex) => (
                  <label
                    key={option}
                    className={answers[questionIndex] === optionIndex ? 'chosen' : ''}
                  >
                    <input
                      type="radio"
                      name={`q${questionIndex}`}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() => answerQuestion(questionIndex, optionIndex)}
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
            ))}
            <button className="login-main" disabled={!answeredAll} onClick={submitTest}>
              Перевірити відповіді
            </button>
          </div>
        ) : (
          // Крок 3 — результат із розбором кожного питання.
          <div className="test-result">
            <span>Твоя попередня рекомендація</span>
            <strong>{recommendedLevel}</strong>
            <p>
              Правильних відповідей: {correctCount} із {questions.length}
            </p>
            {questions.map((question, index) => {
              const right = answers[index] === question.right;
              return (
                <div key={question.q} className={right ? 'answer-row correct' : 'answer-row wrong'}>
                  <div>
                    <Check />
                    <span>
                      {index + 1}. {right ? 'Правильно' : 'Потрібно повторити'}
                    </span>
                  </div>
                  <button onClick={() => setExpandedWhy(expandedWhy === index ? null : index)}>
                    Пояснення
                  </button>
                  {expandedWhy === index && <p>{question.why}</p>}
                </div>
              );
            })}
            <div className="result-actions">
              <button
                className="primary-cta"
                onClick={() =>
                  openCourse(courses.find((c) => c.level === recommendedLevel) ?? courses[0])
                }
              >
                Переглянути курс {recommendedLevel}
              </button>
              <button className="secondary-dark" onClick={() => openDialog('contact')}>
                Уточнити рівень з викладачкою
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
