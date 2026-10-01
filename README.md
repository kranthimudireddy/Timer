# Mindful Timer PWA

This standalone web version uses the native app's recorded bells, images, fonts, and backgrounds. No build step, accounts, or runtime dependencies.

## Use on iPhone

Host the contents of this directory with any HTTPS static web host (upload this directory as the site root). Open that HTTPS URL in Safari, tap Share → Add to Home Screen, then open Mindful Timer from its icon. Keep it open online until the “Ready to use offline” message appears. Assets are approximately 20 MB. Opening tracks are imported through Files and stored in IndexedDB locally; settings use localStorage. Clearing website data removes these. Native settings do not automatically transfer.

For a desktop preview, run `python3 -m http.server 8080 --directory pwa` from the project root and open http://localhost:8080. A phone needs HTTPS; a plain HTTP LAN address will not provide service workers or screen wake lock.

## Features

- Duration hours 0–23, minutes/seconds 0–59, minimum one second
- Warm-up 0–55 seconds in five-second steps, then 1, 2, 3, or 5 minutes
- Nine original recorded bell choices with images and previews
- Independent starting, interval, and ending sounds and 1–3 strikes
- Interval bells off or every 1–60 minutes; strike spacing 2–30 seconds
- Imported opening audio after warm-up, then three seconds before starting bell
- Pause, resume, end session, completion, and progress ring
- Black, stars, and ocean backgrounds
- Offline app and locally persisted settings/audio
- Home Screen installation, safe-area support, and session screen wake lock

## iOS limitation

A PWA cannot guarantee native background audio behavior. iOS may suspend web execution or audio while locked or backgrounded, so interval and ending bells can be missed. Keep the app visible and the screen awake for reliable sessions. Wake lock is requested where supported. Deadlines use wall-clock time, so the meditation countdown corrects itself when you return. Missed interval bells are skipped, matching the native app; an ending bell may play late on return. The opening track uses Web Audio and can also suspend in the background. Mixing with other audio is controlled by Safari/iOS, unlike the native app's audio session.

## Validation and updates

Run `cd pwa && npm test` (Node supports ES modules). Check real Safari playback and Home Screen installation on the target phone before relying on it for a session. No physical iPhone validation has been performed. For asset/code updates, change the cache version in `sw.js` and retain the full precache list. Deployment should serve standard MIME types for JS, JSON manifests, fonts, audio and images. Keep this app on a stable HTTPS origin and path to preserve local data.
