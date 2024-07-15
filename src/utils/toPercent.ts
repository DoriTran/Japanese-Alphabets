const toPercent = (
  current: number,
  total: number,
  round: "floor" | "ceil" | "round" | number = "round",
  withPercent: boolean = false,
): number | string => {
  if (total === 0) return 0;

  let percentage = (current / total) * 100;

  if (typeof round === "number") {
    const factor = 10 ** round;
    percentage = Math.floor(percentage * factor) / factor;
  } else {
    switch (round) {
      case "floor":
        percentage = Math.floor(percentage);
        break;
      case "ceil":
        percentage = Math.ceil(percentage);
        break;
      case "round":
      default:
        percentage = Math.round(percentage);
        break;
    }
  }

  return withPercent ? `${percentage}%` : percentage;
};

export default toPercent;
