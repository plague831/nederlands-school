/** Уроки прикладу програми A1 — секція #program і діалог уроку. */
export type Lesson = {
  title: string;
  note: string;
  /** Завдання, яке показується в діалозі уроку. */
  prompt: string;
  /** Приймає відповідь користувача, якщо вона підходить під шаблон. */
  answer: RegExp;
  explain: string;
};

export const lessons: Lesson[] = [
  {
    title: 'Знайомство та перші фрази',
    note: 'Привітання, ім’я та короткий діалог',
    prompt: 'Напиши нідерландською: «Мене звати…»',
    answer: /ik heet|mijn naam is/i,
    explain: 'Використовуй Ik heet… або Mijn naam is…',
  },
  {
    title: 'Звуки й правильна вимова',
    note: 'Дифтонги ui, ij та звук g',
    prompt: 'Яке слово містить звук ui?',
    answer: /huis/i,
    explain: 'Huis містить характерний нідерландський дифтонг ui.',
  },
  {
    title: 'Мій день: дієслова в теперішньому',
    note: 'Розпорядок дня та порядок слів',
    prompt: 'Доповни: Ik ___ om zeven uur op.',
    answer: /sta/i,
    explain: 'Правильно: Ik sta om zeven uur op.',
  },
  {
    title: 'Кафе, магазин і місто',
    note: 'Замовлення, ціни та напрямки',
    prompt: 'Як ввічливо попросити каву?',
    answer: /mag ik|koffie.*alstublieft/i,
    explain: 'Наприклад: Mag ik een koffie, alstublieft?',
  },
  {
    title: 'Перша розмова без підказок',
    note: 'Підсумкова розмовна практика',
    prompt: 'Представся двома реченнями нідерландською.',
    answer: /ik (heet|ben)|mijn naam is/i,
    explain: 'Назви ім’я та додай, звідки ти або де живеш.',
  },
];
