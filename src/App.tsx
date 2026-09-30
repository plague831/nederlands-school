import { ContactDialog } from './components/dialogs/ContactDialog';
import { CourseDialog } from './components/dialogs/CourseDialog';
import { LoginDialog } from './components/dialogs/LoginDialog';
import { PracticeDialog } from './components/dialogs/PracticeDialog';
import { TestDialog } from './components/dialogs/TestDialog';
import { TrialDialog } from './components/dialogs/TrialDialog';
import { Audience } from './components/sections/Audience';
import { Cabinet } from './components/sections/Cabinet';
import { Courses } from './components/sections/Courses';
import { Faq } from './components/sections/Faq';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { Platform } from './components/sections/Platform';
import { Program } from './components/sections/Program';
import { Results } from './components/sections/Results';
import { SiteFooter } from './components/sections/SiteFooter';
import { SiteHeader } from './components/sections/SiteHeader';
import { Teacher } from './components/sections/Teacher';
import { Ticker } from './components/sections/Ticker';
import { TrialStrip } from './components/sections/TrialStrip';
import { Trust } from './components/sections/Trust';
import { SiteStateProvider } from './site-state';

export function App() {
  return (
    <SiteStateProvider>
      <main>
        <SiteHeader />
        <Hero />
        <Ticker />
        <TrialStrip />
        <Results />
        <Audience />
        <HowItWorks />
        <Platform />
        <Courses />
        <Program />
        <Cabinet />
        <Teacher />
        <Trust />
        <Faq />
        <SiteFooter />

        <CourseDialog />
        <TestDialog />
        <PracticeDialog />
        <LoginDialog />
        <ContactDialog />
        <TrialDialog />
      </main>
    </SiteStateProvider>
  );
}
