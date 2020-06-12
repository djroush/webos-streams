type AppUser = {
  id: string;
  login: string;
  profileImageUrl: string;
  displayName: string;
};

type AppVideo = {
  id: string;
  thumbnailUrl: string;
  publishedDate: Date;
  relativePublishedTime: string;
  viewCount: number;
  duration: string;
};
type AppClip = {
  id: string;
  thumbnailUrl: string;
  createdDate: Date;
  relativeCreatedTime: string;
  viewCount: number;
};
