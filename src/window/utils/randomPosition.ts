import { rectU } from "./rectUtils.js";
export function randomPosition() {
  // area of screen
  const { width, height } = rectU(
    //@ts-expect-error
    document.documentElement,
  );

  const randomNum = Math.round(Math.random() * 50 + 1);
  return {
    width: 350,
    height: 250,
    top: height / 2 - randomNum,
    left: width / 2 - randomNum,
  };
}
