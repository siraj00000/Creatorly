import { GiBookshelf, GiLargeDress, GiMusicalScore } from "react-icons/gi";
import { FaTheaterMasks } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { CiPizza } from "react-icons/ci";
import {
  MdOutlineLocalDrink,
  MdOutlinePhotoCamera,
  MdOutlineScreenshotMonitor,
} from "react-icons/md";
import { IoGameControllerOutline, IoFitnessOutline } from "react-icons/io5";
import { SiFloatplane } from "react-icons/si";

export type categorySelectProperties = {
  name: string;
  Icon: React.ElementType;
};

export const categorySelectPropertiesList: categorySelectProperties[] = [
  {
    name: "Education",
    Icon: GiBookshelf,
  },
  {
    name: "Entertainment",
    Icon: FaTheaterMasks,
  },
  {
    name: "Fasion",
    Icon: GiLargeDress,
  },
  {
    name: "Finance",
    Icon: BsCashCoin,
  },
  {
    name: "Food",
    Icon: CiPizza,
  },
  {
    name: "Gaming",
    Icon: IoGameControllerOutline,
  },
  {
    name: "Health and Fitness",
    Icon: IoFitnessOutline,
  },
  {
    name: "Infotainment",
    Icon: MdOutlineScreenshotMonitor,
  },
  {
    name: "Music",
    Icon: GiMusicalScore,
  },
  {
    name: "Other",
    Icon: MdOutlineLocalDrink,
  },
  {
    name: "Photography",
    Icon: MdOutlinePhotoCamera,
  },
  {
    name: "Travel",
    Icon: SiFloatplane,
  },
];
