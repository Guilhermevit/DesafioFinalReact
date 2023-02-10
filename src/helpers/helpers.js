// prettier-ignore
const WITH_SPECIAL_CHARACTERS = 
  'áãâäàÁÃÂÄÀéêëèÉÊËÈíîïìÍÎÏÌóõôöòÓÕÔÖÒúûüùÚÛÜÙñÑçÇ'.split('');

// prettier-ignore
const WITHOUT_SPECIAL_CHARACTERS = 
  'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuUUUUnNcC'.split('');

export function AjusteImagens(value) {
  const imageName =
    value
      .toString()
      .toLowerCase()
      .split("")
      .map((char) => {
        const index = WITH_SPECIAL_CHARACTERS.indexOf(char);
        return index < 0 ? char : WITHOUT_SPECIAL_CHARACTERS[index];
      })
      .join("")
      .split(" ")
      .join("_") + ".png";

  return imageName;
}

export function AjusteNomes(teamName) {
  const array = teamName.split(" ");

  // América mg => América MG
  if (!!array[1] && array[1].length === 2) {
    return `${array[0]} ${array[1].toUpperCase()}`;
  }

  // São paulo => São Paulo
  if (!!array[1] && array[1].length > 2) {
    return `${array[0]} ${array[1][0].toUpperCase()}${array[1].substring(1)}`;
  }

  return array[0];
}
