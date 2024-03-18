import { ACCOUNT_TYPE } from "../../utils/constant";
import React from "react";

export const sidebarLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "New Case ",
    path: "/dashboard/add-blog",
    icon: "VscKey",
  },
  {
    id: 3,
    name: "My Case Files",
    path: "/blog/getMyBlogs",
    icon: "VscNote",
  },
  // {
  //   id: 4,
  //   name: "Earnings",
  //   path: "/dashboard/earnings",
  //   icon: "VscCreditCard",
  // },

  // {
  //   id: 8,
  //   name: "Admin Panel",
  //   path: "/dashboard/admin",
  //   icon: "VscShield",
  //   type: ACCOUNT_TYPE.ADMIN,
  // },
  // ..making for analyytics
  {
    id: 5,
    name: "Analytics",
    path: "/auth/userAnalytics",
    icon: "VscCreditCard",
  },
];
