export const mapObjectToArr = (obj) => {
  if (obj) {
    const arr = Object.keys(obj).map((e) => {
      return obj[e];
    });
    return arr;
  }
  return [];
};
export const mapArrToObject = (arr = []) => {
  if (arr.length > 0) {
    let obj = {};
    arr.forEach((e, index) => {
      obj[index + ""] = e;
    });
    return obj;
  }
  return null;
};

export const isStringEmpty = (string = "") => {
  return string.trim() === "" || !string;
};
export const areStringsEmpty = (arr = []) => {
  let isEmpty = true;
  arr.forEach((element) => {
    if (!isStringEmpty(element)) {
      isEmpty = false;
    }
  });
  return isEmpty;
};
