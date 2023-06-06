export interface ApiResponse {
  data: {
    success: boolean;
    token: string;
    message: string;
    userRoute: string;
    userLink: string;
    user: {
      userName: string;
      phoneNumber: string;
      userType: "creator" | "brand/agency";
      email: string;
      password: string;
      role: string;
      _id: string;
    };
    data?: any;
  };
}

export interface ApiErrorResponse {
  response: any;
  error: any
}

export interface UploadResponse {
  data: {
    success: boolean;
    token: string;
    message: string;
  };
}

export interface InsertResponse {
  data: {
    success: boolean,
    message: string,
    data: any
  }
}

export interface GetResponse {
  data: {
    success: boolean,
    message: string,
    data: any
  }
}