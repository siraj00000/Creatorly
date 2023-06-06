export type LinkTreeResponseTypes = {
  creatorLinkTree: {
    customLink: Array<{
      title: string;
      link: string;
      _id: string;
    }>;
    _id: string;
  };
  userProfile: {
    profile_image_url: string;
  };
  creatorOnlinePresence: {
    instagramUserName: string;
    user: string;
  };
};

export type ProfileDataType = {
  getUserName?: {
    _id: string;
    userName: string;
    phoneNumber: string;
  };
  profile?: {
    _id: string;
    user_id: string;
    date_of_birth: string;
    languages: string[];
    gender: string;
    category: string[];
    region: string;
    about: string;
    contact_email: string;
    profile_image_url: string;
  };
  creatorOnlinePressence?: {
    _id: string;
    category: string[];
    links: {
      instagram: string;
      facebook: string;
      youtube: string;
      twitter: string;
      linkedin: string;
    };
    user: string;
    instagramUserName: string;
  };
};
