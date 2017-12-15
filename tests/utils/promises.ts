export const delayedResolve = (rect: Rectangle) =>
  new Promise<Rectangle>(resolve => setTimeout(() => resolve(rect), 50));
