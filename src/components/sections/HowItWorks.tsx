import { ArrowRight, BookOpen, CirclePlay, MessageCircleMore } from 'lucide-react';
import type { ComponentType } from 'react';

import { useSiteState, type DialogId } from '../../site-state';

type Step = {
  number: string;
  /** Клас задає колір картки. */
  tone: 'step-blue' | 'step-pink' | 'step-lime';
  Icon: ComponentType;
  title: string;
  text: string;
  action: string;
  opens: DialogId;
};

const steps: Step[] = [
  {
    number: '01',
    tone: 'step-blue',
    Icon: CirclePlay,
    title: 'Дивись',
    text: 'Відкрий короткий фрагмент уроку й одразу спробуй нову конструкцію.',
    action: 'Спробувати урок',
    opens: 'practice',
  },
  {
    number: '02',
    tone: 'step-pink',
    Icon: BookOpen,
    title: 'Практикуй',
    text: 'Пройди мінітест, перевір відповіді та відкрий пояснення до помилок.',
    action: 'Почати вправу',
    opens: 'practice',
  },
  {
    number: '03',
    tone: 'step-lime',
    Icon: MessageCircleMore,
    title: 'Отримуй фідбек',
    text: 'Надішли питання або домовся про перше безкоштовне знайомство.',
    action: 'Зв’язатися',
    opens: 'contact',
  },
];

export function HowItWorks() {
  const { openDialog } = useSiteState();

  return (
    <section className="section" id="how">
      <div className="section-heading">
        <span className="eyebrow">Навчання, яке тримає темп</span>
        <h2>
          Не просто дивитися.
          <br />
          <em>Почати говорити.</em>
        </h2>
      </div>

      <div className="steps-grid">
        {steps.map(({ number, tone, Icon, title, text, action, opens }) => (
          <button
            key={number}
            className={`step-card ${tone}`}
            onClick={() => openDialog(opens)}
          >
            <span>{number}</span>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
            <b>
              {action} <ArrowRight />
            </b>
          </button>
        ))}
      </div>
    </section>
  );
}
