import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";


const CategoryAction = (props) => {

    return <>
    <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); 
                props.onAddProduct(props.category._id, props.category.name);
              }}
              className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>


            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); 
                props.onEditCategory(props.category)
              }}
              className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PencilSquareIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>


            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); 
                props.onDeleteCategory(props.category)
              }}
              className="rounded-full bg-red-700 hover:bg-red-800 p-1.5 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <TrashIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>

            </div></>
}

export default CategoryAction;