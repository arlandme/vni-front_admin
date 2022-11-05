export const capitalize = (text) => {
  if (text)
  {
    const tmp = text.toLowerCase().trim().replace('  ', ' ').split(' ');
    return tmp.reduce((prev, cur) => {
      const firstLetter = cur[0].toUpperCase();
      const newText = firstLetter + cur.slice(1, cur.length);
      return [...prev, newText];
    }, []).join(' ');
  }
  else return '';
};

export const convertToPath = (text) => {
  const regex = /&|,| |\//g;
  if (text)
    return text.trim().toLowerCase().replace(regex, '-').replace(/--/g, '-');
    
  return '';
};