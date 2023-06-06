import {
  CampaingValueSchemaType,
  SingleCreatorCampaignType,
} from "../types/campaignForm.types";
import { DropdownListType } from "../types/lists.types";

export const campaignValueSchema: CampaingValueSchemaType = {
  campaign_name: "",
  campaign_image: null,
  imageURL: null,
  campaign_brief: "",
  campaign_objective: "",
  gender_of_audience: [],
  location: [],
  age_of_audience: {
    min: 13,
    max: 80,
  },
  hashtags: "",
  start_date: "",
  end_date: "",
  type_of_influencers: [],
  social_media_platform: [],
  creator_category: [],
  budget: "",
  product_link: "",
  about_product: "",
  creators_id: null,
  sub_brand_ids: null,
};

export const singleCampaignValueSchema: SingleCreatorCampaignType = {
  campaign_name: "",
  campaign_image: null,
  imageURL: null,
  campaign_brief: "",
  campaign_objective: "",
  start_date: "",
  budget: "",
  product_link: "",
  about_product: "",
  creators_id: "",
  sub_brand_ids: null,
};

export const CampaignObjectiveList: DropdownListType[] = [
  { name: "Brand awareness & lead generation" },
  { name: "Brand awareness" },
  { name: "Brand recall & engagement" },
  { name: "Website visit" },
  { name: "Content creation to reuse" },
  { name: "Downloads or registrations" },
];

export const socialMediaPlatformList: string[] = [
  "Instagram",
  "Facebook",
  "Youtube",
  "Linkedin",
];

export const discoveryTableColumns = [
  { label: "Profile", key: "profile_image_url" },
  { label: "Username", key: "userName" },
  { label: "Region", key: "region" },
  { label: "Category", key: "category" }
];

export const requestTableColumns = [
  { label: "Logo", key: "campaing_image" },
  { label: "Campaign", key: "campaign_name" },
  { label: "Budget", key: "budget" },
  { label: "Start Date", key: "start_date" },
  { label: "End Date", key: "end_date" },
  { label: "Collab", key: "collab" },
  { label: "Deny", key: "deny" },
];
