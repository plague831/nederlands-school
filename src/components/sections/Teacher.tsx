import { ArrowRight } from 'lucide-react';

import { useSiteState } from '../../site-state';

export function Teacher() {
  const { openDialog } = useSiteState();

  return (
    <section className="section" id="teacher">
      <div className="teacher-card">
        <div className="teacher-badge">GEEN STRESS</div>
        <div className="teacher-portrait" aria-hidden="true">
          <span>hoi!</span>
        </div>
        <div className="teacher-copy">
          <span className="eyebrow">Знайомство з викладачкою</span>
          <h2>
            Привіт, я
            <br />
            <em>Валерія</em>
          </h2>
          <p>
            Тут буде особиста історія Валерії: освіта, досвід, життя з нідерландською та підхід до
            навчання. Додамо справжнє фото й точну біографію після отримання матеріалів.
          </p>
          <p>
            На безкоштовному знайомстві ви визначите ціль, перевірите рівень і зрозумієте, який
            формат навчання підійде саме вам.
          </p>
          <button className="primary-cta" onClick={() => openDialog('contact')}>
            Записатися на знайомство <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
