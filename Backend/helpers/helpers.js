const toCamel = (str) =>
  str.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());

const toSnake = (str) => str.replace(/([A-Z])/g, "_$1").toLowerCase();

const convertKeys = (data, to = "camel") => {
  const convert = to === "camel" ? toCamel : toSnake;
  return data.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[convert(key)] = obj[key];
      }
    }
    return newObj;
  });
};

module.exports = { convertKeys };
