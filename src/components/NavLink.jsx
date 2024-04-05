import { NavLink } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  

const NavigationLink = (props) => {
    return <NavLink to={props.to} onClick={props.onClick} className={classNames(
        props.to === props.activeLink
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      )} >{props.children}</NavLink>
}

export default NavigationLink;