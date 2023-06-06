export type CampaingValueSchemaType = {
  campaign_name: string;
  campaign_image: File | null;
  imageURL: string | null;
  campaign_brief: string;
  campaign_objective: string;
  gender_of_audience: string[] | null;
  location: string[] | null;
  age_of_audience: {
    min: number;
    max: number;
  };
  hashtags: string | null;
  start_date: Date | string;
  end_date: Date | string;
  type_of_influencers: string[] | null;
  social_media_platform: string[] | null;
  creator_category: string[] | null;
  budget: string;
  product_link: string;
  about_product: string;
  creators_id: string[] | null | any;
  sub_brand_ids: string[] | null;
};

export type SingleCreatorCampaignType = {
  // campaign detail
  sub_brand_ids: string[] | null;
  campaign_name: string;
  campaign_image: File | null;
  imageURL: string | null;
  campaign_brief: string;
  campaign_objective: string;
  start_date: Date | string | null;
  // product detail
  budget: string;
  product_link: string;
  about_product: string;
  // choose creator
  creators_id: string;
};

export type DiscoveryData = {
  _id: string;
  userName: string;
  profile_image_url: string;
  region: string;
  category: string[];
};

export type UserProfileWithUser = {
  userProfile: {
    _id: string;
    user_id: string;
    date_of_birth: string | null;
    languages: string[] | null;
    gender: string;
    category: string[];
    region: string;
    about: string;
    contact_email: string;
    profile_image_url: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    user: {
      _id: string;
      userName: string;
    }[];
  };
};

export type CampaignFormProps = {
  activeTab: number;
  updateActiveTab: React.Dispatch<React.SetStateAction<number>>;
  incrementTab?: () => void;
  decrementTab?: () => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  updateValues?: React.Dispatch<React.SetStateAction<CampaingValueSchemaType>>;
  updateStatus: React.Dispatch<
    React.SetStateAction<{
      errorMessage: string;
      successMessage: string;
    }>
  >;
  values: CampaingValueSchemaType;
  formRef?: React.RefObject<HTMLFormElement>;
};

export type SingleCampaignFormProps = {
  activeTab: number;
  updateActiveTab: React.Dispatch<React.SetStateAction<number>>;
  incrementTab?: () => void;
  decrementTab?: () => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  updateValues?: React.Dispatch<
    React.SetStateAction<SingleCreatorCampaignType>
  >;
  updateStatus: React.Dispatch<
    React.SetStateAction<{
      errorMessage: string;
      successMessage: string;
    }>
  >;
  values: SingleCreatorCampaignType;
  formRef?: React.RefObject<HTMLFormElement>;
};
