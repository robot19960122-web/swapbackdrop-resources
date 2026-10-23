import { fitRect, placement, frames, type Rectangle } from './geometry.mjs';
const rectangle: Rectangle = fitRect({ imageWidth: 1920, imageHeight: 1080, frameWidth: 100, frameHeight: 100, fit: 'cover' });
placement(1920, 1080, ...frames.portrait);
console.log(rectangle.left);
// @ts-expect-error Unsupported fitting mode must be caught by declarations.
fitRect({ imageWidth: 1, imageHeight: 1, frameWidth: 1, frameHeight: 1, fit: 'stretch' });
// @ts-expect-error Presets must not be writable.
frames.square[0] = 1;
// @ts-expect-error Dimensions do not accept strings.
placement('1', 1, 1, 1);
