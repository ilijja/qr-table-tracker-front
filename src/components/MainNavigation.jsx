import { useState } from "react";
import { Disclosure} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import NavigationLink from "./NavLink"

const MainNavigation = () => {
  const [activeLink, setActiveLink] = useState("/login");

  const navigation = [
    { name: "Login", to: "/login" },
    { name: "Register", to: "/register" },
  ];

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                        <NavigationLink key={item.name} activeLink={activeLink} to={item.to} onClick={() => handleLinkClick(item.to)}>{item.name}</NavigationLink>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </div>

         
        </>
      )}
    </Disclosure>
  );
};

export default MainNavigation;
