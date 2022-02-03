// let ok = document.querySelector('.button #ok')

ok.onclick = async event => {
	console.log('salom')
	try {
		event.preventDefault()
		
		let formData = new FormData()
		
		formData.append('imgUrl', fileInput.files[0])
		formData.append('personImgUrl', img.files[0])
		formData.append('name', firstname.value)
		formData.append('phoneNumber', tel.value)
		formData.append('kartegoriya', kartegoriya.value)
		formData.append('supkartegoriya', supkartegoriya.value)
		formData.append('title', tt.value)
		formData.append('descripion', descripion.value)
		formData.append('online', type.value)
		formData.append('link', link.value)
		formData.append('info', info.value)
		formData.append('yonalish', yonalish.value)
		formData.append('email', email.value)
		formData.append('date', date.value)
		formData.append('time', time.value)
		const response = await req('/add', 'POST', formData)
		// if (response.message)
	} catch(error) {
		console.log(error.message)
	}
}