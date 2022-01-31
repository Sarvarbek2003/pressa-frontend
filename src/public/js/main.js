let button = document.querySelector('.hero__more-box')
let list = document.querySelector('.hero__list')
let str = ""
let elonlar = []	

;(async()=>{
    elonlar = await  req('/56846846818416')
    console.log(elonlar)
    pagination(elonlar)
    filter(elonlar)
})()


function redner(elonlar, klyuch){
    if (!klyuch) list.innerHTML = null
    if(!elonlar.users) return
    elonlar.users.forEach(elon => {
        let t = elon.time
        elon.online == "true" ? str = "Online" : str = "Offline"
        const [li] = createElements('div')
        li.setAttribute('class','hero__item')
        li.innerHTML = `
        <div class="hero__item-box">
            <img src="${backendApi + elon.imgUrl}" alt="" class="hero__img">
            <h3 class="hero__title">${elon.title}</h3>
            <div class="hero__date-box">
                <span class="hero__date">${t.date+'/'+t.month+'/'+t.year} | <span class="hero__hour"> ${t.hour + ':' + t.minute}</span>
                </span>
                <span class="hero__tip hero__tip--${str.toLowerCase()}">${str}</span>
            </div>
            <div class="hero__bottom">
                <div class="hero__profile-box">
                    <img src="${backendApi + elon.personImgUrl}" alt="" class="hero-profile__img">
                    <div class="hero__title-box">
                        <h4 class="hero-profile__title">${elon.name}</h4>
                        <p class="hero-profile__text">${elon.kartegoriya}/${elon.supkartegoriya}</p>
                    </div>
                </div>
                <span class="hero__view">${elon.view}</span>
            </div>
        </div>`
        
        list.append(li)
        li.onclick = () => {
            window.location.pathname = '/announcement/' + elon.ID
        }
    });
}

function pagination(elonlar){
	let limit = 12
	let page = 1
	if(!elonlar.users) return
	const paginated = elonlar.users.slice(page * limit - limit, limit * page)
	// paginated.sort((a,b) =>  a.time.filter - b.time.filter)
	redner({users: paginated},false)
	button.onclick = () => {
		page+=1
		const paginated = elonlar.users.slice(page * limit - limit, limit * page)
		// paginated.sort((a,b) =>  a.time.filter - b.time.filter)
		redner({users: paginated},true)
	}
}

cart.onclick = () =>{
	let categori = document.querySelector('.category')
	let subl = document.querySelector('.subcategory')
	categori.classList.toggle('category--active')
	
	subl.classList.remove('subcategory--active')
} 

let continer = document.querySelector('.category__dropdown')
function filter(elonlar){
    continer.innerHTML = null
    if(!elonlar.cart) return
	const [ div ] = createElements('div')
	div.setAttribute('class','category__dropdown-box')
    Object.keys(elonlar.cart).forEach(el => {
        const [ button, span ] = createElements('button','span')
		span.setAttribute('class','category__count')
		button.setAttribute('class', 'category__btn')
		span.textContent = elonlar.cart[el].length
		button.value = el
		button.textContent = el
        button.append(span)
        div.append(button)
		button.onclick = () => {
			sub(el)
			let subl = document.querySelector('.subcategory')
			subl.classList.remove('subcategory--active')
			subl.classList.toggle('subcategory--active')
		}
    })
	continer.append(div)
}

let subList =  document.querySelector('.subcategory__list')
function sub(el){
	subList.innerHTML = null
	elonlar.cart[el].forEach(el => {
		const [ li, button ] = createElements('li','button')
		li.setAttribute('class','subcategory__item')
		button.setAttribute('class','subcategory__btn')
		button.textContent = el
		li.append(button)
		subList.append(li)
		li.onclick = () => {
			let categori = document.querySelector('.category')
			let subl = document.querySelector('.subcategory')
			categori.classList.toggle('category--active')
			subl.classList.toggle('subcategory--active')
			cart.value = el
			cart.textContent = el
		}	
	})
}




