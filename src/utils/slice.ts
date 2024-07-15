export function sliceTo(str: string, from: number | string, to: number | string): string {
  const startIndex: number = typeof from === "number" ? from : str.indexOf(from);
  let endIndex: number = typeof to === "number" ? to : str.indexOf(to);
  if (startIndex > endIndex) endIndex = str.length;
  return str.slice(startIndex !== -1 ? startIndex : 0, endIndex !== -1 ? endIndex : str.length);
}
