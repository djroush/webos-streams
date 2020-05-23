interface TwitchClient {
	getUser(username: string, callback: (response: any) => void): void;
    getStream(userid: string, callback: (response: any) => void): void;
	getVideos(userid: string, callback: (response: any) => void): void;
	getClips( userid: string, callback: (response: any) => void): void;
}

export default TwitchClient;