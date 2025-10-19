import { useEffect, useState } from "react";
import {
  DEFUALT_PRODUCT_LIMIT,
  DUMMY_PRODUCT_JSON_URL,
} from "../../constants/pagination";
import { ProductItemInterface } from "../../typings/pagination";
import ProductItem from "./ProductItem";
import "./styles.css";

const Pagination = () => {
  const [products, setProducts] = useState<ProductItemInterface[] | {}[]>([{}]);
  const fetchProducts = async (limit: number = DEFUALT_PRODUCT_LIMIT) => {
    const data = await fetch(DUMMY_PRODUCT_JSON_URL(limit)).then((res) =>
      res.json()
    );
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pagination-container">
      Pagination
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
