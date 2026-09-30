import { Check } from 'lucide-react';

import { audience } from '../../data/audience';

export function Audience() {
  return (
    <section className="section audience-section">
      <div className="section-heading compact-heading">
        <span className="eyebrow">Для кого це навчання</span>
        <h2>
          Ти впізнаєш
          <br />
          <em>свою ситуацію</em>
        </h2>
      </div>

      <div className="audience-grid">
        {audience.map(([title, text]) => (
          <article key={title}>
            <Check />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
