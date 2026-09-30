import { ArrowRight, Check } from 'lucide-react';

import { courses } from '../../data/courses';
import { useSiteState } from '../../site-state';

/** Скільки переваг показуємо на картці (решта — у діалозі курсу). */
const FEATURES_ON_CARD = 5;

export function Courses() {
  const { openCourse, openLevelTest } = useSiteState();

  return (
    <section className="section courses" id="courses">
      <div className="section-heading compact">
        <span className="eyebrow">Курси за рівнями</span>
        <h2>
          Обери свій
          <br />
          <em>наступний рівень</em>
        </h2>
        <div className="course-intro">
          <p>
            Не знаєш, з чого почати? Пройди короткий тест або визнач рівень разом із викладачкою.
          </p>
          <button className="outline-light" onClick={openLevelTest}>
            Визначити рівень
          </button>
        </div>
      </div>

      <div className="course-grid">
        {courses.map((course) => (
          <article
            key={course.level}
            className={`course-card ${course.color}`}
            onClick={() => openCourse(course)}
            tabIndex={0}
            onKeyDown={(event) => event.key === 'Enter' && openCourse(course)}
          >
            <div className="course-top">
              <span>Рівень</span>
              <strong>{course.level}</strong>
            </div>
            <div>
              <h3>{course.title}</h3>
              <p>{course.note}</p>
            </div>
            <ul>
              {course.features.slice(0, FEATURES_ON_CARD).map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="course-bottom">
              <span>
                <small>повний курс</small>€{course.price}
              </span>
              <button aria-label={`Докладніше про курс ${course.level}`}>
                <ArrowRight />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
