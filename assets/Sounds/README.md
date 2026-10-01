# Bell Audio

The app now uses the supplied bell recordings and matching PNG images.
Generated tones remain a fallback for missing or unreadable recordings.

Place audio files in this folder using these exact base names:

- bell_basu.mp3
- bell_ombu.mp3
- bell_gong.mp3
- bell_dengze.mp3
- bell_zhada.mp3
- bell_shurong.mp3
- bell_sakya.mp3
- bell_kangse.mp3
- bell_wood_block.mp3

Supported extensions, in lookup order: wav, m4a, mp3, aiff, caf.
Use one short bell strike per file. The app handles strike counts.
Each recording plays in full, followed by 1.5 seconds before the next strike.
Images use the bell name without the bell_ prefix, except Gong uses
gong_hanchi.png. Ambient recordings are bundled but not yet selectable.
This folder is already included in the Xcode resource build phase, so files
added here are bundled on the next build without Swift code changes.
Missing or unreadable recordings fall back to the generated tone.
