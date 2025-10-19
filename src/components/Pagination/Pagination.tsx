import { useEffect, useRef, useState } from "react";
import {
  DEFUALT_PRODUCT_LIMIT,
  DUMMY_PRODUCT_JSON_URL,
} from "../../constants/pagination";
import { ProductItemInterface, ProductData } from "../../typings/pagination";
import ProductItem from "./ProductItem";
import "./styles.css";

const Pagination = () => {
  const [products, setProducts] = useState<ProductItemInterface[] | {}[]>([{}]);
  const [paginationSkip, setPaginationSkip] = useState<number>(0);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
  const totalPageNumber = useRef<number>(0);

  const fetchProducts = async (limit: number = DEFUALT_PRODUCT_LIMIT) => {
    const data: ProductData = await fetch(
      DUMMY_PRODUCT_JSON_URL(limit, paginationSkip)
    ).then((res) => res.json());
    const { total, products } = data;
    totalPageNumber.current = Math.ceil(total / DEFUALT_PRODUCT_LIMIT);
    setTotalProductsCount(total);
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, [paginationSkip]);

  const handlePaginationClick = (e: any) => {
    const clickedPageNumber = e.target.dataset.number;
    if (!clickedPageNumber) {
      return;
    }
    const skipValues = (clickedPageNumber - 1) * DEFUALT_PRODUCT_LIMIT;
    setPaginationSkip(skipValues);
  };

  console.log(paginationSkip, Math.ceil(totalProductsCount / 10));

  return (
    <div className="container">
      <div className="pagination-container" onClick={handlePaginationClick}>
        <button
          disabled={paginationSkip < DEFUALT_PRODUCT_LIMIT}
          className="pageNumber"
          onClick={() => {
            setPaginationSkip((prev) => {
              return prev - DEFUALT_PRODUCT_LIMIT;
            });
          }}
        >{`<`}</button>
        {[...Array(totalPageNumber.current)].map((_, i) => (
          <button className="pageNumber" data-number={i + 1}>
            {i + 1}
          </button>
        ))}
        <button
          className="pageNumber"
          disabled={paginationSkip / 10 >= Math.floor(totalProductsCount / 10)}
          onClick={() => {
            setPaginationSkip((prev) => {
              return prev + DEFUALT_PRODUCT_LIMIT;
            });
          }}
        >{`>`}</button>
      </div>
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product: any) => {
            return <ProductItem key={product.title} {...product} />;
          })
        ) : (
          <h3>No Products available</h3>
        )}
      </div>
    </div>
  );
};

export default Pagination;
