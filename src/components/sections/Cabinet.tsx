import { ArrowRight, CirclePlay } from 'lucide-react';

import { lessons } from '../../data/lessons';
import { useSiteState } from '../../site-state';

/** Скільки уроків видно у прев'ю кабінету. */
const LESSONS_IN_PREVIEW = 3;

export function Cabinet() {
  const { openDialog, openPractice, lessonNumber, progress } = useSiteState();

  return (
    <section className="section cabinet" id="cabinet">
      <div className="cabinet-copy">
        <span className="eyebrow">Особистий кабінет</span>
        <h2>
          Усе навчання —
          <br />
          <em>в одному місці</em>
        </h2>
        <p>
          Після реєстрації тут з’являться придбані курси, прогрес, домашні завдання та відповіді
          викладачки.
        </p>
        <button className="primary-cta" onClick={() => openDialog('login')}>
          Створити кабінет <ArrowRight size={19} />
        </button>
      </div>

      <div className="dashboard-mock">
        <div className="dash-head">
          <div>
            <small>Попередній вигляд особистого кабінету</small>
            <h3>A1 · Перші слова</h3>
          </div>
          <span>{lessonNumber} із 12</span>
        </div>

        <div className="progress-track">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="dash-body">
          {lessons.slice(0, LESSONS_IN_PREVIEW).map((lesson, index) => (
            <button
              key={lesson.title}
              className={lessonNumber === index + 1 ? 'active' : ''}
              onClick={() => openPractice(lesson, index)}
            >
              <span>{index + 1}</span>
              <div>
                <b>{lesson.title}</b>
                <small>Натисни, щоб відкрити приклад уроку</small>
              </div>
              <CirclePlay />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
