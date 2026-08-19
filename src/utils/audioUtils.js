// High-performance Web Audio API Sound Synthesizer for Realistic Page Flip
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
 * Play a synthesized realistic paper page-flip sound effect
 * Uses filtered white noise + resonance bandpass + fast decay envelope.
 */
export function playPageFlipSound(enabled = true, volume = 0.6) {
  if (!enabled || typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.18; // ~180ms duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate textured pink/white noise with flutter
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink filter smooth
      data[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = data[i];
      // Add subtle rustling modulation
      data[i] *= 1 + 0.5 * Math.sin((i / bufferSize) * Math.PI * 8);
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Bandpass filter to simulate crisp paper texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.16);
    filter.Q.setValueAtTime(2.2, ctx.currentTime);

    // Highpass to eliminate muddy low rumble
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(350, ctx.currentTime);

    // Gain envelope (Fast attack, natural decay)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.7, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.17);

    // Connect node graph
    noiseNode.connect(filter);
    filter.connect(highpass);
    highpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start(ctx.currentTime);
    noiseNode.stop(ctx.currentTime + 0.18);
  } catch (err) {
    console.warn('Page flip audio error:', err);
  }
}
