import React, { useState, useEffect, useRef } from 'react';
import { bellAudio } from '../audio/bellAcoustics.js';

export default function BellExperience() {
  const [page, setPage] = useState(1); // 1 = Sensory Strike Hero (#79:760), 2 = Community & Heritage (#85:5308)
  const [isStriking, setIsStriking] = useState(false);
  const [rippleKeys, setRippleKeys] = useState([]);

  // Trigger strike interaction
  const handleStrike = (e) => {
    e?.stopPropagation();

    // 1. Play authentic Kansyam Bronze Audio Engine
    try {
      bellAudio.strike();
    } catch (err) {
      console.warn('AudioContext init error:', err);
    }

    // 2. Bell Physical Micro-Sway Animation
    setIsStriking(false);
    requestAnimationFrame(() => {
      setIsStriking(true);
    });

    // 3. Emit Tactile Soft Water-Droplet Ripple Rings
    const newBatchId = Date.now();
    setRippleKeys([
      { id: `${newBatchId}-1`, delay: 180 },
      { id: `${newBatchId}-2`, delay: 420 },
      { id: `${newBatchId}-3`, delay: 680 }
    ]);
  };

  // Reset sway animation after completion
  useEffect(() => {
    if (isStriking) {
      const timer = setTimeout(() => {
        setIsStriking(false);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isStriking]);



  // Handle Wheel / Scroll Navigation between Page 1 and Page 2
  useEffect(() => {
    let lastScrollTime = 0;
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScrollTime < 650) return;

      if (e.deltaY > 35 && page === 1) {
        setPage(2);
        lastScrollTime = now;
      } else if (e.deltaY < -35 && page === 2) {
        setPage(1);
        lastScrollTime = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [page]);

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden select-none font-['Inter',sans-serif] transition-colors duration-1000 ease-out"
      style={{
        backgroundColor: page === 1 ? '#F4EEE2' : '#F9F3E5',
        color: '#0D0F04'
      }}
    >
      {/* 200VH FIXED HERO VIEWPORT (Page 1 & Page 2 Interactive Canvas) */}
      <div id="hero-fixed-container" className="fixed inset-0 w-full h-screen pointer-events-none z-10 overflow-hidden">
      {/* ========================================================================= */}
      {/* LAYER 0: BACKGROUND PADDY FIELD ENGRAVING (Figma node #127:687 / #127:711) */}
      {/* Exact Figma tokens: Page 1 opacity 0.25, Page 2 opacity 0.15, full width   */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-x-0 w-full pointer-events-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 overflow-hidden"
        style={{
          top: page === 1 ? '262px' : '129px',
          height: '1037px'
        }}
        aria-hidden="true"
      >
        <img
          src="./assets/bg_sep24.png"
          alt="Mannar Paddy Field Landscape"
          className="w-full h-full object-cover object-top pointer-events-none transition-opacity duration-900"
          style={{
            opacity: page === 1 ? 0.25 : 0.15,
            mixBlendMode: 'multiply'
          }}
          draggable={false}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 1: 1:1 FIGMA TOP WOODEN BEAM (Figma node #80:3321 / #85:5947)       */}
      {/* ========================================================================= */}
      <header
        className="absolute top-0 left-0 right-0 pointer-events-none z-30 w-full overflow-visible transition-all duration-900"
        aria-hidden="true"
      >
        <img
          src="./assets/wooden_beam_mask.png"
          alt="Top wooden beam rafter"
          className="w-full h-auto object-cover object-top pointer-events-none"
          style={{
            display: 'block',
            width: '100%',
            maxHeight: '95px',
            minHeight: '52px',
            filter: 'drop-shadow(0px 10px 7.5px rgba(0, 0, 0, 0.25))'
          }}
        />
      </header>

      {/* ========================================================================= */}
      {/* MAIN 1440PX CANVAS VIEWPORT WRAPPER                                       */}
      {/* ========================================================================= */}
      <main className="relative w-full h-full max-w-[1440px] mx-auto overflow-hidden">
        {/* ======================================================================= */}
        {/* SECONDARY BACKGROUND BELL (Page 2 Only, Figma Node #136:980)             */}
        {/* ======================================================================= */}
        <div
          className={`absolute z-15 pointer-events-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            page === 2 ? 'opacity-80 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            left: '333.76px',
            top: '-202.15px',
            width: '224.67px',
            height: '493.93px',
            transformOrigin: 'top center'
          }}
        >
          <img
            src="./assets/bell_hero.png"
            alt="Secondary suspended bronze bell"
            className="w-full h-full object-contain pointer-events-none brightness-95 opacity-80"
            style={{ filter: 'drop-shadow(0px 2.49px 2.49px rgba(0, 0, 0, 0.25))' }}
            draggable={false}
          />
        </div>

        {/* ======================================================================= */}
        {/* PRIMARY INTERACTIVE BELL (Figma Node #83:4670 -> #85:5312)              */}
        {/* ======================================================================= */}
        <div
          className="absolute z-20 flex flex-col items-center pointer-events-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            left: page === 1 ? '67.59px' : '172.49px',
            top: page === 1 ? '-480.9px' : '-99.26px',
            width: page === 1 ? '545.16px' : '339.1px',
            height: page === 1 ? '1272.76px' : '791.69px',
            transformOrigin: 'top center'
          }}
        >
          {/* Bell Clickable Trigger & Sway Origin */}
          <div
            onClick={handleStrike}
            className={`relative w-full h-full pointer-events-auto cursor-pointer group ${
              isStriking ? 'animate-bell-sway' : ''
            }`}
            style={{ transformOrigin: '50% 0%' }}
            role="button"
            tabIndex={0}
            aria-label="Strike Kansyam bronze bell"
            title="Click to strike bell"
          >
            {/* Bell Graphic */}
            <img
              src="./assets/bell_hero.png"
              alt="Hand-forged Kansyam bell metal bell"
              className="w-full h-full object-contain pointer-events-none transition-all duration-300 group-hover:brightness-105"
              style={{
                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
              }}
              draggable={false}
            />

            {/* Concentric Water-Droplet Ripples Origin */}
            <div
              className="absolute left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{
                top: page === 1 ? '61.5%' : '65%',
                width: '0px',
                height: '0px'
              }}
            >
              {rippleKeys.map(({ id, delay }) => (
                <span
                  key={id}
                  className="water-ripple-ring"
                  style={{
                    animationDelay: `${delay}ms`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* PAGE 1: SENSORY STRIKE HERO VIEW (Figma Frame 2, Node #79:760)          */}
        {/* ======================================================================= */}
        <section
          className={`absolute inset-0 pointer-events-none z-25 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            page === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          {/* Prompt Micro-Copy (#79:1398) */}
          <div
            className="absolute pointer-events-auto"
            style={{ left: '438.69px', top: '111.36px', width: '220.7px', height: '60px' }}
          >
            <p
              className="select-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px',
                lineHeight: '1.5em',
                letterSpacing: '0.01em'
              }}
            >
              <span className="text-[#B48E41] font-normal">Touch to Strike. Hear 200 Years of </span>
              <span className="text-[#3A1F02] font-semibold">Mannar</span>
            </p>
          </div>

          {/* Curved Vector Arrow (#81:3327) */}
          <div
            className="absolute pointer-events-none"
            style={{ left: '402.32px', top: '160.51px', width: '172.46px', height: '172.46px' }}
          >
            <img
              src="./assets/pointer_arrow.svg"
              alt="Curved indicator arrow"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>

          {/* Hero Welcome Card (#124:3) */}
          <div
            className="absolute pointer-events-auto flex flex-col justify-center"
            style={{
              left: '686px',
              top: '197px',
              width: '766px',
              padding: '63px 41px',
              gap: '40px',
              background:
                'radial-gradient(circle at 41% 49%, rgba(244, 238, 226, 1) 0%, rgba(245, 239, 227, 1) 60%, rgba(246, 239, 227, 0) 100%)'
            }}
          >
            {/* Heading Block (#127:707) */}
            <div className="flex flex-col" style={{ width: '608px', gap: '16px' }}>
              <h1
                className="uppercase select-none font-serif"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '60px',
                  lineHeight: '1.2em',
                  letterSpacing: '0.02em',
                  fontWeight: 600
                }}
              >
                <span style={{ color: '#D05534' }}>Welcome</span>
                <br />
                <span style={{ color: '#3A1F02' }}>to BELL METAL CAPITAL of </span>
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#3A1F02',
                    textTransform: 'capitalize'
                  }}
                >
                  India
                </span>
              </h1>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '20px',
                  lineHeight: '1.5em',
                  letterSpacing: '0.01em',
                  fontWeight: 400,
                  color: '#3A1F02'
                }}
              >
                Celebrating craftsmanship with natural textures, organic forms, and earthy tones for every space.
              </p>
            </div>

            {/* Button Group (#124:5) */}
            <div className="flex items-center" style={{ gap: '16px' }}>
              <button
                className="transition-all duration-200 hover:brightness-110 active:scale-95 flex items-center justify-center cursor-pointer shadow-sm"
                style={{
                  width: '120px',
                  height: '48px',
                  padding: '8px 12px',
                  background: '#2F1F18',
                  borderRadius: '8px',
                  color: '#D0D0C4',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: '1.6em',
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Explore
              </button>

              <button
                onClick={() => setPage(2)}
                className="transition-all duration-200 hover:bg-[#3A1F02]/10 active:scale-95 flex items-center justify-center cursor-pointer"
                style={{
                  width: '120px',
                  height: '48px',
                  padding: '8px 12px',
                  background: 'transparent',
                  border: '1px solid #3A1F02',
                  borderRadius: '8px',
                  color: '#3A1F02',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: '1.6em',
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Experience
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* PAGE 2: ARTISAN & COMMUNITY GLIMPSE VIEW (Figma Frame 4, Node #85:5308) */}
        {/* ======================================================================= */}
        <section
          className={`absolute inset-0 pointer-events-none z-25 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            page === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
          }`}
        >
          {/* Community Story Card (#136:979) */}
          <div
            className="absolute pointer-events-auto flex flex-col"
            style={{
              left: '726px',
              top: '226.5px',
              width: '478px',
              padding: '40px',
              gap: '24px',
              background:
                'radial-gradient(circle at 55% 50%, rgba(249, 243, 229, 1) 0%, rgba(245, 239, 227, 1) 35%, rgba(246, 239, 227, 0) 100%)'
            }}
          >
            {/* Subframe #86:6025 */}
            <div className="flex flex-col" style={{ width: '420px', gap: '12px' }}>
              {/* Subtitle Frame #86:6024 */}
              <div className="flex flex-col" style={{ width: '389px', gap: '4px' }}>
                <span
                  className="uppercase"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    lineHeight: '1.5em',
                    letterSpacing: '0.03em',
                    fontWeight: 400,
                    color: '#3A1F02'
                  }}
                >
                  The community
                </span>

                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: '40px',
                    lineHeight: '1.3em',
                    letterSpacing: '0.01em',
                    fontWeight: 400,
                    color: '#0D0F04',
                    width: '489.72px'
                  }}
                >
                  Forged by fire,<br />bound by kin.
                </h2>
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: '1.6em',
                  letterSpacing: '0.02em',
                  fontWeight: 400,
                  color: '#3A1F02'
                }}
              >
                For centuries, Achary families in Mannar have crafted unique bell-metal items from a copper-tin alloy.<br />Today, only a few families continue the tradition, with each bell’s sound judged purely by ear
              </p>
            </div>

            {/* Feature List #136:978 */}
            <div className="flex flex-col" style={{ width: '313px', gap: '16px' }}>
              <div className="flex items-center" style={{ gap: '8px' }}>
                <img
                  src="./assets/icon_epicentre.svg"
                  alt="Checkmark"
                  className="w-6 h-6 shrink-0"
                  draggable={false}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.5em',
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                    color: '#3A1F02'
                  }}
                >
                  Experience craft from the epi centre
                </span>
              </div>

              <div className="flex items-center" style={{ gap: '8px' }}>
                <img
                  src="./assets/icon_community.svg"
                  alt="Checkmark"
                  className="w-6 h-6 shrink-0"
                  draggable={false}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.5em',
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                    color: '#3A1F02'
                  }}
                >
                  Become a part of the community
                </span>
              </div>

              <div className="flex items-center" style={{ gap: '8px' }}>
                <img
                  src="./assets/icon_purchase.svg"
                  alt="Checkmark"
                  className="w-6 h-6 shrink-0"
                  draggable={false}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.5em',
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                    color: '#3A1F02'
                  }}
                >
                  Try it out before you purchase.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* BOTTOM SCROLL INDICATOR (#88:6819)                                      */}
        {/* ======================================================================= */}
        <footer
          className="absolute z-40 pointer-events-auto transition-all duration-900"
          style={{ left: '670px', top: '844px', width: '120px' }}
        >
          <button
            onClick={() => setPage(page === 1 ? 2 : 1)}
            className="group flex flex-col items-center gap-1 focus:outline-none cursor-pointer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              lineHeight: '1.5em',
              letterSpacing: '0.03em',
              fontWeight: 400,
              color: '#3A1F02'
            }}
            title="Toggle view"
          >
            <span className="group-hover:text-[#B48E41] transition-colors">
              {page === 1 ? 'Keep listening ↓' : 'Return to strike ↑'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B48E41] opacity-70 group-hover:scale-125 transition-transform" />
          </button>
        </footer>
      </main>
      </div>

      {/* TRANSPARENT 200VH HERO SCROLL SPACER */}
      <div className="w-full h-[200vh] pointer-events-none" aria-hidden="true" />

      {/* NEW CONTENT CONTAINER (Z-40 Standard Document Flow) */}
      <div className="relative w-full z-40 bg-[#F5EAD4] flex flex-col items-center shadow-2xl">
        {/* SECTION 3: "SHOP BY CATEGORY" (THE SOUNDBOARD) */}
        <section id="soundboard" className="w-full bg-[#F5EAD4] py-28 md:py-36 px-6 md:px-16 flex flex-col items-center">
          <div className="max-w-[1240px] w-full flex flex-col items-center">
            <span className="font-['Inter'] uppercase tracking-[0.08em] text-[#3A1F02] text-[12px] md:text-[13px] font-semibold mb-3">
              Acoustic Collections
            </span>
            <h2 className="font-['Fraunces'] text-3xl md:text-5xl lg:text-6xl text-[#2F1F18] font-normal tracking-tight text-center">
              EXPLORE THE SOUNDBOARD
            </h2>
            <p className="mt-4 text-center text-[#3A1F02]/80 max-w-xl text-[15px] md:text-[16px] font-['Inter'] leading-relaxed">
              Each instrument is tuned to sacred harmonic ratios, hand-cast in high-tin Kansyam alloy for clarity, sustain, and ritual presence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-16 w-full">
              {/* Card 1: Threshold Chimes */}
              <article className="flex flex-col items-center group">
                <figure className="w-full aspect-square bg-[#2F1F18]/10 rounded-sm overflow-hidden relative border border-[#3A1F02]/10 shadow-sm">
                  <img
                    src="./assets/section3_chimes.jpg"
                    alt="Threshold Chimes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#2F1F18]/5 pointer-events-none" />
                </figure>
                <h3 className="font-['Inter'] font-semibold text-[13px] md:text-[14px] uppercase tracking-[0.08em] text-[#2F1F18] mt-6 text-center">
                  THRESHOLD CHIMES
                </h3>
                <p className="text-[13px] text-[#3A1F02]/70 text-center mt-1.5 font-['Inter'] max-w-[280px]">
                  Suspended sentinel bells tuned to 528 Hz with authentic leather cords
                </p>
                <a
                  href="#chimes"
                  className="mt-4 border border-[#3A1F02] text-[#3A1F02] rounded-full px-6 py-2.5 text-[13px] uppercase tracking-wide hover:bg-[#3A1F02] hover:text-[#F5EAD4] transition-colors inline-block"
                >
                  Explore Chimes
                </a>
              </article>

              {/* Card 2: Focus Gongs */}
              <article className="flex flex-col items-center group">
                <figure className="w-full aspect-square bg-[#2F1F18]/10 rounded-sm overflow-hidden relative border border-[#3A1F02]/10 shadow-sm">
                  <img
                    src="./assets/section3_gongs.jpg"
                    alt="Focus Gongs"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#2F1F18]/5 pointer-events-none" />
                </figure>
                <h3 className="font-['Inter'] font-semibold text-[13px] md:text-[14px] uppercase tracking-[0.08em] text-[#2F1F18] mt-6 text-center">
                  FOCUS GONGS
                </h3>
                <p className="text-[13px] text-[#3A1F02]/70 text-center mt-1.5 font-['Inter'] max-w-[280px]">
                  Single-strike meditative disks with over 14-second acoustic sustain
                </p>
                <a
                  href="#gongs"
                  className="mt-4 border border-[#3A1F02] text-[#3A1F02] rounded-full px-6 py-2.5 text-[13px] uppercase tracking-wide hover:bg-[#3A1F02] hover:text-[#F5EAD4] transition-colors inline-block"
                >
                  Explore Gongs
                </a>
              </article>

              {/* Card 3: Living Tableware */}
              <article className="flex flex-col items-center group">
                <figure className="w-full aspect-square bg-[#2F1F18]/10 rounded-sm overflow-hidden relative border border-[#3A1F02]/10 shadow-sm">
                  <img
                    src="./assets/section3_tableware.jpg"
                    alt="Living Tableware"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#2F1F18]/5 pointer-events-none" />
                </figure>
                <h3 className="font-['Inter'] font-semibold text-[13px] md:text-[14px] uppercase tracking-[0.08em] text-[#2F1F18] mt-6 text-center">
                  LIVING TABLEWARE
                </h3>
                <p className="text-[13px] text-[#3A1F02]/70 text-center mt-1.5 font-['Inter'] max-w-[280px]">
                  Ayurvedic water vessels and tactile singing bowls for everyday rituals
                </p>
                <a
                  href="#tableware"
                  className="mt-4 border border-[#3A1F02] text-[#3A1F02] rounded-full px-6 py-2.5 text-[13px] uppercase tracking-wide hover:bg-[#3A1F02] hover:text-[#F5EAD4] transition-colors inline-block"
                >
                  Explore Tableware
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 4: "EXPERIENCE" (THE CAMPUS & MASTERCLASSES) */}
        <section id="experience" className="w-full bg-[#F4EEE2] border-t border-[#3A1F02]/15 py-28 md:py-36 px-6 md:px-16 flex justify-center">
          <div className="max-w-[1240px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 w-full">
              <figure className="w-full aspect-[3/4] rounded-sm overflow-hidden bg-[#2F1F18]/10 border border-[#3A1F02]/10 shadow-sm relative">
                <img
                  src="./assets/section4_campus.jpg"
                  alt="Artisan at Mannar Riverfront Forge Campus"
                  className="w-full h-full object-cover mix-blend-multiply"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#2F1F18]/5 pointer-events-none" />
              </figure>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center lg:pl-4">
              <div className="flex items-center gap-1.5 mb-4 text-[#B48E41]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B48E41]/80" />
                <span className="w-2 h-2 rounded-full bg-[#B48E41]/60" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48E41]/40" />
              </div>

              <span className="font-['Inter'] uppercase tracking-[0.08em] text-[#3A1F02] text-[12px] md:text-[13px] font-semibold">
                Residencies & Masterclasses
              </span>

              <h2 className="font-['Fraunces'] text-3xl md:text-5xl lg:text-6xl text-[#0D0F04] font-normal leading-[1.15] mt-3 tracking-tight">
                STEP INTO THE FORGE.
              </h2>

              <p className="mt-6 text-[#3A1F02] text-base md:text-lg leading-relaxed font-['Inter']">
                Journey to our riverfront campus in Mannar. Stay in artisan guest cottages, sculpt tactile wax models, and hand-tune your own bell alongside master craftsmen.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-[#3A1F02]/10">
                <div>
                  <h4 className="font-['Inter'] text-[13px] uppercase tracking-[0.08em] font-semibold text-[#2F1F18] mb-1.5">
                    Tactile Wax Sculpting
                  </h4>
                  <p className="text-[14px] text-[#3A1F02]/80 leading-relaxed font-['Inter']">
                    Shape local river-silt clay and fragrant beeswax into custom acoustic geometries, fired in wood-ash kilns.
                  </p>
                </div>
                <div>
                  <h4 className="font-['Inter'] text-[13px] uppercase tracking-[0.08em] font-semibold text-[#2F1F18] mb-1.5">
                    Acoustic Ear-Tuning
                  </h4>
                  <p className="text-[14px] text-[#3A1F02]/80 leading-relaxed font-['Inter']">
                    Learn the ancient Achary method of tuning bell resonance and sustained overtones strictly through human listening.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#book-masterclass"
                  className="border border-[#3A1F02] text-[#3A1F02] rounded-full px-6 py-2.5 text-[13px] uppercase tracking-wide hover:bg-[#3A1F02] hover:text-[#F5EAD4] transition-colors"
                >
                  Book a Masterclass
                </a>
                <a
                  href="#residency"
                  className="border border-[#3A1F02] text-[#3A1F02] rounded-full px-6 py-2.5 text-[13px] uppercase tracking-wide hover:bg-[#3A1F02] hover:text-[#F5EAD4] transition-colors"
                >
                  3-Day Residency
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: "COMMUNITY & PHILOSOPHY" */}
        <section id="philosophy" className="w-full bg-[#F5EAD4] border-t border-[#3A1F02]/15 py-28 md:py-36 px-6 md:px-16 flex justify-center">
          <div className="max-w-[1240px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 flex flex-col">
              <span className="font-['Inter'] uppercase tracking-[0.08em] text-[#3A1F02] text-[12px] md:text-[13px] font-semibold">
                Lineage & Continuity
              </span>

              <h2 className="font-['Fraunces'] text-3xl md:text-5xl lg:text-6xl text-[#0D0F04] font-normal leading-[1.15] mt-3 tracking-tight">
                OUR PHILOSOPHY
              </h2>

              <div className="space-y-4 mt-6 text-[#3A1F02] text-base md:text-[17px] leading-relaxed font-['Inter']">
                <p>
                  We believe in preserving the 200-year Thanjavur legacy without freezing it in glass. True heritage is not an artifact preserved in a museum case; it is the daily resonance of hammer on bell metal, river mud sculpted by hand, and the living intuition passed down through six generations of Achary craftsmen.
                </p>
                <p className="text-[#3A1F02]/85 text-base md:text-[16px]">
                  By reimagining sacred temple metallurgy into tactile, minimal instruments for contemporary architectural spaces, ALA ensures the masters remain masters, sustained by patronage that values slow alchemy over industrial haste.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="#manifesto"
                  className="border border-[#3A1F02] text-[#3A1F02] rounded-full px-6 py-2.5 text-[13px] uppercase tracking-wide hover:bg-[#3A1F02] hover:text-[#F5EAD4] transition-colors inline-block"
                >
                  Read Our Manifesto
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col md:flex-row items-center md:items-start gap-8 lg:pl-6">
              <figure className="w-full md:w-3/5 aspect-[3/4] rounded-sm overflow-hidden bg-[#2F1F18]/10 border border-[#3A1F02]/10 shadow-sm relative shrink-0">
                <img
                  src="./assets/section5_philosophy.jpg"
                  alt="Artisan tuning Kansyam bell"
                  className="w-full h-full object-cover mix-blend-multiply"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#2F1F18]/5 pointer-events-none" />
              </figure>

              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <svg className="w-7 h-7 text-[#B48E41]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9a6 6 0 1 1 12 0v5a2 2 0 0 0 2 2H4a2 2 0 0 0 2-2V9Z" />
                  <path d="M10 20a2 2 0 0 0 4 0" />
                  <circle cx="12" cy="3" r="1" />
                </svg>

                <span className="font-['Inter'] text-[12px] uppercase tracking-[0.08em] font-semibold text-[#3A1F02] mt-3">
                  The Kansyam Alloy
                </span>

                <p className="mt-2 text-[14px] text-[#3A1F02]/85 leading-relaxed font-['Inter']">
                  Kansyam is a sacred metallurgical alloy of 78% pure copper and 22% tin. Hand-cast in river-clay moulds, this binary ratio creates an acoustic sustain exceeding twelve seconds with natural binaural overtone resonance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TESTIMONIAL & MINIMAL FOOTER */}
        <footer className="w-full bg-[#F4EEE2] border-t border-[#3A1F02]/15 flex flex-col items-center">
          <div className="w-full py-20 md:py-28 px-6 md:px-16 flex justify-center">
            <div className="max-w-4xl text-center flex flex-col items-center">
              <svg className="w-8 h-8 text-[#B48E41] mb-6 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="font-['Fraunces'] italic text-2xl md:text-4xl lg:text-[42px] text-[#2F1F18] leading-[1.3] tracking-tight">
                “A bell is not stamped into shape; it is born from river mud, wax, and molten alloy. We listen until the bronze finally breathes.”
              </blockquote>
              <cite className="not-italic mt-6 block text-[13px] uppercase tracking-[0.1em] font-['Inter'] font-semibold text-[#3A1F02]">
                — Master K. Achary, 6th-Generation Bell Caster, Mannar
              </cite>
            </div>
          </div>

          <div className="w-full border-t border-[#3A1F02]/15" />

          <div className="max-w-[1240px] w-full py-16 md:py-20 px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <span className="font-['Inter'] uppercase tracking-[0.08em] text-[#3A1F02] text-[12px] md:text-[13px] font-semibold">
                Stay Connected
              </span>
              <h3 className="font-['Fraunces'] text-2xl md:text-3xl lg:text-4xl text-[#2F1F18] tracking-tight mt-2">
                LET’S STAY IN TOUCH
              </h3>
              <p className="mt-2 text-[14px] text-[#3A1F02]/80 font-['Inter'] max-w-lg leading-relaxed">
                Receive acoustic field recordings, quarterly foundry journals, and invitations to seasonal molten pourings.
              </p>

              <form className="mt-6 flex flex-col sm:flex-row gap-4 max-w-md" onSubmit={(e) => { e.preventDefault(); alert('Thank you for joining the Bell Archive.'); }}>
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-transparent border-b border-[#3A1F02]/30 px-1 py-2.5 text-[13px] text-[#2F1F18] placeholder-[#3A1F02]/40 focus:outline-none focus:border-[#3A1F02] font-['Inter'] uppercase tracking-wider flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="border border-[#3A1F02] text-[#3A1F02] rounded-full px-6 py-2.5 text-[13px] uppercase tracking-wide hover:bg-[#3A1F02] hover:text-[#F5EAD4] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign Up
                </button>
              </form>
            </div>

            <div className="md:col-span-4 flex justify-start md:justify-end">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-[#3A1F02]/25 flex flex-col items-center justify-center p-3 text-center relative group">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-[#B48E41]/40" />
                <span className="font-['Fraunces'] text-lg md:text-xl font-normal text-[#2F1F18] tracking-widest">ALA</span>
                <span className="font-['Inter'] text-[9px] uppercase tracking-[0.14em] text-[#3A1F02]/70 mt-0.5">MANNAR</span>
                <span className="font-['Inter'] text-[8px] uppercase tracking-[0.08em] text-[#B48E41] font-semibold">EST. 1824</span>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-[#3A1F02]/15" />

          <div className="max-w-[1240px] w-full py-16 px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 text-[13px] text-[#3A1F02]/80 font-['Inter']">
            <div className="md:col-span-4">
              <h4 className="font-['Fraunces'] text-xl text-[#2F1F18] tracking-wide uppercase">
                ALA: MANNAR BELL METAL
              </h4>
              <p className="mt-3 text-[14px] text-[#3A1F02]/75 leading-relaxed font-['Inter'] max-w-xs">
                Preserving Kerala’s sacred bell metal craft through architectural sound, lost-wax metallurgy, and slow living.
              </p>
              <span className="mt-4 block text-[12px] uppercase tracking-[0.08em] text-[#B48E41] font-medium">
                Pampa River Basin, Mannar, Kerala
              </span>
            </div>

            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <h5 className="font-semibold uppercase tracking-[0.08em] text-[12px] text-[#2F1F18] mb-3">Soundboard</h5>
                <ul className="space-y-2 text-[#3A1F02]/75">
                  <li><a href="#chimes" className="hover:text-[#2F1F18] transition-colors">Threshold Chimes</a></li>
                  <li><a href="#gongs" className="hover:text-[#2F1F18] transition-colors">Focus Gongs</a></li>
                  <li><a href="#tableware" className="hover:text-[#2F1F18] transition-colors">Living Tableware</a></li>
                  <li><a href="#singing-bowls" className="hover:text-[#2F1F18] transition-colors">Singing Bowls</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold uppercase tracking-[0.08em] text-[12px] text-[#2F1F18] mb-3">Campus</h5>
                <ul className="space-y-2 text-[#3A1F02]/75">
                  <li><a href="#forge" className="hover:text-[#2F1F18] transition-colors">The Riverfront Forge</a></li>
                  <li><a href="#masterclasses" className="hover:text-[#2F1F18] transition-colors">Masterclasses</a></li>
                  <li><a href="#residency" className="hover:text-[#2F1F18] transition-colors">3-Day Residency</a></li>
                  <li><a href="#cottages" className="hover:text-[#2F1F18] transition-colors">Guest Cottages</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold uppercase tracking-[0.08em] text-[12px] text-[#2F1F18] mb-3">The Archive</h5>
                <ul className="space-y-2 text-[#3A1F02]/75">
                  <li><a href="#alloy" className="hover:text-[#2F1F18] transition-colors">Kansyam Alloy</a></li>
                  <li><a href="#acoustics" className="hover:text-[#2F1F18] transition-colors">Acoustic Research</a></li>
                  <li><a href="#lineage" className="hover:text-[#2F1F18] transition-colors">Achary Lineage</a></li>
                  <li><a href="#patina" className="hover:text-[#2F1F18] transition-colors">Care & Patina</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold uppercase tracking-[0.08em] text-[12px] text-[#2F1F18] mb-3">Commissions</h5>
                <ul className="space-y-2 text-[#3A1F02]/75">
                  <li><a href="#architectural" className="hover:text-[#2F1F18] transition-colors">Architectural Bells</a></li>
                  <li><a href="#temple" className="hover:text-[#2F1F18] transition-colors">Temple Restorations</a></li>
                  <li><a href="#tuning" className="hover:text-[#2F1F18] transition-colors">Bespoke Tuning</a></li>
                  <li><a href="#press" className="hover:text-[#2F1F18] transition-colors">Press Inquiries</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-[#3A1F02]/10 py-8 px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center text-[12px] text-[#3A1F02]/60 font-['Inter'] max-w-[1240px]">
            <span>© 2026 ALA Mannar Bell Metal. All rights reserved.</span>
            <span className="mt-2 sm:mt-0">Preserving sacred metallurgy through architectural sound.</span>
          </div>
        </footer>
      </div>

      {/* Embedded CSS Keyframes for Exact Figma Sway, Ripples & Hover Quiver */}
      <style>{`
        @keyframes bellSway {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(3.5deg); }
          30% { transform: rotate(-3deg); }
          45% { transform: rotate(1.8deg); }
          60% { transform: rotate(-1deg); }
          80% { transform: rotate(0.4deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-bell-sway {
          animation: bellSway 1.6s cubic-bezier(0.36, 0, 0.66, -0.56) forwards !important;
        }

        /* Tactile Hover Shivering / Quiver (Subtle Whisper Affordance: 0.7s, -0.2deg to 0.15deg) */
        @keyframes bellShiver {
          0% {
            transform: rotate(0deg) translate(0, 0);
          }
          20% {
            transform: rotate(-0.2deg) translate(-0.15px, 0.05px);
          }
          40% {
            transform: rotate(0.15deg) translate(0.12px, -0.05px);
          }
          60% {
            transform: rotate(-0.12deg) translate(-0.08px, 0.04px);
          }
          80% {
            transform: rotate(0.1deg) translate(0.08px, -0.03px);
          }
          100% {
            transform: rotate(0deg) translate(0, 0);
          }
        }

        .group:hover:not(.animate-bell-sway) {
          animation: bellShiver 0.7s ease-in-out infinite;
        }

        .group:hover img {
          filter: drop-shadow(0px 0px 14px rgba(180, 142, 65, 0.45)) drop-shadow(0px 6px 10px rgba(0, 0, 0, 0.28)) !important;
          transition: filter 300ms ease;
        }

        /* Tactile Soft Water-Droplet Ripple Effect */
        @keyframes softWaterRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.2);
            opacity: 0.95;
            filter: blur(2px);
          }
          50% {
            opacity: 0.55;
            filter: blur(6px);
          }
          100% {
            transform: translate(-50%, -50%) scale(2.8);
            opacity: 0;
            filter: blur(14px);
          }
        }

        .water-ripple-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.2);
          pointer-events: none;
          box-shadow: 
            0 0 15px 4px rgba(255, 255, 255, 0.45),
            inset 0 0 12px 3px rgba(0, 0, 0, 0.12),
            0 8px 24px rgba(60, 40, 20, 0.08);
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.02) 0%,
            rgba(255, 255, 255, 0.18) 70%,
            rgba(0, 0, 0, 0.06) 100%
          );
          animation: softWaterRipple 2.4s cubic-bezier(0.16, 0.8, 0.25, 1) both;
        }
      `}</style>
    </div>
  );
}
