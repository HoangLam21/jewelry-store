import { NavbarLink, SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const navbarLinks: NavbarLink[] = [
  {
    // icon: "fluent:home-20-regular",
    route: "/",
    label: "HOME",
  },
  {
    // icon: "iconoir:search",
    route: "/product",
    label: "PRODUCT",
  },
  {
    // icon: "pepicons-pencil:bell",
    route: "/about-us",
    label: "ABOUT US",
  },
  {
    // icon: "ant-design:message-outlined",
    route: "/contact",
    label: "CONTACT",
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    icon: "mynaui:home",
    route: "/admin",
    label: "Dashboard",
  },
  {
    icon: "hugeicons:note-edit",
    route: "/admin/staff",
    label: "Staff",
  },
  {
    icon: "hugeicons:note-edit",
    route: "/admin/provider",
    label: "Provider",
  },
  {
    icon: "carbon:workspace",
    route: "/admin/customer",
    label: "Customer",
  },
  {
    icon: "material-symbols:timer-outline",
    route: "/admin/product",
    label: "Product",
  },
  {
    icon: "material-symbols:timer-outline",
    route: "/admin/voucher",
    label: "Voucher",
  },
  {
    icon: "ph:video",
    route: "/admin/order",
    label: "Order",
  },
  {
    icon: "hugeicons:contact-book",
    route: "/admin/import",
    label: "Import",
  },
  {
    icon: "healthicons:group-discussion-meetingx3-outline",
    route: "/admin/finance",
    label: "Finance",
  },
  {
    icon: "carbon:course",
    route: "/admin/work-schedule",
    label: "Work schedule",
  },
  {
    icon: "ph:chalkboard-teacher-light",
    route: "/admin/chat",
    label: "Chat",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
