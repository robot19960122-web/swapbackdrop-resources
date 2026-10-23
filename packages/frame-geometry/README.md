# swapbackdrop-frame-geometry

Zero-dependency, ESM-only rectangle math for browser Canvas and server-side layout planning. Supports contain/cover fitting, centered zoom, and percentage-of-frame offsets. Includes TypeScript declarations. No DOM, media decoding, network requests, telemetry, model weights or AI inference.

## Install

```sh
npm install swapbackdrop-frame-geometry
```

## Canvas example

```js
import { fitRect, frames } from 'swapbackdrop-frame-geometry';
const [frameWidth, frameHeight] = frames.portrait;
const rect = fitRect({
  imageWidth: image.naturalWidth,
  imageHeight: image.naturalHeight,
  frameWidth, frameHeight,
  fit: 'contain', zoom: 1, x: 0, y: 0
});
ctx.drawImage(image, rect.left, rect.top, rect.width, rect.height);
```

`image` and `ctx` are supplied by your application; decoding and canvas sizing are not performed by this library. Keep the drawing surface sized to `frameWidth` and `frameHeight`.

## API

`fitRect({ imageWidth, imageHeight, frameWidth, frameHeight, fit?, zoom?, x?, y? })` returns `{ width, height, left, top }` without rounding. Dimensions and zoom must be positive finite numbers. `fit` is `contain` (default, letterbox) or `cover` (crop). Zoom defaults to 1. Offsets default to 0; `x: 10` shifts right by 10% of output width and `y: -10` shifts up by 10% of output height. Offsets are not clamped. Invalid values or non-representable results throw `RangeError`.

`placement(imageWidth, imageHeight, frameWidth, frameHeight, zoom?, x?, y?)` is the contain-mode shorthand used by Frame Lab.

`frames` contains deeply frozen portrait `[1080,1920]`, square `[1080,1080]`, and landscape `[1920,1080]` presets.

This is geometry, not a background remover or a quality check. It does not apply EXIF orientation, inspect transparency, bound canvas memory, repair edges or process video. Callers must validate their own files and output limits. Tests cover math and error behavior, not every device's image decoding.

## Source and support

MIT-licensed public helper maintained by [SwapBackdrop](https://swapbackdrop.com/?utm_source=npm&utm_medium=referral&utm_campaign=resource_distribution_202610&utm_content=frame_geometry). The separate website provides a paid cloud short-video workflow; installing this package does not call it or require an account. Brand-authored with AI assistance.

[Source and issues](https://github.com/robot19960122-web/swapbackdrop-resources/tree/main/packages/frame-geometry) · support@swapbackdrop.com

From this source directory, run `npm test`. No dependencies or install scripts are required.
