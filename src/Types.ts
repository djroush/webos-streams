//Model
type UserType = {
	id: string;
	login: string;
	display_name: string;
	profile_image_url: string;
	offline_image_url: string;
	view_count: number;
}
	
type ClipsType = {
	id: string,
	thumbnail_url: string,
	created_at: string,
	view_count: number
	relative_created_time: string;
}
	
type StateType = {
	User?: UserType;
}

type AppModel = {
	Component?: object,
	State?: StateType,
	Config?: { [key: string]: any }
}

//Components
interface StreamTab {
	props: TabProps;
	playStream: (channel: string, withChat: boolean) => void;
	playVideo: (videoid: number) => void;
}



// State & Props
type AppState = {
	user?: UserType;
	activeTab?: string;
}

type NavHeaderState = {
  active: boolean
}
type TabState = {
  active: boolean
}
//Props
type TabProps = {
  clickListener: (event: React.MouseEvent<any, any>) => void;
  parent?: any;
}
interface NavHeaderProps {
  clickListener: (event: React.MouseEvent<any, any>) => void;
  text: string;
  id: string;
}


