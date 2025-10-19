import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFUALT_PRODUCT_LIMIT,
  DUMMY_PRODUCT_JSON_URL,
} from "../../constants/pagination";
import { ProductItemInterface, ProductData } from "../../typings/pagination";
import ProductItem from "./ProductItem";
import "./styles.css";
import { debounce } from "../../helpers";

const Pagination = () => {
  const [products, setProducts] = useState<ProductItemInterface[] | {}[]>([{}]);
  const [activePage, setActivePage] = useState<number>(0);
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
    setActivePage(paginationSkip / DEFUALT_PRODUCT_LIMIT + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [paginationSkip]);

  const handlePaginationClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      const actions = target.dataset.actions;

      if (!actions) return;

      switch (actions) {
        case "prev":
          setPaginationSkip((prev: number) => {
            return prev - DEFUALT_PRODUCT_LIMIT;
          });
          const pageNumber = Math.floor(paginationSkip / 10);
          setActivePage(pageNumber);
          break;
        case "numbers":
          const clickedPageNumber: number = Number(target.dataset.number);
          if (!clickedPageNumber) {
            return;
          }
          setActivePage(clickedPageNumber);
          const skipValues = (clickedPageNumber - 1) * DEFUALT_PRODUCT_LIMIT;
          setPaginationSkip(skipValues);
          break;
        case "next":
          setPaginationSkip((prev) => {
            return prev + DEFUALT_PRODUCT_LIMIT;
          });
          const newPage =
            Math.floor(paginationSkip / DEFUALT_PRODUCT_LIMIT) + 2;
          setActivePage(newPage);
          break;
        default:
          break;
      }
    },
    []
  );

  const debouncedHandlePaginationClick = debounce(handlePaginationClick, 100);
  console.log(activePage);

  return (
    <div className="container">
      <div
        className="pagination-container"
        onClick={debouncedHandlePaginationClick}
      >
        <button
          disabled={paginationSkip < DEFUALT_PRODUCT_LIMIT}
          className="pageNumber"
          data-actions="prev"
        >{`<`}</button>
        {[...Array(totalPageNumber.current)].map((_, i) => (
          <button
            className={`pageNumber ${activePage === i + 1 ? "active" : ""}`}
            data-number={i + 1}
            disabled={activePage === i + 1}
            data-actions="numbers"
          >
            {i + 1}
          </button>
        ))}
        <button
          className="pageNumber"
          disabled={paginationSkip / 10 >= Math.floor(totalProductsCount / 10)}
          data-actions="next"
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
