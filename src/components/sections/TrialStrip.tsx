import { ArrowRight } from 'lucide-react';

import { useSiteState } from '../../site-state';

export function TrialStrip() {
  const { openDialog } = useSiteState();

  return (
    <section className="trial-strip" aria-label="Безкоштовний демодоступ">
      <div>
        <span className="eyebrow">Перед оплатою</span>
        <h2>Спробуй навчання протягом 3 днів</h2>
        <p>Відкрий мініурок, вправу з поясненням помилки та digital-словник.</p>
      </div>
      <button className="primary-cta" onClick={() => openDialog('trial')}>
        Отримати демодоступ <ArrowRight size={20} />
      </button>
    </section>
  );
}
