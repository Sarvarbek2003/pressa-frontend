const axios = require('axios')
const { backendApi } = require('../../config.js')
let elon 
let resp





const GET = async(req, res, next) => {
	try{
		
		let options = {
			method: 'GET',
			url: backendApi+'/announcements',
		};

		resp  = await axios.request(options)

		if(!req.postId) res.json(resp.data)
		
		elon = resp.data.users.find(el => el.ID == req.postId)
		
		if (!elon) return

		let similar = resp.data.users.filter(el => el.supkategoriya == elon.supkategoriya)

		let obj = {
			announcement : elon,
			similar: similar
		}
		res.json(obj)
		req.postId = 0
	}catch(error){
		res.json({message: error.message})
	}
}	


module.exports = {
	GET
}
