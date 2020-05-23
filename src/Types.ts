interface UserType {
	id: string,
	login: string,
	display_name: string,
	profile_image_url: string,
	offline_image_url: string,
	view_count: number
}
	
interface StateType {
	User?: UserType;
}

 interface AppType {
	Component?: object,
	State?: StateType,
	Config?: { [key: string]: any }
}
