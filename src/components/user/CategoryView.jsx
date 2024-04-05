import ProductView from "./ProductView";

const CategoryView = ({category, onClickProduct}) => {
  return (
    <>
      {
        <div className="flex flex-col gap-1">
             <h5 className="text-white uppercase font-bold text-2xl p-6">{category.name}</h5>
             {category.products.map(product => (
                <ProductView key={product._id} onClickProduct={onClickProduct} product={product} />
             ))}
        </div>

      }
    </>
  );
};

export default CategoryView;
