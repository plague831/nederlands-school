/** Три набори питань для перевірки рівня. */
export type Question = {
  /** Текст питання. */
  q: string;
  options: string[];
  /** Індекс правильного варіанта в options. */
  right: number;
  /** Пояснення, що показується після відповіді. */
  why: string;
};

export type TestSet = {
  id: 'level' | 'grammar' | 'words';
  title: string;
  note: string;
  questions: Question[];
};

export const tests: TestSet[] = [
  {
    id: 'level',
    title: 'Комплексний тест',
    note: 'Граматика, слова та розуміння · 10 питань',
    questions: [
      {
        q: 'Як сказати «Добрий день»?',
        options: ['Goedendag', 'Dank je', 'Tot ziens'],
        right: 0,
        why: 'Goedendag — нейтральне привітання.',
      },
      {
        q: '«Мене звати Анна» — це…',
        options: ['Ik ben heet Anna', 'Ik heet Anna', 'Mijn heet Anna'],
        right: 1,
        why: 'З іменем використовуємо Ik heet…',
      },
      {
        q: 'Wij ___ in Amsterdam.',
        options: ['woont', 'wonen', 'woon'],
        right: 1,
        why: 'Займенник wij вимагає форми множини wonen.',
      },
      {
        q: 'Ik zou graag een afspraak maken.',
        options: ['Я запізнююся', 'Я хотів/ла б домовитися про зустріч', 'Я скасовую зустріч'],
        right: 1,
        why: 'Zou graag — «хотів/ла б», afspraak maken — домовитися про зустріч.',
      },
      {
        q: 'Множина слова boek — …',
        options: ['boeken', 'boeks', 'boekenlijk'],
        right: 0,
        why: 'Більшість іменників утворюють множину закінченням -en.',
      },
      {
        q: 'Вона працює — …',
        options: ['Zij werk', 'Zij werkt', 'Zij werken'],
        right: 1,
        why: 'У третій особі однини дієслово отримує -t.',
      },
      {
        q: 'Gisteren ___ ik thuis.',
        options: ['blijf', 'bleef', 'geblijven'],
        right: 1,
        why: 'Минула форма blijven в однині — bleef.',
      },
      {
        q: 'Що означає gezellig?',
        options: ['Затишний, приємний', 'Небезпечний', 'Дорогий'],
        right: 0,
        why: 'Gezellig описує затишну, приємну атмосферу.',
      },
      {
        q: 'Як ввічливо попросити каву?',
        options: ['Koffie nu', 'Ik wil koffie', 'Mag ik een koffie, alstublieft?'],
        right: 2,
        why: 'Mag ik… alstublieft? — ввічливе прохання.',
      },
      {
        q: 'Als ik tijd heb, ___ ik je.',
        options: ['bel', 'belt', 'bellen'],
        right: 0,
        why: 'З ik у теперішньому часі використовується основа bel.',
      },
    ],
  },
  {
    id: 'grammar',
    title: 'Тест із граматики',
    note: 'Форми слів і побудова речень · 10 питань',
    questions: [
      {
        q: 'Ik ___ Nederlands.',
        options: ['spreekt', 'spreek', 'spreken'],
        right: 1,
        why: 'З ik використовуємо основу дієслова: spreek.',
      },
      {
        q: 'Hij ___ elke dag.',
        options: ['werken', 'werk', 'werkt'],
        right: 2,
        why: 'Третя особа однини отримує закінчення -t.',
      },
      {
        q: 'Множина stad — …',
        options: ['stads', 'steden', 'staden'],
        right: 1,
        why: 'Stad має нерегулярну множину steden.',
      },
      {
        q: '___ jij morgen?',
        options: ['Kom', 'Komt', 'Komen'],
        right: 0,
        why: 'У питанні з jij дієслово стоїть без -t.',
      },
      {
        q: 'Учора ми працювали — …',
        options: ['Gisteren werken wij', 'Gisteren werkten wij', 'Gisteren gewerkt wij'],
        right: 1,
        why: 'Минула форма множини werken — werkten.',
      },
      {
        q: 'Ik heb het boek ___.',
        options: ['lezen', 'gelezen', 'las'],
        right: 1,
        why: 'Перфект утворюємо: hebben + gelezen.',
      },
      {
        q: 'Це моя сестра — …',
        options: ['Dit is mijn zus', 'Deze zijn mijn zus', 'Dat mijn zus'],
        right: 0,
        why: 'Для представлення вживаємо Dit is…',
      },
      {
        q: 'Er ___ twee fietsen.',
        options: ['is', 'zijn', 'bent'],
        right: 1,
        why: 'Для множини використовуємо er zijn.',
      },
      {
        q: 'Ik blijf thuis ___ het regent.',
        options: ['omdat', 'maar', 'of'],
        right: 0,
        why: 'Omdat вводить причину.',
      },
      {
        q: 'Після omdat дієслово…',
        options: ['стоїть на початку', 'стоїть у кінці підрядної частини', 'зникає'],
        right: 1,
        why: 'У підрядному реченні дієслово переміщується в кінець.',
      },
    ],
  },
  {
    id: 'words',
    title: 'Слова та ситуації',
    note: 'Лексика для життя й спілкування · 10 питань',
    questions: [
      {
        q: 'Brood — це…',
        options: ['Хліб', 'Молоко', 'Сир'],
        right: 0,
        why: 'Brood означає хліб.',
      },
      {
        q: 'Як сказати «велосипед»?',
        options: ['Trein', 'Fiets', 'Straat'],
        right: 1,
        why: 'Fiets — велосипед.',
      },
      {
        q: 'Що означає goedkoop?',
        options: ['Дорогий', 'Дешевий', 'Швидкий'],
        right: 1,
        why: 'Goedkoop означає дешевий.',
      },
      {
        q: 'Де купують ліки?',
        options: ['Apotheek', 'Bakkerij', 'Station'],
        right: 0,
        why: 'Apotheek — аптека.',
      },
      {
        q: 'Rechtdoor означає…',
        options: ['Ліворуч', 'Прямо', 'Назад'],
        right: 1,
        why: 'Rechtdoor — прямо.',
      },
      {
        q: 'Afspraak — це…',
        options: ['Домовлена зустріч', 'Відпустка', 'Покупка'],
        right: 0,
        why: 'Afspraak — зустріч або запис за домовленістю.',
      },
      {
        q: 'Як сказати «рахунок, будь ласка»?',
        options: ['De rekening, alstublieft', 'Een tafel, bedankt', 'Tot morgen'],
        right: 0,
        why: 'De rekening, alstublieft — рахунок, будь ласка.',
      },
      {
        q: 'Werkgever — це…',
        options: ['Працівник', 'Роботодавець', 'Колега'],
        right: 1,
        why: 'Werkgever — роботодавець.',
      },
      {
        q: 'Verhuizen означає…',
        options: ['Переїжджати', 'Навчатися', 'Запізнюватися'],
        right: 0,
        why: 'Verhuizen — змінювати місце проживання.',
      },
      {
        q: 'Gezondheid — це…',
        options: ['Здоров’я', 'Затишок', 'Швидкість'],
        right: 0,
        why: 'Gezondheid означає здоров’я.',
      },
    ],
  },
];
