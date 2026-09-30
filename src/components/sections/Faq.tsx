import { faq } from '../../data/faq';
import { useSiteState } from '../../site-state';

export function Faq() {
  const { openFaq, setOpenFaq } = useSiteState();

  return (
    <section className="section faq-section" id="faq">
      <div className="faq-intro">
        <span className="eyebrow">Питання — відповідь</span>
        <h2>
          Перед стартом
          <br />
          <em>усе зрозуміло</em>
        </h2>
      </div>

      <div className="faq-list">
        {faq.map(([question, answer], index) => {
          const open = openFaq === index;
          return (
            <article key={question} className={open ? 'open' : ''}>
              <button onClick={() => setOpenFaq(open ? null : index)} aria-expanded={open}>
                <span>{question}</span>
                <span>{open ? '−' : '+'}</span>
              </button>
              {open && <p>{answer}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
