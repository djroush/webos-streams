export type UserResponse = {
    data: User[]
}
export type User = {
  id: string
  login: string
  display_name: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  [property: string]: string | number
}
export type VideosResponse = {
    data: Video[],
    pagination?: {
      cursor: string
    }
}
export type Video = {
  id: string,
  thumbnail_url: string,
  published_at: string,
  duration: string,
  view_count: number
  [property: string]: string | number
}
export type ClipsResponse = {
    data: Clip[],
    pagination: {
      cursor: string
    }
}
export type Clip = {
  id: string,
  thumbnail_url: string,
  created_at: string,
  view_count: number
  relative_created_time: string;
  [property: string]: string | number
}


export interface Client {
  getUser(username: string, callback: (response: UserResponse) => void): void;
  getVideos(userid: string, callback: (response: VideosResponse) => void): void;
  getClips(userid: string, callback: (response: ClipsResponse) => void): void;
}
