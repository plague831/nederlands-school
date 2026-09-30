import { ArrowRight } from 'lucide-react';

import { useSiteState } from '../../site-state';

export function SiteFooter() {
  const { openDialog, openLevelTest } = useSiteState();

  return (
    <footer>
      <div className="footer-main">
        <div className="brand footer-brand">
          <span className="brand-dot">hoi!</span>
          <span>NEDERLANDS</span>
        </div>
        <h2>
          Готова сказати
          <br />
          <em>своє перше hoi?</em>
        </h2>
        <button className="primary-cta light" onClick={openLevelTest}>
          Визначити рівень <ArrowRight />
        </button>
      </div>

      <div className="footer-links">
        <div>
          <b>Навчання</b>
          <a href="#courses">Курси A1–B2</a>
          <button onClick={openLevelTest}>Визначити рівень</button>
          <a href="#program">Програма</a>
        </div>
        <div>
          <b>Допомога</b>
          <button onClick={() => openDialog('contact')}>Підтримка</button>
          <button onClick={() => openDialog('contact')}>Зв’язатися з викладачкою</button>
          <a href="#cabinet">Особистий кабінет</a>
        </div>
        <div>
          <b>Документи</b>
          <button>Політика конфіденційності</button>
          <button>Умови користування</button>
          <button>Публічна оферта</button>
        </div>
        <div>
          <b>Контакти</b>
          <button className="social-button" onClick={() => openDialog('contact')}>
            Telegram ↗
          </button>
          <button className="social-button" onClick={() => openDialog('contact')}>
            Instagram ↗
          </button>
          <button className="social-button" onClick={() => openDialog('contact')}>
            Viber / телефон ↗
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Hoi! Nederlands</span>
        <span>Онлайн-школа нідерландської</span>
      </div>
    </footer>
  );
}
