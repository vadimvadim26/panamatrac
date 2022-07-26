export interface User {
	login: string
	password: string
}

export interface Offers {
  name: string
  imageSrc: string
  _id?: string
}
export interface Geosofoffers {
  geo: string
  offer: string
  _id?: string
}

export interface Links {
  user_id: string
  status: string
  domain: string
  domain_id: string
  full_link: string
  sub1: string
  sub2: string
  sub3: string
  campaign_id: string
  stream_b_id: string
  stream_w_id: string
  geo: string
  offer: string
  preland: string
  white: string
}



export interface Prelandings {
  name: string
  geo: string
  offer: string
  avatar: string
  preview_img: string
  preland_link: string
  track_id: string
  _id?: string
}

export interface Camps {
  camp_id: string
  api: string
  url: string
}
