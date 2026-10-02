/**
 * Web Audio API Acoustic Engine for Kansyam (High-Tin Bronze) Bell
 * Alloy: 78% Copper, 22% Tin (Mannar, Kerala tradition)
 * Fundamental: 432 Hz | Resonant Sustain: 11.2 seconds
 */

class KansyamBellAcousticEngine {
  constructor() {
    this.ctx = null;
    this.reverbNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.createReverb();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  createReverb() {
    // Generate authentic spacious temple reverberation impulse
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * 3.5;
    const impulse = this.ctx.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const decay = Math.exp(-i / (sampleRate * 1.4));
      left[i] = (Math.random() * 2 - 1) * decay;
      right[i] = (Math.random() * 2 - 1) * decay;
    }

    this.reverbNode = this.ctx.createConvolver();
    this.reverbNode.buffer = impulse;

    this.wetGain = this.ctx.createGain();
    this.wetGain.gain.value = 0.35;
    this.reverbNode.connect(this.wetGain);
    this.wetGain.connect(this.ctx.destination);
  }

  strike() {
    this.init();
    const t0 = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.9, t0);
    masterGain.connect(this.ctx.destination);
    if (this.reverbNode) {
      masterGain.connect(this.reverbNode);
    }

    // --- 1. Strike Transient (Clapper Impact) ---
    // Metallic impulse burst
    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.06, this.ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(3200, t0);
    noiseFilter.Q.setValueAtTime(4.0, t0);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, t0);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.05);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start(t0);

    // --- 2. High Metallic Transient Pings ---
    [2400, 3600, 4850].forEach((freq, idx) => {
      const pingOsc = this.ctx.createOscillator();
      const pingGain = this.ctx.createGain();
      pingOsc.type = 'triangle';
      pingOsc.frequency.setValueAtTime(freq, t0);

      pingGain.gain.setValueAtTime(0.25 / (idx + 1), t0);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.25 + idx * 0.08);

      pingOsc.connect(pingGain);
      pingGain.connect(masterGain);
      pingOsc.start(t0);
      pingOsc.stop(t0 + 0.5);
    });

    // --- 3. Kansyam Harmonic Partial Modes (432 Hz Base) ---
    // Temple bronze bell acoustic spectrum with dual-oscillator acoustic beating
    const partials = [
      { name: 'Hum', freq: 216.0, gain: 0.45, decay: 10.5 },
      { name: 'Prime / Fundamental A', freq: 432.0, gain: 0.70, decay: 11.2 },
      { name: 'Prime Detune (Beating)', freq: 432.45, gain: 0.65, decay: 11.0 },
      { name: 'Tierce (Minor 3rd)', freq: 518.4, gain: 0.38, decay: 8.5 },
      { name: 'Quint (Fifth)', freq: 648.0, gain: 0.32, decay: 7.2 },
      { name: 'Nominal (Octave)', freq: 864.0, gain: 0.40, decay: 6.8 },
      { name: 'Supernominal', freq: 1296.0, gain: 0.18, decay: 4.5 },
      { name: 'Upper Harmonic', freq: 1728.0, gain: 0.10, decay: 3.2 }
    ];

    partials.forEach((part) => {
      const osc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();

      // Hand-forged bronze partials have slight warm non-linear timbre
      osc.type = part.freq > 1000 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(part.freq, t0);

      // Attack transient: 3ms smooth rise to prevent digital clicks
      pGain.gain.setValueAtTime(0.0001, t0);
      pGain.gain.linearRampToValueAtTime(part.gain, t0 + 0.003);
      // Exponential decay envelope
      pGain.gain.exponentialRampToValueAtTime(0.0001, t0 + part.decay);

      osc.connect(pGain);
      pGain.connect(masterGain);

      osc.start(t0);
      osc.stop(t0 + part.decay + 0.1);
    });

    return {
      fundamental: 432,
      sustain: 11.2,
      alloy: 'Kansyam (78% Cu / 22% Sn)',
      master: 'K. Achary, Ala #4'
    };
  }
}

export const bellAudio = new KansyamBellAcousticEngine();
