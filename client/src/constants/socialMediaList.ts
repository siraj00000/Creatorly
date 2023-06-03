import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

interface SocialMediaInputListType {
  name: string;
  type: string;
  label?: string;
  placeholder: string;
  required: boolean;
  Icon: React.ElementType;
}

export const socialMediaInputList: SocialMediaInputListType[] = [
  {
    name: "instagram",
    type: "text",
    placeholder: "Enter instagram link",
    required: false,
    Icon: AiOutlineInstagram,
  },
  {
    name: "youtube",
    type: "text",
    placeholder: "Enter youtube link",
    required: false,
    Icon: AiFillYoutube,
  },
  {
    name: "facebook",
    type: "text",
    placeholder: "Enter facebook link",
    required: false,
    Icon: BsFacebook,
  },
  {
    name: "linkedin",
    type: "text",
    placeholder: "Enter linkedin link",
    required: false,
    Icon: AiFillLinkedin,
  },
  {
    name: "twitter",
    type: "text",
    placeholder: "Enter twitter link",
    required: false,
    Icon: AiOutlineTwitter,
  },
];

export const brandOrAgencyWebsiteInputList: SocialMediaInputListType[] = [
  {
    name: "websiteLink",
    type: "text",
    placeholder: "Please enter your website",
    required: false,
    Icon: CgWebsite,
  },
];
