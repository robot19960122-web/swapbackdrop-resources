export const frames = Object.freeze({ portrait: [1080, 1920], square: [1080, 1080], landscape: [1920, 1080] });

export function placement(imageWidth, imageHeight, frameWidth, frameHeight, zoom = 1, x = 0, y = 0) {
  for (const value of [imageWidth, imageHeight, frameWidth, frameHeight, zoom]) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError('Dimensions and zoom must be positive finite numbers');
  }
  for (const value of [x, y]) if (!Number.isFinite(value)) throw new RangeError('Offsets must be finite');
  const scale = Math.min(frameWidth / imageWidth, frameHeight / imageHeight) * zoom;
  const width = imageWidth * scale;
  const height = imageHeight * scale;
  return { width, height, left: (frameWidth - width) / 2 + x * frameWidth / 100, top: (frameHeight - height) / 2 + y * frameHeight / 100 };
}
