type CampaignStats = {
  startDate: string;
  endDate: string;
  totalBudget: number;
  count: number;
};

export type AdminStatsData = {
  creatorUsersCount: number;
  brandAgencyUsersCount: number;
  singleCreatorCampaignCount: CampaignStats[];
  multiCreatorCampaignCount: CampaignStats[];
  totalCompletedCampaignCount: number | string;
  totalBudget: number;
  totalBudgetByInterval: CampaignStats[];
};

export type AdminStatisticsLoaderResponse = {
  success: boolean;
  data: AdminStatsData;
};

export type CreatorStatsData = {
  revenueEarned: number;
  totalCampaigns: number;
  pendingPayments: number;
};

export type CreatorStatisticsLoaderResponse = {
  success: boolean;
  data: BrandStatsData;
};

export type BrandStatsData = {
  totalCampaignsExecuted: number;
  totalProposals: number;
  totalCampaignsPending: number;
};

export type BrandStatisticsLoaderResponse = {
  success: boolean;
  data: BrandStatsData;
};
