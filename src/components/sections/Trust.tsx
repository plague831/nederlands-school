import { ArrowRight } from 'lucide-react';

import { useSiteState } from '../../site-state';

export function Trust() {
  const { openDialog, openLevelTest } = useSiteState();

  const cards = [
    {
      number: '01',
      title: 'Демодоступ до оплати',
      text: 'Три дні, щоб побачити урок, вправу, пояснення та словник.',
      action: 'Спробувати',
      onClick: () => openDialog('trial'),
    },
    {
      number: '02',
      title: 'Зрозумілий рівень',
      text: 'Три тести або коротка розмова з викладачем, якщо потрібне уточнення.',
      action: 'Визначити рівень',
      onClick: openLevelTest,
    },
    {
      number: '03',
      title: 'Жива підтримка',
      text: 'Можна познайомитися, поставити питання та обрати комфортний формат.',
      action: 'Познайомитися',
      onClick: () => openDialog('contact'),
    },
  ];

  return (
    <section className="section trust-section">
      <div className="section-heading compact-heading">
        <span className="eyebrow">Спокійне рішення</span>
        <h2>
          Спочатку перевір.
          <br />
          <em>Потім обирай.</em>
        </h2>
      </div>

      <div className="trust-grid">
        {cards.map(({ number, title, text, action, onClick }) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <button onClick={onClick}>
              {action} <ArrowRight />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
