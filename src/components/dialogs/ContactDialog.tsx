import { useSiteState } from '../../site-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { PhoneInput } from '../ui/phone-input';

const IMPROVE_OPTIONS = [
  'Розмовну мову',
  'Граматику',
  'Вимову',
  'Нідерландську для роботи',
  'Підготовку до переїзду',
];

const GOAL_OPTIONS = [
  'Говорити впевненіше',
  'Розуміти носіїв',
  'Скласти іспит',
  'Отримувати особистий фідбек',
];

export function ContactDialog() {
  const { activeDialog, closeDialog } = useSiteState();

  return (
    <Dialog open={activeDialog === 'contact'} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="login-dialog">
        <DialogHeader>
          <DialogTitle>Безкоштовне знайомство</DialogTitle>
          <DialogDescription>
            Залиш контакти — Валерія уточнить твій рівень, ціль і зручний формат навчання.
          </DialogDescription>
        </DialogHeader>

        <form
          className="register-form"
          onSubmit={(event) => {
            event.preventDefault();
            alert(
              'Заявку збережено в демонстраційному режимі. Реальну відправку підключимо після вибору сервісу.'
            );
            closeDialog();
          }}
        >
          <label>
            Ім’я та прізвище
            <input required placeholder="Як до тебе звертатися?" />
          </label>
          <label>
            Номер телефону
            <PhoneInput />
          </label>
          <label>
            Telegram або Viber
            <input required placeholder="@username або номер" />
          </label>

          <fieldset className="goal-options">
            <legend>Що хочеш покращити?</legend>
            {IMPROVE_OPTIONS.map((option) => (
              <label key={option}>
                <input type="checkbox" />
                {option}
              </label>
            ))}
          </fieldset>

          <fieldset className="goal-options">
            <legend>Що хочеш отримати від курсу?</legend>
            {GOAL_OPTIONS.map((option) => (
              <label key={option}>
                <input type="checkbox" />
                {option}
              </label>
            ))}
          </fieldset>

          <button className="login-main" type="submit">
            Надіслати заявку
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
