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
  relativePublishedSeconds: number;
  viewCount: number;
  duration: string;
};
type AppClip = {
  id: string;
  thumbnailUrl: string;
  createdDate: Date;
  relativeCreatedTime: string;
  relativeCreatedSeconds: number;
  viewCount: number;
};
