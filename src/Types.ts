type AppUser = {
	id: string
	login: string,
	profile_image_url: string
	display_name: string
}

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

