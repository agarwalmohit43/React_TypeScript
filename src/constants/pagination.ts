const DEFUALT_PRODUCT_LIMIT = 10;

const DUMMY_PRODUCT_JSON_URL = (limit: number, skip: number) =>
  `https://dummyjson.com/products?limit=${
    limit ? limit : DEFUALT_PRODUCT_LIMIT
  }&skip=${skip ? skip : 0}`;

export { DUMMY_PRODUCT_JSON_URL, DEFUALT_PRODUCT_LIMIT };
