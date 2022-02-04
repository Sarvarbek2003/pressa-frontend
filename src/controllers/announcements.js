const axios = require('axios')
const { backendApi } = require('../../config.js')
let events = []
let firstData = []
let admData = []

const GET = async(req, res, next) => {
	try{
		
		let options = {
			method: 'GET',
			url: backendApi+'/announcements',
		};

		let resp  = await axios.request(options)

		if(resp.data) firstData = resp.data

		if(!req.postId) return res.json(firstData)
		
		let event =  firstData.announs.find(el => el.ID == req.postId)

		if (!event) return
		let similar = firstData.announs.filter(el => el.subcategory == event.subcategory)

		let obj = {
			announcement : event,
			similar: similar
		}

		res.json(obj)
	}catch(error){
		req.postId = 0
		firstData.online = true
		res.json(firstData)
	}
}	

const ALL = async(req, res, next) => {
	try{
		let options = {
			method: 'GET',
			url: backendApi+'/announcements/data',
		};

		let event  = await axios.request(options)
		
		if(event.data) events.announs = event.data
		
        else return res.json(events)

		res.json(events)
	}catch(error){
		res.json(events)
	}
}	


const DATA = async(req, res, next) => {
	try {
		let options = {
			headers: {token: req.headers.token, 'user-agent':req['headers']['user-agent']},
			method: 'GET',
			url: backendApi+'/admin/data',
		};

		let event  = await axios.request(options)

		if(event.data) admData = event.data
		
		return res.json(admData)
	}catch(error) {
		return res.json(true)
	}	
}


module.exports = {
	DATA,
	GET,
	ALL
}
