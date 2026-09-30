import { ArrowRight, Check } from 'lucide-react';

import { lessons } from '../../data/lessons';
import { useSiteState } from '../../site-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { PhoneInput } from '../ui/phone-input';

/** Що входить у демодоступ. */
const TRIAL_ITEMS = [
  'коротке пояснення',
  'інтерактивна вправа',
  'автоматичний розбір помилки',
  'digital-словник',
];

export function TrialDialog() {
  const { activeDialog, closeDialog, trialReady, setTrialReady, openPractice } = useSiteState();

  return (
    <Dialog open={activeDialog === 'trial'} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="login-dialog trial-dialog">
        <DialogHeader>
          <DialogTitle>{trialReady ? 'Демодоступ готовий' : '3 дні демодоступу'}</DialogTitle>
          <DialogDescription>
            {trialReady
              ? 'Почни з мініуроку й перевір, чи підходить тобі формат.'
              : 'Залиш контакти один раз. У повній версії посилання на демодоступ надійде на email.'}
          </DialogDescription>
        </DialogHeader>

        {trialReady ? (
          <div className="trial-ready">
            <span>Доступ на 3 дні</span>
            <h3>Знайомство та перші фрази</h3>
            <ul>
              {TRIAL_ITEMS.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="login-main"
              onClick={() => {
                setTrialReady(false);
                openPractice(lessons[0], 0);
              }}
            >
              Відкрити демоурок <ArrowRight />
            </button>
          </div>
        ) : (
          <form
            className="register-form"
            onSubmit={(event) => {
              event.preventDefault();
              setTrialReady(true);
            }}
          >
            <label>
              Ім’я
              <input required autoComplete="given-name" />
            </label>
            <label>
              Email
              <input required type="email" autoComplete="email" placeholder="name@gmail.com" />
            </label>
            <label>
              Номер телефону
              <PhoneInput />
            </label>
            <button className="login-main" type="submit">
              Отримати демодоступ <ArrowRight />
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
