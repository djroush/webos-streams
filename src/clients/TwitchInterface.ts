interface TwitchInterface {
	getUser(username: string, callback: () => void): void;
    getStream(userid: number, callback: () => void): void;
	getVideos(userid: number, callback: () => void): void;
	getClips( userid: number, callback: () => void): void;
}

export default TwitchInterface;