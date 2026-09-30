import { Check, CirclePlay } from 'lucide-react';

import { useSiteState } from '../../site-state';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export function PracticeDialog() {
  const {
    activeDialog,
    closeDialog,
    activeLesson,
    practiceAnswer,
    setPracticeAnswer,
    practiceChecked,
    setPracticeChecked,
  } = useSiteState();

  return (
    <Dialog open={activeDialog === 'practice'} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="demo-dialog">
        <DialogHeader>
          <DialogTitle>{activeLesson.title}</DialogTitle>
          <DialogDescription>
            {activeLesson.note}. Нижче — окремий приклад саме для цієї теми.
          </DialogDescription>
        </DialogHeader>

        <div className="video-placeholder">
          <CirclePlay />
          <span>Приклад матеріалу уроку</span>
        </div>

        <label>
          {activeLesson.prompt}
          <textarea
            value={practiceAnswer}
            onChange={(event) => {
              setPracticeAnswer(event.target.value);
              setPracticeChecked(false);
            }}
            placeholder="Напиши відповідь тут…"
          />
        </label>

        <button className="login-main" onClick={() => setPracticeChecked(true)}>
          Перевірити
        </button>

        {practiceChecked && (
          <div className="feedback">
            <Check />
            <div>
              <b>{activeLesson.answer.test(practiceAnswer) ? 'Goed gedaan!' : 'Майже вийшло!'}</b>
              <span>{activeLesson.explain}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
