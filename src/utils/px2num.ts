export const px2num = (str: string) => {
  const i = str.indexOf('px');
  if (i < 0) return Number(str);

  return Number(str.substring(0, i));
};
