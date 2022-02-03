let btn = document.querySelector('.btn')
let form = document.querySelector('.form')

btn.onclick = async event => {
	event.preventDefault()
	try {

		let formData = new FormData()

		formData.append('username', usernameInput.value)
		formData.append('password', passwordInput.value)
		
	
		const response = await req('/auth/login', 'POST', formData)
		if (response.status == 200){
			form.innerHTML = null

			errorMessage.textContent = response.message
			errorMessage.style.color = 'green'
			
			const [ inpt, button ] = createElements('input','button')
			
			inpt.plasehoolder = 'kodni kititing'
			button.textContent = 'send'
			
			form.append(inpt,button)
			
			button.onclick = async(event) => {
				event.preventDefault()
				if (inpt.value){
					formData.append('kod', inpt.value)

					const res = await req('/auth/code', 'POST', formData)
					
					if(res.status == 200) {
						window.localStorage.setItem('token', res.token)
						window.location.pathname = '/admin'
					}	
					else errorMessage.textContent = res.message, errorMessage.style.color = 'red'
				
				}
				 else errorMessage.textContent = "Kodni kiriting", errorMessage.style.color = 'red'
			}
		}
	} catch(error) {
		errorMessage.textContent = error.message
	}
} 
