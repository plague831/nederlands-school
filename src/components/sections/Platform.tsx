import {
  ArrowRight,
  BookOpen,
  Check,
  Headphones,
  MessageCircleMore,
  Plus,
  Sparkles,
  Volume2,
} from 'lucide-react';

import { dictionaryWords } from '../../data/dictionary';
import { useSiteState } from '../../site-state';

/** Типи практики в картці activity-demo. */
const activities = [
  { Icon: Headphones, label: 'Слухай' },
  { Icon: MessageCircleMore, label: 'Говори' },
  { Icon: BookOpen, label: 'Пиши' },
];

export function Platform() {
  const { openDialog, savedWords, toggleWord } = useSiteState();

  return (
    <section className="section platform-section" id="platform">
      <div className="section-heading compact-heading">
        <span className="eyebrow">Інтерактивна платформа</span>
        <h2>
          Помилка — це
          <br />
          <em>частина маршруту</em>
        </h2>
        <p>
          Платформа не залишає тебе з червоною позначкою: вона підказує, пояснює правило й дає
          повторити схоже завдання.
        </p>
      </div>

      <div className="platform-grid">
        <article className="error-demo">
          <span className="feature-label">Автоматичне пояснення</span>
          <h3>
            Ik <s>ben heet</s> Anna
          </h3>
          <div className="error-note">
            <Sparkles />
            <div>
              <b>Правильніше: Ik heet Anna</b>
              <p>
                Для імені використовуємо дієслово <i>heten</i>. «Ik ben» означає «я є» і тут не
                поєднується з <i>heet</i>.
              </p>
            </div>
          </div>
          <button onClick={() => openDialog('practice')}>
            Спробувати вправу <ArrowRight size={18} />
          </button>
        </article>

        <article className="dictionary-demo">
          <span className="feature-label">Digital-словник</span>
          <h3>Твої слова з уроків</h3>
          {dictionaryWords.map(([dutch, translation]) => {
            const saved = savedWords.includes(dutch);
            return (
              <div className="word-row" key={dutch}>
                <button aria-label={`Прослухати ${dutch}`}>
                  <Volume2 size={18} />
                </button>
                <div>
                  <b>{dutch}</b>
                  <small>{translation}</small>
                </div>
                <button className={saved ? 'saved' : ''} onClick={() => toggleWord(dutch)}>
                  {saved ? <Check /> : <Plus />}
                </button>
              </div>
            );
          })}
          <p className="dictionary-progress">
            Збережено слів: <strong>{savedWords.length}</strong> · їх можна повторити у вправах
          </p>
        </article>

        <article className="activity-demo">
          <span className="feature-label">Різні типи практики</span>
          <div className="activity-icons">
            {activities.map(({ Icon, label }) => (
              <span key={label}>
                <Icon />
                {label}
              </span>
            ))}
          </div>
          <h3>Один урок — кілька навичок</h3>
          <p>Коротке відео → приклад → вправа → пояснення → повторення слів → фідбек.</p>
        </article>
      </div>
    </section>
  );
}
