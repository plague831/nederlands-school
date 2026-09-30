import { ArrowRight } from 'lucide-react';

import { scrollToSection } from '../../lib/scroll';
import { useSiteState } from '../../site-state';
import { RibbonArt } from './RibbonArt';

export function Hero() {
  const { openLevelTest } = useSiteState();

  return (
    <section className="hero" id="top">
      <div className="hero-cloud cloud-one" />
      <div className="hero-cloud cloud-two" />

      <div className="hero-copy">
        <span className="eyebrow">Онлайн-школа нідерландської</span>
        <h1>
          Говори.
          <br />
          <em>Leef.</em> Живи.
        </h1>
        <p>
          Нідерландська для переїзду, роботи й живих розмов: короткі відеоуроки, багато практики та
          особистий фідбек викладачки.
        </p>
        <div className="hero-actions">
          <button className="primary-cta" onClick={openLevelTest}>
            Визначити свій рівень <ArrowRight size={20} />
          </button>
          <button className="secondary-cta" onClick={() => scrollToSection('courses')}>
            Обрати курс <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <RibbonArt />
      </div>

      <div className="hero-stats">
        <span>
          <strong>4</strong> рівні
        </span>
        <span>
          <strong>24–40</strong> уроків у курсі
        </span>
        <span>
          <strong>1:1</strong> фідбек
        </span>
      </div>
    </section>
  );
}
