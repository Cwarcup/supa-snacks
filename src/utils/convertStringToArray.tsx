// fn to convert string of comma separated values to array
const convertStringToArray = (str: string) => {
  return str.split(',').map((item) => {
    // uppercase first letter of each word
    const capitalized = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    return capitalized.trim();
  });
};

export default convertStringToArray;
