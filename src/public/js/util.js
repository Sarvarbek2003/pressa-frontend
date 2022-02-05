const backendApi = 'http://localhost:5005'      
async function request (route, method, body) {
	let headers = {
		token: window.localStorage.getItem('token')
	}
	
	if( !(body instanceof FormData) ) {
		headers['Content-Type'] = 'application/json'
	}

	let response = await fetch(route, {
		headers,
		method,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})

	if(!(response.status === 200 || response.status === 201)) {
		response = await response.json()
		throw new Error(response.message)
	}

	return await response.json()
}

async function req (route, method, body) {

	let headers = {
		token: window.localStorage.getItem('token')
	}

	if( !(body instanceof FormData) ) {
		headers['Content-Type'] = 'application/json'
	}

	let response = await fetch(backendApi + route, {
		headers,
		method,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})

	if(!(response.status === 200 || response.status === 201)) {
		response = await response.json()
		throw new Error(response.message)
	}

	return await response.json()
}


function createElements (...array) {
	return array.map(el => document.createElement(el))
}


let runTime = (time) => {
	const [date, month, year] = new Date(time).toLocaleDateString("uz-UZ").split("/")
	const [hour, minute] = new Date(time).toLocaleTimeString("uz-UZ").split(/:| /)

	return {
		"datee": `${date.split('-')[0] + '-' + date.split('-')[1].padStart(2,'0') + '-' + date.split('-')[2].padStart(2,'0')}`,
		"time": `${hour.padStart(2, '0') + ':' + minute.padStart(2, '0')}`,
		// "filter": `${date.split('-')[0] + date.split('-')[1].padStart(2,'0') + date.split('-')[2].padStart(2,'0')}`,
		"filter": `${date.split('-')[0] + date.split('-')[1].padStart(2,'0') + date.split('-')[2].padStart(2,'0') + hour.padStart(2, '0') + minute.padStart(2, '0')}`
	}
}
