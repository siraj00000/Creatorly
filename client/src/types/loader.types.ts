export type AboutMyBrand = {
  about_brand: string;
  company_logo: string;
  company_name: string;
  country: string;
};

export type myProfileType = {
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

export type loggedInUserType = {
  _id: string;
  userName: string;
  phoneNumber: string;
  userType: "creator" | "brand/agency";
  email: string;
};

export type UserProfileTypes = {
  userProfile?: myProfileType;
  loggedInUser?: loggedInUserType;
};

export type campaignAttributes = {
  _id: string;
  campaign_name: string;
  campaign_image: {
    url: string;
  };
  start_date: string;
  end_date: string;
  budget: string;
  status: string;
};
export type CampaignTypes = {
  ongoingCampaigns: Array<campaignAttributes>;
  pendingCampaigns: Array<campaignAttributes>;
  completedCampaigns: Array<campaignAttributes>;
  deniedCampaigns: Array<campaignAttributes>;
};

export type InvoiceDataTypes = {
  _id: string;
  invoice_number: string;
  date: string;
  due: string;
  to: {
    Name: string;
  };
  total: {
    balance_due: number;
  };
};

export type ShowInvoiceProps = {
  data: {
    masterInvoice: {
      _id: string;
      user_id: string;
      invoice_name: string;
      invoice_image: string;
      invoice_number: string;
      date: string;
      due: string;
      note: string;
      signature: string;
      from: {
        Name: string;
        Email: string;
        Address: string;
        Phone: string;
        BusinessNumber: string | null;
        _id: string;
      };
      to: {
        Name: string;
        Email: string;
        Address: string;
        Phone: string;
        Mobile: string | null;
        Fax: string | null;
        _id: string;
      };
      total: {
        subTotal: number;
        tax: number;
        discount: number;
        total: number;
        balance_due: number;
        _id: string;
      };
      __v: number;
    };
    detailInvoices: {
      _id: string;
      masterInvoiceId: string;
      itemName: string;
      rate: number;
      qty: number;
      amount: number;
      __v: number;
    }[];
  };
};