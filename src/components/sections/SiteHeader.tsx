import { Menu, UserRound, X } from 'lucide-react';

import { useSiteState } from '../../site-state';

export function SiteHeader() {
  const { mobileMenuOpen, setMobileMenuOpen, openDialog, openLevelTest } = useSiteState();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top">
        <span className="brand-dot">hoi!</span>
        <span>NEDERLANDS</span>
      </a>

      <nav className="desktop-nav">
        <a href="#results">Результат</a>
        <a href="#how">Як це працює</a>
        <a href="#courses">Курси A1–B2</a>
        <a href="#platform">Платформа</a>
        <a href="#teacher">Викладачка</a>
      </nav>

      <button className="account-button" onClick={() => openDialog('login')}>
        <UserRound size={18} /> Мій кабінет
      </button>

      <button
        className="menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Відкрити меню"
      >
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#results" onClick={closeMenu}>
            Результат
          </a>
          <a href="#how" onClick={closeMenu}>
            Як це працює
          </a>
          <a href="#courses" onClick={closeMenu}>
            Курси A1–B2
          </a>
          <a href="#platform" onClick={closeMenu}>
            Платформа
          </a>
          <button
            onClick={() => {
              closeMenu();
              openLevelTest();
            }}
          >
            Визначити рівень
          </button>
          <button
            onClick={() => {
              closeMenu();
              openDialog('login');
            }}
          >
            Мій кабінет
          </button>
        </div>
      )}
    </header>
  );
}
