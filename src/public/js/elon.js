
ok.onsubmit = async event => {
	try {
		event.preventDefault()

		let formData = new FormData()
		
		formData.append('files', fileInput.files[0])
		formData.append('files', img.files[0])
		formData.append('name', lastname.value)
		formData.append('surname', firstname.value)
		formData.append('phoneNumber', tel.value)
		formData.append('kartegoriya', kartegoriya.value)
		formData.append('supkartegoriya', supkartegoriya.value)
		formData.append('title', title.value)
		formData.append('type', type.value)
		formData.append('link', link.value)
		formData.append('info', info.value)
		formData.append('yonalish', yonalish.value)
		formData.append('email', email.value)
		formData.append('date', date.value)
		formData.append('time', time.value)
	
		const response = await request('/auth/register', 'POST', formData)		
	
	} catch(error) {
		errorMessage.textContent = error.message
	}
}