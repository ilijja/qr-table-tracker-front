import { Fragment, useContext, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Product from "./Product";
import ProductContext from "../../store/ProductContext";

const ProductContainer = (props) => {

  const productCtx = useContext(ProductContext);

  const products = productCtx.products.filter(
    (prod) => prod.menuCategoryId === props.categoryId
  );

  return (
    <div className="px-2 py-2 sm:px-6 block">
        {products.map(product => 
            (<Product key={product._id} product={product} />)
        )}
    </div>
  );
};

export default ProductContainer;
