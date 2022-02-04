let button = document.querySelector('.hero__more-box')
let list = document.querySelector('.hero__list')
let body = document.querySelector('body')
let categori = document.querySelector('.category')
let subl = document.querySelector('.filter__category-box')
let str = ""
let events = []
let allevents = []	
let online = false

;(async()=>{
	events = await  request('/56846846818416')  // backendan 1- bo`lib keladigan 24 ta malumot tezroq render qilish uchun  
	if (events.online) online = true
	console.log(events.online)
	pagination(events)
	filter(events)
})()

;(async()=>{
	allevents = await request('/56846846818416/all')  // backend serverdan keladigan 2 - malumot bu orqa fonda keladi va bunda keluvchi malumolar soni cheklanmagan -->
	// console.log(allevents)
})()												  // --> bu yerdagi barcha malumotlardan filter qilishdan foydalaniladi shunda databazafagi barcha berilgan elonlar filter qilib olinadi

document.querySelector('.filter__form').addEventListener('submit', evt => {
	evt.preventDefault()
})

let photo = './img/static.jpg'                  		// bu rasmlar static backend o`chganda undan keladigan rasmlarnig o`rniga qo`yadi
let pPhoto = './img/user-profile-svgrepo-com.svg' 		// BU funksiya backend uzilib qolganida undan keladigan -->
														// --> frond end serverimiz eski xotirasidan oladi 

