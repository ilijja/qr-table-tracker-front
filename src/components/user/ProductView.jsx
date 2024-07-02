import CartContext from "../../store/CartContext";
import { useContext } from "react";

const ProductView = ({product, onClickProduct}) => {

    const {addItem} = useContext(CartContext)

    const addToCartHandler = () => {
        addItem(product, 1)
    }


  return (
    <>
      <div className=" border-l-2 border-gray-500 px-3">
        <div onClick={() => onClickProduct(product)} className="flex w-full min-h-36 p-3 text-white border-b border-gray-600 ">
          <div className="flex flex-col w-2/3 gap-1 pr-1">
            <h5 className=" text-lg font-semibold">{product.name}</h5>
            <p className="line-clamp-2 overflow-hidden text-gray-400">
              {product.description}
            </p>
            <p className="text-indigo-500">{product.price} RSD</p>
          </div>

          <div className="w-1/3 flex flex-col justify-center items-center">
            <div className="w-full h-full">
                <img src={product.imageUrl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
