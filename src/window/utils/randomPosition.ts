import { SCREENT } from "../../types/window/main";
export function randomPosition(): SCREENT.winPosition {
  // area of screen
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  const randomNum = Math.round(Math.random() * 50 + 1);
  return {
    width: 370,
    height: 170,
    top: height / 2 - 70 - randomNum,
    left: width / 2 - 180,
  };
}
