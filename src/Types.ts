//Twitch Client 
type TwitchUserResponse = {
    data: TwitchUser[]
}
type TwitchUser = {
	id: string;
	login: string;
	display_name: string;
	profile_image_url: string;
	offline_image_url: string;
	view_count: number;
}	
type TwitchVideosResponse = {
    data: TwitchVideo[]
}
type TwitchVideo = {
	id: string,
	thumbnail_url: string,
	published_at: string,
	duration: string,
	view_count: number
	relative_published_time: string;
}
type TwitchClipsResponse = {
    data: TwitchClip[]
}
type TwitchClip = {
	id: string,
	thumbnail_url: string,
	created_at: string,
	view_count: number
	relative_created_time: string;
}


//Internal Model
type AppVideo = {
	id: string
	thumbnail_url: string
	published_date: Date
	relative_published_time: string
	view_count: number 
	duration: string
}
type AppClip = {
	id: string
	thumbnail_url: string
	created_date: Date
	relative_created_time: string
	view_count: number 
}


type AppModel = {
	Config?: AppConfig
}

type AppConfig = {
  twitchClientId: string
  twitchEndpoint: string,
  callbackUrl: string,
  mockTwitch: boolean,
  userAccessToken? : string
}

