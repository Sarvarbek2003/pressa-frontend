const axios = require('axios')
const { backendApi } = require('../../config.js')
let elon 
let resp





const GET = async(req, res, next) => {
	try{
		let headers = req.headers
		
		let options = {
			headers,
			method: 'GET',
			url: backendApi+'/announcements',
		};

		resp  = await axios.request(options)

		if(!req.postId) res.json(resp.data), next()
		
		elon = resp.data.users.find(el => el.ID == req.postId)
		
		req.postId = 0

		if (!elon) return

		let similar = resp.data.users.filter(el => el.supkategoriya == elon.supkategoriya)

		let obj = {
			announcement : elon,
			similar: similar
		}
		next()
		res.json(obj)
	}catch(error){
		req.postId = 0
		res.json({message: error.message})
	}
}	


module.exports = {
	GET
}
