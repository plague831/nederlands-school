import { ArrowRight, Check } from 'lucide-react';

import { useSiteState } from '../../site-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export function CourseDialog() {
  const { activeDialog, closeDialog, openDialog, selectedCourse } = useSiteState();

  return (
    <Dialog open={activeDialog === 'course'} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="course-dialog">
        <DialogHeader>
          <span className="dialog-level">{selectedCourse.level}</span>
          <DialogTitle>{selectedCourse.title}</DialogTitle>
          <DialogDescription>{selectedCourse.note}</DialogDescription>
        </DialogHeader>

        <div className="dialog-columns">
          <div>
            <h4>Що входить у цей рівень</h4>
            <ul>
              {selectedCourse.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="purchase-options">
            <div className="purchase-box">
              <small>Повна оплата</small>
              <strong>€{selectedCourse.price}</strong>
              <span>одним платежем</span>
              <button onClick={() => openDialog('login')}>
                Обрати <ArrowRight size={18} />
              </button>
            </div>

            <div className="purchase-box installment">
              <small>Оплата частинами</small>
              <strong>2 × €{Math.ceil(selectedCourse.price / 2)}</strong>
              <span>два платежі</span>
              <button onClick={() => openDialog('login')}>
                Обрати <ArrowRight size={18} />
              </button>
            </div>

            <em className="payment-note">
              Фінальні умови та платіжний сервіс будуть підтверджені викладачкою.
            </em>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
