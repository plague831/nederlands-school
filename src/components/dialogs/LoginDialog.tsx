import { useSiteState } from '../../site-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { PhoneInput } from '../ui/phone-input';

/** Домени, які підставляються одним кліком у поле email. */
const EMAIL_DOMAINS = ['gmail.com', 'ukr.net'];

export function LoginDialog() {
  const {
    activeDialog,
    closeDialog,
    selectedCourse,
    registered,
    setRegistered,
    email,
    setEmail,
  } = useSiteState();

  return (
    <Dialog open={activeDialog === 'login'} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="login-dialog">
        <DialogHeader>
          <DialogTitle>{registered ? 'Твій кабінет' : 'Створити особистий кабінет'}</DialogTitle>
          <DialogDescription>
            {registered
              ? 'Обраний курс збережено. Наступний крок — оплата.'
              : 'Введи дані один раз — вони збережуться для входу й зв’язку з викладачкою.'}
          </DialogDescription>
        </DialogHeader>

        {registered ? (
          <div className="owned-state">
            <span>{selectedCourse.level}</span>
            <div>
              <b>{selectedCourse.title}</b>
              <small>Курс обрано · оплату ще не завершено</small>
            </div>
            <button
              onClick={() => alert('Платіжний сервіс буде підключено після погодження.')}
            >
              Перейти до оплати · €{selectedCourse.price}
            </button>
          </div>
        ) : (
          <form
            className="register-form"
            onSubmit={(event) => {
              event.preventDefault();
              setRegistered(true);
            }}
          >
            <label>
              Прізвище
              <input required autoComplete="family-name" />
            </label>
            <label>
              Ім’я
              <input required autoComplete="given-name" />
            </label>
            <label>
              По батькові
              <input autoComplete="additional-name" />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="email-suggestions">
                {EMAIL_DOMAINS.map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => setEmail(`${email.split('@')[0]}@${domain}`)}
                  >
                    @{domain}
                  </button>
                ))}
              </span>
            </label>
            <label>
              Номер телефону
              <PhoneInput />
            </label>
            <button className="login-main" type="submit">
              Зареєструватися
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
