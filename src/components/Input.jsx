const Input = (props) => {
    return (
        <div>
          <label htmlFor={props.for} className="block text-sm font-medium leading-6 text-gray-900">
            {props.label}
          </label>
          <div className="mt-2">
            <input
              type={props.type}
              name={props.name}
              id={props.id}
              defaultValue={props.defaultValue ? props.defaultValue : ""}
              className="block outline-none p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={props.placeholder}
            />
          </div>
        </div>
      )
}

export default Input;