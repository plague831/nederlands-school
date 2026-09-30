import { ArrowRight, ChevronRight } from 'lucide-react';

import { lessons } from '../../data/lessons';
import { scrollToSection } from '../../lib/scroll';
import { useSiteState } from '../../site-state';

export function Program() {
  const { openPractice } = useSiteState();

  return (
    <section className="section" id="program">
      <div className="program-panel">
        <div className="program-intro">
          <span className="eyebrow">Приклад програми A1</span>
          <h2>
            Від «hoi» до
            <br />
            <em>першої розмови</em>
          </h2>
          <p>Подивись, як теми, уроки, вправи та перевірка складаються в послідовний маршрут.</p>
          <button className="primary-cta light" onClick={() => scrollToSection('courses')}>
            Переглянути всю програму <ArrowRight size={19} />
          </button>
        </div>

        <div className="lesson-list">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.title}
              className="lesson-row"
              onClick={() => openPractice(lesson, index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{lesson.title}</h3>
                <small>{lesson.note}</small>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
