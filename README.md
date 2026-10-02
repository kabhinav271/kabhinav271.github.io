# TEAM BELL — 200 Years of Mannar Bell Metal

An interactive, 1:1 pixel-accurate web translation of the **TEAM BELL** Figma frames (Frame 2 `#79:760` and Frame 4 `#85:5308`) from Mannar, Kerala.

---

## 🎨 Figma Frames & Layers Translated

### 1. Screen 1: The Strike Hero (Frame 2, `#79:760`)
* **Base Canvas Color:** `#EEEDE9` (Warm Sand / Linen).
* **Atmospheric Misty River / Mountain Background:** Positioned at `top: 29.1%`, spanning full width with `blur(6.25px)` and `opacity: 0.5` (`assets/bell_background.png`).
* **Top Temple Wooden Beam / Rafter:** Pinned to the top edge with `#220303` base tint, rich grain texture overlay, and `box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.28)` (`assets/wooden_beam.png`).
* **Suspended Golden Kansyam Bell:** Centered horizontally (`50%`), suspended from the ceiling rafter, dimensions `545px x 1273px` with drop shadow `0px 4px 6px rgba(0, 0, 0, 0.25)` (`assets/bell_hero.png`).
* **Micro-Copy:** `"Touch to Strike. Hear 200 Years of "` (`#9F7038`, Inter Medium 20px) + `"Mannar"` (`#3A1F02`, Inter SemiBold 20px).
* **Pointer Vector:** Exact curved indicator line pointing from the text badge to the bell rim (`assets/pointer_vector.svg`).
* **Bottom Prompt:** `"Keep listening ↓"` (`#3A1F02`, Inter Regular 12px, letter-spacing `0.03em`) centered at bottom.

### 2. Screen 2: The Maker & The Craft (Frame 4, `#85:5308`)
* **Dynamic Bell Scaling:** On downward scroll or prompt click, the suspended bell smoothly scales down to `339px x 792px` (`scale(0.62)`) and translates up toward the header anchor.
* **Left Column ("The Maker"):**
  * Subtitle: `The maker` (`#0D0F04`, Inter Regular 10px uppercase, tracking `0.03em`)
  * Heading: `Every bell carries a hand.` (`#0D0F04`, Fraunces SemiBold 32px)
  * Narrative: Story of Ramu and two centuries of Achary lineage in Mannar (`#3A1F02`, Inter 16px, line-height 1.6em)
* **Right Column ("The Craft Specs"):**
  * Title: `The craft` (`#0D0F04`, Inter Regular 20px)
  * Specifications Table:
    * `Alloy | Kansyam, high-tin bronze`
    * `Cast by | Hand, lost-wax method`
    * `Tuned by | Ear, not machine`
    * `Origin | Mannar, Kerala`

---

## 🔔 Physical Interaction & Acoustic Engine

### 1. Web Audio API Kansyam Bronze Synthesis
High-tin bronze (*Kansyam*: 78% Copper, 22% Tin) is renowned for its crystalline acoustic clarity and prolonged resonance:
* **Attack Transient:** Filtered metallic white noise burst ($3200\text{ Hz}$) + inharmonic clapper strikes ($2400\text{ Hz}$, $3600\text{ Hz}$, $4850\text{ Hz}$) decaying in under 80ms.
* **Fundamental Harmonic:** $432\text{ Hz}$ tuned with a slight detuned partner ($432.45\text{ Hz}$) generating slow, soothing acoustic beating (tremolo) typical of hand-beaten temple bells.
* **Harmonic Spectrum:** Sub-octave Hum ($216\text{ Hz}$), Tierce Minor 3rd ($518.4\text{ Hz}$), Quint ($648\text{ Hz}$), Nominal ($864\text{ Hz}$), and Supernominal ($1296\text{ Hz}$).
* **Sustain:** Clean exponential decay envelope sustaining for $11.2\text{ seconds}$.
* **Temple Hall Convolution Reverb:** Procedural stereo impulse response simulating open-air sanctum acoustics.

### 2. Physical Sway & Concentric Acoustic Waves
* **Bell Micro-Sway:** Keyframe spring pendulum oscillation (`transform-origin: 50% 0%`):
  ```css
  @keyframes bellSway {
    0% { transform: rotate(0deg); }
    15% { transform: rotate(3.5deg); }
    30% { transform: rotate(-3deg); }
    45% { transform: rotate(1.8deg); }
    60% { transform: rotate(-1deg); }
    80% { transform: rotate(0.4deg); }
    100% { transform: rotate(0deg); }
  }
  ```
* **Concentric Ripple Rings:** Three staggered radial rings emitting from the bell rim ($50\%$ width, $62\%$ height), expanding from `scale(0.6)` to `scale(3.2)` and fading over $2.2\text{ seconds}$.
* **Post-Strike Metrics Readout:** Fades in beneath the bell:
  `Fundamental: 432 Hz | Sustain: 11.2s | Alloy: Kansyam (78% Cu / 22% Sn) | Master: K. Achary, Ala #4`

---

## 🚀 How to Run

### Standalone (Zero Configuration)
Simply double-click [`index.html`](file:///z:/NID/25-2026/Sem%203/Team%20bell%20metal/Bell%20metel%20production/index.html) to open directly in any web browser, or run:
```bash
npm start
```

### In a React / Next.js Project
Import [`src/components/BellExperience.jsx`](file:///z:/NID/25-2026/Sem%203/Team%20bell%20metal/Bell%20metel%20production/src/components/BellExperience.jsx) and place it into your page tree.
