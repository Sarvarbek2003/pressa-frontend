const elBtns = document.querySelectorAll('.tip__btn')
let Elurl = document.querySelector('.filter__input')
let onlinebtn = document.getElementById('#online')
let oflineBtn = document.getElementById('#ofline')
let firstname = document.querySelector('.form__input')
let personImgUrl = document.querySelector('.upload-img .img-upload')
let imgUrl = document.querySelector('.img-box .img-upload')
let events 
let online 
Elurl.addEventListener('keyup', (e) => {
  if (!e.target.value) {
    Elurl.style.backgroundImage = "url('../img/location.svg')";
  } else {
    Elurl.style.backgroundImage = "url('')";
  }
})


elBtns.forEach(btn => {
  btn.addEventListener('click', evt => {
    elBtns[0].classList.remove('tip__btn--active')
    elBtns[1].classList.remove('tip__btn--active')

    btn.classList.toggle('tip__btn--active')

    if (evt.target.id == 'online') {
      Elurl.style.backgroundImage = "url('addEvent/img/icon-internet.svg')";
      url.placeholder = 'Ijtimoiy tarmoq linki'
      online  = true
    }else{
      Elurl.style.backgroundImage = "url('addEvent/img/location.svg')";
      url.placeholder = 'Joylashuv maznilini kiriting'
      online  = false
    }
  })
})

function openNav() {
  document.getElementById("mySidenav").style.width = "70%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

;(async()=>{
    events = await  request('/56846846818416')  // backendan 1- bo`lib keladigan 24 ta malumot tezroq render qilish uchun  
    if (events.online) online = true
    cart(events)
})()


function cart(events){
    category.innerHTML = null
    if(!events.cart) return
    Object.keys(events.cart).forEach(el => {
        const [ option ] = createElements('option')
        option.value = el
        option.textContent = el
        category.append(option)
    })
    category.addEventListener('change', ell =>{
        supcategory.innerHTML = null
            events.cart[category.value].forEach(el => {
                const [ option ] = createElements('option')
                option.value = el
                option.textContent = el
                supcategory.append(option)
            })
        })    
}

let button = document.querySelector("#confirm")

button.onclick = async() => {
    try {
        let formData = new FormData()
        formData.append('imgUrl', imgUrl.files[0])
        formData.append('personImgUrl', personImgUrl.files[0])
        formData.append('name', firstname.value)
        formData.append('phoneNumber', tel.value)
        formData.append('category', category.value)
        formData.append('subcategory', supcategory.value)
        formData.append('title', about.value)
        formData.append('descripion', descripion.value)
        formData.append('online', online)
        formData.append('link', url.value)
        formData.append('info', texterea.value)
        formData.append('direction', direction.value)
        formData.append('email', email.value)
        formData.append('date', date.value)
        formData.append('time', time.value)
        const response = await req('/add', 'POST', formData)
        if (response) modal.className = 'about__modal d-block'
        setTimeout(() => {
            modal.className = 'about__modal d-none'
        }, 5000);
    } catch(error) {
        console.log(error.message)
    }
}

