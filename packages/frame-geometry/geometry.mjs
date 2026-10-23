export const frames = Object.freeze({
  portrait: Object.freeze([1080, 1920]),
  square: Object.freeze([1080, 1080]),
  landscape: Object.freeze([1920, 1080])
});

/** Pure geometry only: offsets are percentages of output-frame dimensions. */
export function fitRect({ imageWidth, imageHeight, frameWidth, frameHeight, zoom = 1, x = 0, y = 0, fit = 'contain' }) {
  for (const value of [imageWidth, imageHeight, frameWidth, frameHeight, zoom]) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError('Dimensions and zoom must be positive finite numbers');
  }
  for (const value of [x, y]) if (!Number.isFinite(value)) throw new RangeError('Offsets must be finite');
  if (fit !== 'contain' && fit !== 'cover') throw new RangeError('Fit must be contain or cover');
  const scale = (fit === 'contain' ? Math.min : Math.max)(frameWidth / imageWidth, frameHeight / imageHeight) * zoom;
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  const left = (frameWidth - width) / 2 + (x / 100) * frameWidth;
  const top = (frameHeight - height) / 2 + (y / 100) * frameHeight;
  if (![scale, width, height, left, top].every(Number.isFinite) || scale <= 0 || width <= 0 || height <= 0) {
    throw new RangeError('Geometry exceeds numeric range');
  }
  return { width, height, left, top };
}

/** Backwards-compatible contain-mode shorthand used by Frame Lab. */
export function placement(imageWidth, imageHeight, frameWidth, frameHeight, zoom = 1, x = 0, y = 0) {
  return fitRect({ imageWidth, imageHeight, frameWidth, frameHeight, zoom, x, y });
}
