/** Плавно прокручує до секції за її id (як у кнопках «Обрати курс»). */
export function scrollToSection(id: string) {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
}
