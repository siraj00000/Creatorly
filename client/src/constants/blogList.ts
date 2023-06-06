interface BlogImage {
  secureUrl: string;
  publicId: string;
}

export interface BlogTypes {
  _id: string;
  title: string;
  blog: string;
  createdAt: string;
  blog_image: BlogImage;
}
