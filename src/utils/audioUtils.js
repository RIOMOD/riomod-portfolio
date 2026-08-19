// Advanced Web Audio API Synthesizer for Hyper-Realistic Magazine Paper Flip Sound
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a hyper-realistic, natural book page-turning sound effect.
 * Uses a dual-layer audio synthesis:
 * - Layer 1: Silky paper surface friction & rustle (dynamic modulated bandpass)
 * - Layer 2: Subtle air whoosh displacement & book spine body resonance
 * - Subtle randomized pitch variations on every flip for organic feel.
 */
export function playPageFlipSound(enabled = true, volume = 0.55) {
  if (!enabled || typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.16 + Math.random() * 0.03; // ~160ms - 190ms natural variance

    // 1. GENERATE DUAL TEXTURED NOISE BUFFER
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    let lastSample = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const white = Math.random() * 2 - 1;
      
      // Soft pink noise filter
      const pink = (lastSample + 0.06 * white) / 1.06;
      lastSample = pink;

      // Micro-flutter modulation (simulating paper grain dragging against paper)
      const flutter = Math.sin(progress * Math.PI * 14) * 0.25;
      output[i] = (pink + flutter * 0.1) * (1 - Math.pow(progress, 2.5));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // 2. LAYER 1: SILKY PAPER FRICTION (Bandpass Sweep)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    const startFreq = 1800 + (Math.random() * 300 - 150);
    const endFreq = 650 + (Math.random() * 100 - 50);
    bandpass.frequency.setValueAtTime(startFreq, now);
    bandpass.frequency.exponentialRampToValueAtTime(Math.max(100, endFreq), now + duration * 0.85);
    bandpass.Q.setValueAtTime(1.8, now);

    // 3. LAYER 2: HIGH TEXTURE AIR FRICTION (Highpass)
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(320, now);

    // 4. LOW-PASS MELLOWING (Prevents harsh digital hiss)
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(4500, now);
    lowpass.frequency.exponentialRampToValueAtTime(1800, now + duration);

    // 5. SMOOTH GAIN ENVELOPE (Gentle curve without sudden pops)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(volume * 0.8, now + 0.025);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.35, now + 0.09);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, now + duration);

    // 6. CONNECT GRAPH
    noiseSource.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + duration + 0.02);
  } catch (err) {
    console.warn('Page flip audio error:', err);
  }
}
