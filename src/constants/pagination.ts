const DEFUALT_PRODUCT_LIMIT = 10;

const DUMMY_PRODUCT_JSON_URL = (limit: number) =>
  `https://dummyjson.com/products?limit=${
    limit ? limit : DEFUALT_PRODUCT_LIMIT
  }`;

export { DUMMY_PRODUCT_JSON_URL, DEFUALT_PRODUCT_LIMIT };
