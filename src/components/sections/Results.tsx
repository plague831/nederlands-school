import { scenarios } from '../../data/scenarios';

/** Показники над сіткою сценаріїв. */
const proofs = [
  ['4', 'послідовні рівні A1–B2'],
  ['24–40', 'уроків залежно від рівня'],
  ['3 × 10', 'запитань для перевірки рівня'],
  ['1:1', 'персональний фідбек у форматі з підтримкою'],
] as const;

export function Results() {
  return (
    <section className="section results" id="results">
      <div className="section-heading compact-heading">
        <span className="eyebrow">Мова для реального життя</span>
        <h2>
          Не вчи слова.
          <br />
          <em>Вирішуй ситуації.</em>
        </h2>
        <p>Кожна тема прив’язана до моменту, у якому тобі справді знадобиться нідерландська.</p>
      </div>

      <div className="proof-grid">
        {proofs.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="scenario-grid">
        {scenarios.map(([title, text], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