function redner(events, klyuch){
    if (klyuch == 1) list.innerHTML = null
    if(!events.announs) return
    events.announs.forEach(event => {
        let t = event.time
        const [li] = createElements('div')
        li.setAttribute('class','hero__item')
        li.innerHTML = `
        <div class="hero__item-box">
            <img src="${online ? photo : backendApi + event.imgUrl}" alt="" class="hero__img">
            <h3 class="hero__title">${event.title}</h3>
            <div class="hero__date-box">
                <span class="hero__date">${t.date+'/'+t.month+'/'+t.year} | <span class="hero__hour"> ${t.hour + ':' + t.minute}</span>
                </span>
                <span class="hero__tip hero__tip--${event.online == 'true' ? 'online' : 'offline'}">${event.online == 'true' ? 'Online' : 'Offline'}</span>
            </div>
            <div class="hero__bottom">
                <div class="hero__profile-box">
                    <img src="${online ? pPhoto : backendApi + event.personImgUrl}" alt="" class="hero-profile__img">
                    <div class="hero__title-box">
                        <h4 class="hero-profile__title">${event.name}</h4>
                        <p class="hero-profile__text">${event.category}/${event.subcategory}</p>
                    </div>
                </div>
                <span class="hero__view">${event.view}</span>
            </div>
        </div>`
        
        list.append(li)
        li.onclick = async() => {
            window.location.pathname = '/announcement/' + event.ID
			let views = JSON.parse(window.localStorage.getItem('views')) ? JSON.parse(window.localStorage.getItem('views')) : []
			if( !(views.includes(event.ID)) ) {
				views.push(event.ID)
				window.localStorage.setItem('views', JSON.stringify(views))
				await req('/views', 'PUT', {postId: event.ID})
			}
		}
    });
}
redner(events,2)
function pagination(events = allevents, klyuch){
	let limit = 12
	let page = 1
	if(!events.announs) return
	const paginated = events.announs.slice(page * limit - limit, limit * page)
	redner({announs: paginated}, klyuch)
	button.onclick = () => {
		page+=1
		const paginated = events.announs.slice(page * limit - limit, limit * page)
		redner({announs: paginated},2)
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
			filterKategoriya(el)
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


date.addEventListener('change', event => {
	if(date.value == 'undefined') return
	filterDate(date.value)
})

onlinee.addEventListener('click', event => {
	let online = 'true'
	onoff(online)
})

ofline.addEventListener('click', event => {
	let ofline = 'false'
	onoff(ofline)
})

let resultData = {
	announs: []
}
function filterDate(dateValue) {
	if(dateValue) {
		resultData.announs = []
		let day = dateValue.split('-')
		console.log(allevents)
		events.announs.forEach(event => {
			if( +event.time.year == +day[0] && +event.time.month == +day[1] && +event.time.date == +day[2] ) {
				resultData.announs.push(event)
			}
		})
		
		resultData.announs.sort( function (x, y) {
			let a = new Date(x.time.year, x.time.month - 1, x.time.date, x.time.hour, x.time.minute)
			let b = new Date(x.time.year, x.time.month - 1, x.time.date, x.time.hour, x.time.minute)
			return a - b
		} )
		return pagination(resultData, 1)
	}
}

let resultData2 = {
	announs: []
}
function filterKategoriya(supkateg) {
	resultData2.announs = []
	if(supkateg && resultData.announs.length > 0) {
		resultData.announs.forEach( event => {
			if(event.subcategory.toLowerCase() == supkateg.toLowerCase()) {
				resultData2.announs.push(event)
			}
		})
		return pagination(resultData2, 1)
	} else if(supkateg) {
		events.announs.forEach( event => {
			if(event.subcategory.toLowerCase() == supkateg.toLowerCase()) {
				resultData2.announs.push(event)
			}
		})
		return pagination(resultData2, 1)
	}
}

let resultData3 = {
	announs: []
}
function onoff(online) {
	if(online == 'true' && resultData2.announs.length > 0) {
		resultData3.announs = []
		resultData2.announs.forEach( event => {
			if(event.online == 'true') {
				resultData3.announs.push(event)
				
			}
		})
		return pagination(resultData3, 1)
	}
	else if(online == 'true' && resultData.announs.length > 0) {
		resultData3.announs = []
		resultData.announs.forEach( event => {
			if(event.online == 'true') {
				resultData3.announs.push(event)
				
			}
		})
		return pagination(resultData3, 1)
	}
	else if(online == 'false' && resultData2.announs.length > 0) {
		resultData3.announs = []
		resultData2.announs.forEach( event => {
			if(event.online == 'false') {
				resultData3.announs.push(event)
				
			}
		})
		return pagination(resultData3, 1)
	}
	else if(online == 'false' && resultData.announs.length > 0) {
		resultData3.announs = []
		resultData.announs.forEach( event => {
			if(event.online == 'false') {
				resultData3.announs.push(event)
				
			}
		})
		return pagination(resultData3, 1)
	}
	else if(online == 'false') {
		resultData3.announs = []
		list.innerHTML = null
		events.announs.forEach( event => {
			if(event.online == 'false') {
				resultData3.announs.push(event)
				
			}
		})
		return pagination(resultData3, 1)
	}
	else if(online == 'true') {
		resultData3.announs = []
		list.innerHTML = null
		events.announs.forEach( event => {
			if(event.online == 'true') {
				resultData3.announs.push(event)
				
			}
		})
		return pagination(resultData3, 1)
	}
	else {
		resultData3.announs = []
		return pagination(resultData3, 1)
	}
}
let filter_speaker = document.querySelector('#filter-speaker')
let resultData4 = {
	announs: []
}

filter_speaker.addEventListener('keyup', event => {
	if(resultData3.announs.length > 0 && filter_speaker.value) {
		resultData4.announs = []
		resultData3.announs.forEach( event => {
			if(event.name.toLowerCase().includes(filter_speaker.value.toLowerCase())) {
				resultData4.announs.push(event)
			}
		})
		return pagination(resultData4, 1)
	}
	else if(resultData2.announs.length > 0 && filter_speaker.value) {
		resultData4.announs = []
		resultData2.announs.forEach( event => {
			if(event.name.toLowerCase().includes(filter_speaker.value.toLowerCase())) {
				resultData4.announs.push(event)
			}
		})
		return pagination(resultData4, 1)
	}
	else if(resultData.announs.length > 0 && filter_speaker.value) {
		resultData4.announs = []
		resultData.announs.forEach( event => {
			if(event.name.toLowerCase().includes(filter_speaker.value.toLowerCase())) {
				resultData4.announs.push(event)
			}
		})
		return pagination(resultData4, 1)
	}
	else if(events.announs.length > 0 && filter_speaker.value) {
		resultData4.announs = []
		events.announs.forEach( event => {
			if(event.name.toLowerCase().includes(filter_speaker.value.toLowerCase())) {
				resultData4.announs.push(event)
			}
		})
		return pagination(resultData4, 1)
	}
	else {
		resultData4.announs = []
		return pagination(resultData4, 1)
	}
})

let resultData5 = {
	announs: []
}
generalSearch.addEventListener('keyup', event => {
	resultData5.announs = []
	if(generalSearch.value) {
		events.announs.forEach( event => {
			if(event.name.toLowerCase().includes(generalSearch.value.toLowerCase()) || event.title.toLowerCase().includes(generalSearch.value.toLowerCase())) {
				resultData5.announs.push(event)
			}
		})
		return pagination(resultData5, 1)
	}
})
