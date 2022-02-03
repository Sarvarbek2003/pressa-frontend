let button = document.querySelector('.hero__more-box')
let list = document.querySelector('.hero__list')
let body = document.querySelector('body')
let categori = document.querySelector('.category')
let subl = document.querySelector('.filter__category-box')
let searchIput = document.querySelector('.nav__input')
let str = ""
let events = []	
let allevents = []	
let online = false

;(async()=>{
	events = await  request('/56846846818416')  // backendan 1- bo`lib keladigan 24 ta malumot tezroq render qilish uchun  
	if (events.online) online = true
	pagination(events)
	filter(events)
})()

;(async()=>{
	allevents = await request('/56846846818416/all') // backend serverdan keladigan 2 - malumot bu orqa fonda keladi va bunda keluvchi malumolar soni cheklanmagan -->
})()												 // --> bu yerdagi barcha malumotlardan filter qilishdan foydalaniladi shunda databazafagi barcha berilgan elonlar filter qilib olinadi


document.querySelector('.filter__form').addEventListener('submit', evt => {
	evt.preventDefault()
})

let photo = 'https://picsum.photos/400' 
let ph = ''
let pImg = ''
function redner(events, klyuch){
    if (!klyuch) list.innerHTML = null
    if(!events.users) return
    events.users.forEach(event => {
        let t = event.time
        event.online == "true" ? str = "Online" : str = "Offline"
		if (online) {
			ph = photo					// BU funksiya backend uzilib qolganida undan keladigan -->
			pImg = photo				// --> rasmlarni statik rasmlarga almashtirib turadi textni malumotlar --> 
		}								// --> frond end serverimiz eski xotirasidan keladi 
		else {
			ph = backendApi + event.imgUrl 
			pImg = backendApi + event.personImgUrl
		}
        const [li] = createElements('div')
        li.setAttribute('class','hero__item')
        li.innerHTML = `
        <div class="hero__item-box">
            <img src="${ph}" alt="" class="hero__img">
            <h3 class="hero__title">${event.title}</h3>
            <div class="hero__date-box">
                <span class="hero__date">${t.date+'/'+t.month+'/'+t.year} | <span class="hero__hour"> ${t.hour + ':' + t.minute}</span>
                </span>
                <span class="hero__tip hero__tip--${str.toLowerCase()}">${str}</span>
            </div>
            <div class="hero__bottom">
                <div class="hero__profile-box">
                    <img src="${pImg}" alt="" class="hero-profile__img">
                    <div class="hero__title-box">
                        <h4 class="hero-profile__title">${event.name}</h4>
                        <p class="hero-profile__text">${event.kartegoriya}/${event.supkartegoriya}</p>
                    </div>
                </div>
                <span class="hero__view">${event.view}</span>
            </div>
        </div>`
        
        list.append(li)
        li.onclick = () => {
            window.location.pathname = '/announcement/' + event.ID
        }
    });
}

function pagination(events){
	let limit = 12
	let page = 1
	if(!events.users) return
	const paginated = events.users.slice(page * limit - limit, limit * page)
	redner({users: paginated},false)
	button.onclick = () => {
		page+=1
		console.log('salom')
		const paginated = allevents.slice(page * limit - limit, limit * page)
		redner({users: paginated},true)
	}
}

let cart = document.querySelector('.category__select-btn')
cart.onclick = (event) =>{
	event.preventDefault()
	categori.classList.toggle('category--active')
	subl.classList.remove('subcategory--active')
} 

let continer = document.querySelector('.category__dropdown')
function filter(events){
    continer.innerHTML = null
    if(!events.cart) return
	const [ div ] = createElements('div')
	div.setAttribute('class','category__dropdown-box')
    Object.keys(events.cart).forEach(el => {
        const [ button, span ] = createElements('button','span')
		span.setAttribute('class','category__count')
		button.setAttribute('class', 'category__btn')
		span.textContent = events.cart[el].length
		button.value = el
		button.textContent = el
        button.append(span)
        div.append(button)
		button.onclick = () => {
			sub(el)
			subl.classList.toggle('subcategory--active')
		}
    })
	continer.append(div)
}

let subList =  document.querySelector('.subcategory__list')
function sub(el){
	subl.classList.remove('subcategory--active')
	subList.innerHTML = null
	const [ li ] = createElements('li')
	li.classList.add('subcategory__item')
	li.innerHTML = `
		<button class="subcategory__btn subcategory__back">
	  		<svg class="subcategory__back-svg" width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.292893 7.27239C-0.0976311 7.66291 -0.0976311 8.29607 0.292893 8.6866L6.65685 15.0506C7.04738 15.4411 7.68054 15.4411 8.07107 15.0506C8.46159 14.66 8.46159 14.0269 8.07107 13.6363L2.41421 7.97949L8.07107 2.32264C8.46159 1.93211 8.46159 1.29895 8.07107 0.908424C7.68054 0.5179 7.04738 0.5179 6.65685 0.908424L0.292893 7.27239ZM1 8.97949H31.5572V6.97949H1V8.97949Z" fill="#17266E"/>
			</svg>
		</button>`
	subList.append(li)
	li.onclick = () => {
		subl.classList.toggle('subcategory--active')
		categori.classList.add('category--active')
	}
	events.cart[el].forEach(el => {
		const [ li, button ] = createElements('li','button')
		li.setAttribute('class','subcategory__item')
		button.setAttribute('class','subcategory__btn')
		button.textContent = el
		li.append(button)
		subList.append(li)
		li.onclick = () => {
			categori.classList.toggle('category--active')
			subl.classList.toggle('subcategory--active')
			cart.value = el
			cart.textContent = el
		}	
	})
}




body.onclick = (evt) =>{ 
	if (!evt.target.classList.contains('category__select-btn') && 
		!evt.target.classList.contains('category__btn') && 
		!evt.target.classList.contains('subcategory__btn') && 
		!evt.target.classList.contains('category__dropdown') && 
		!evt.target.classList.contains('subcategory__list') && 
		!evt.target.classList.contains('category__count') && 
		!evt.target.classList.contains('subcategory__item') &&
		!evt.target.classList.contains('subcategory__back-svg') 
	) {
		categori.classList.remove('category--active')
		subl.classList.remove('subcategory--active')
	}
}


