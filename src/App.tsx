import { useEffect, useState } from "react";
import { AmbientBackground, ConfettiCanvas, SurpriseProvider } from "@/components/Fx";
import { GiftIntro, Loader } from "@/components/Intro";
import { MusicToggle, TopNav } from "@/components/Nav";
import { FourteenMonths, Hero, Journey, TheThingIMiss, WhereItAllStarted } from "@/sections/Story";
import { Admire, MessageFromBhai, YouMayNotRealize } from "@/sections/Heart";
import { DoingEnough, Duas, HeavyDays, SpecialDua } from "@/sections/Dua";
import { BhaiApiDepartment, Interlude, MemoryWall } from "@/sections/Joy";
import { Celebration, FinalLetter, FinalScreen, LastSurprise } from "@/sections/Finale";
import { scrollToId } from "@/lib/hooks";

type Stage = "loading" | "gift" | "site";

export default function App() {
  const [stage, setStage] = useState<Stage>("loading");

  /* lock scrolling while the intro is on screen */
  useEffect(() => {
    document.body.style.overflow = stage === "site" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  /* always land at the top when the story begins */
  useEffect(() => {
    if (stage === "site") window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage]);

  return (
    <SurpriseProvider>
      <AmbientBackground />
      <ConfettiCanvas />

      <a
        href="#story"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("story");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink focus:shadow-lg"
      >
        Skip to the story
      </a>

      {stage === "loading" && <Loader onDone={() => setStage("gift")} />}

      {stage === "gift" && <GiftIntro onOpened={() => setStage("site")} />}

      {stage === "site" && (
        <>
          <TopNav />
          <MusicToggle />
          <main className="a-fade relative">
            <Hero />
            <WhereItAllStarted />
            <FourteenMonths />
            <Journey />
            <TheThingIMiss />
            <MessageFromBhai />
            <Admire />
            <YouMayNotRealize />
            <Duas />
            <SpecialDua />
            <HeavyDays />
            <DoingEnough />
            <BhaiApiDepartment />
            <MemoryWall />
            <Interlude />
            <Celebration />
            <FinalLetter />
            <LastSurprise />
            <FinalScreen />
          </main>
        </>
      )}
    </SurpriseProvider>
  );
}
