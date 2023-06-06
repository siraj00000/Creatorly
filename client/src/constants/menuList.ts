import { TbBrandCampaignmonitor, TbBrandBumble, TbBrandBlogger } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdApproval, MdSupportAgent } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GrResources } from "react-icons/gr";

export type menuListType = {
  title: string;
  link: string;
  Icon: React.ElementType;
};
type menuListProp = {
  role: string;
};

const superAdminMenuList: menuListType[] = [
  { title: "dashboard", link: "/dashboard", Icon: RxDashboard },
  { title: "approvals", link: "/approvals", Icon: MdApproval },
  { title: "blogs", link: "/blog", Icon: TbBrandBlogger },
];
const creatorMenuList: menuListType[] = [
  { title: "dashboard", link: "dashboard", Icon: RxDashboard },
  { title: "discover campaign", link: "discover", Icon: RiCompassDiscoverLine },
  { title: "resources", link: "resources", Icon: GrResources },
  { title: "support", link: "support", Icon: MdSupportAgent },
  { title: "profile", link: "profile", Icon: CgProfile },
];
const brandMenuList: menuListType[] = [
  {
    title: "Dashboard",
    link: "dashboard",
    Icon: RxDashboard,
  },
  {
    title: "Multi Creator Campaign",
    link: "multi-creator-campaign",
    Icon: TbBrandCampaignmonitor,
  },
  {
    title: "Single Creator Campaign",
    link: "single-creator-campaign",
    Icon: TbBrandCampaignmonitor,
  },
  {
    title: "discover creator",
    link: `discover-creators?search`,
    Icon: BsPeople,
  },
  {
    title: "Brands",
    link: "my-brands",
    Icon: TbBrandBumble,
  },
  { title: "support", link: "support", Icon: MdSupportAgent },
];

export const sidebarMenuList = ({ role }: menuListProp) => {
  const userMenu =
    role === "1"
      ? superAdminMenuList
      : role === "2"
      ? creatorMenuList
      : role === "3"
      ? brandMenuList
      : [];

  return userMenu;
};
