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
    const skipValues = (clickedPageNumber - 1) * DEFUALT_PRODUCT_LIMIT;
    setPaginationSkip(skipValues);
  };

  return (
    <div className="container">
      <div className="pagination-container" onClick={handlePaginationClick}>
        <span
          className="pageNumber"
          onClick={() => {
            setPaginationSkip((prev) => {
              console.log("<", prev);
              if (prev < DEFUALT_PRODUCT_LIMIT) {
                return prev;
              }
              return prev - DEFUALT_PRODUCT_LIMIT;
            });
          }}
        >{`<`}</span>
        {[...Array(totalPageNumber.current)].map((_, i) => (
          <span className="pageNumber" data-number={i + 1}>
            {i + 1}
          </span>
        ))}
        <span
          className="pageNumber"
          onClick={() => {
            setPaginationSkip((prev) => {
              // if (prev === 0) {
              //   return prev;
              // }
              console.log(">", prev);

              return prev + DEFUALT_PRODUCT_LIMIT;
            });
          }}
        >{`>`}</span>
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
