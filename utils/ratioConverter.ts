export function convertRatioToNumber(ratio: string): number {
  const split = ratio.split("/");
  const number = (1 / +split[1]) * +split[0];

  return number;
}
