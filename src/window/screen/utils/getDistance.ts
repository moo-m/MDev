export function getDistance(e: TouchEvent) {
  //distance between first point and last point from one side
  return Math.abs(e.touches[1].clientX - e.touches[0].clientX);
}
