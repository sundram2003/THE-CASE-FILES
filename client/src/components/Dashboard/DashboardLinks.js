import { ACCOUNT_TYPE } from "../../utils/constant";

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
  {
    id: 4,
    name: "Earnings",
    path: "/dashboard/earnings",
    icon: "VscCreditCard",
  },
  {
    id: 5,
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: "VscFile",
  },
  {
    id: 6,
    name: "My Wallet",
    path: "/dashboard/wallet",
    icon: "VscSymbolColor",
  },

  {
    id: 8,
    name: "Admin Panel",
    path: "/dashboard/admin",
    icon: "VscShield",
    type: ACCOUNT_TYPE.ADMIN,
  },
];
