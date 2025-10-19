import React from "react";
import { ProductItemInterface } from "../../typings/pagination";

const ProductItem = ({ title, thumbnail }: Readonly<ProductItemInterface>) => {
  return (
    <div className="product-item">
      <img src={thumbnail} width={100} height={100} alt={title} />
      <span>{title}</span>
    </div>
  );
};

export default React.memo(ProductItem);
