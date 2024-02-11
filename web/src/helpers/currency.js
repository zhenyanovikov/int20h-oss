import { AMOUNT_SCALE } from "../constants/currency";

export function scaleAmountUp(amout) {
  return amout * AMOUNT_SCALE;
}

export function scaleAmountDown(amout) {
  return amout / AMOUNT_SCALE;
}

export const hryvniasFormatter = new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: "UAH",
  minimumFractionDigits: 0,
});
