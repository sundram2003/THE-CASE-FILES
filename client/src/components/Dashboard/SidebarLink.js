import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import React from "react";
// import { setUser } from "../../slices/profileSlice";

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <>
      <NavLink
        to={link.path}
        // onClick={() => dispatch(setUser())}
        className={`relative px-8 py-2 text-sm font-medium p-2 rounded-lg ${
          matchRoute(link.path)
            ? "bg-yellow-300 text-yellow-500"
            : "bg-opacity-0 text-black hover:bg-yellow-50 hover:text-yellow"
        } transition-all duration-200`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-100 ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"
          }`}
        ></span>
        <div className="flex items-center gap-x-2  bg-slate-300  p-2 rounded-md">
          {/* Icon Goes Here */}
          <Icon className="text-lg text-black" />
          <span className=" text-blue-950">{link.name}</span>
        </div>
      </NavLink>
    </>
  );
}
