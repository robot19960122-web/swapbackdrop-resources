export interface Rectangle { width: number; height: number; left: number; top: number }
export interface FitOptions {
  imageWidth: number; imageHeight: number; frameWidth: number; frameHeight: number;
  zoom?: number; x?: number; y?: number; fit?: 'contain' | 'cover';
}
export declare const frames: Readonly<{
  portrait: readonly [1080, 1920]; square: readonly [1080, 1080]; landscape: readonly [1920, 1080];
}>;
export declare function fitRect(options: FitOptions): Rectangle;
export declare function placement(imageWidth: number, imageHeight: number, frameWidth: number, frameHeight: number, zoom?: number, x?: number, y?: number): Rectangle;
