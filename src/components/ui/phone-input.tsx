import { useState } from 'react';

/** Український код, який поле тримає незмінним. */
const PREFIX = '+380';

/** Скільки цифр іде після коду. */
const DIGITS = 9;

/**
 * Поле телефону, що завжди починається з +380: із введеного лишаються
 * тільки цифри, а зайвий код країни чи провідний нуль відкидаються.
 */
export function PhoneInput() {
  const [value, setValue] = useState(PREFIX);

  return (
    <input
      required
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder={PREFIX}
      value={value}
      pattern="\+380[0-9]{9}"
      onChange={(event) => {
        let digits = event.target.value.replace(/\D/g, '');
        if (digits.startsWith('380')) digits = digits.slice(3);
        else if (digits.startsWith('0')) digits = digits.slice(1);
        setValue(PREFIX + digits.slice(0, DIGITS));
      }}
    />
  );
}
