
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
      url.value = null
      online  = true
    }else{
        Elurl.style.backgroundImage = "url('addEvent/img/location.svg')";
        url.placeholder = 'Joylashuv maznili'
        url.value = null
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


let datee
let timee
let urll
let firstnamee
let tell
let directionn
let emaill
let aboutt
let descripionn
let textereaa


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


date.onchange = () => {
    if(!(runTime(date.value + 'T23:59').filter >= runTime(new Date().getTime()).filter)){
        alert('O`tib ketgan sanani kiritish mumkin emas')
        date.value = null
    }else {
        datee = true
    }
}

time.onchange = () => {
    if(!(runTime(date.value + 'T' +  time.value).filter >= runTime(new Date().getTime()).filter)){
        alert('O`tib ketgan vaqtni kiritish mumkin emas')
        time.value = null
    } else {
        timee = true
    }
}

url.onkeyup = () => {
    if(!(url.value.startsWith('https://') || (url.value.startsWith('http://'))) ){
        linkText.textContent = 'https:// yoki http://'
        link.style.color = 'red' 
        url.style = 'border: 1px solid red;'
    } else {
        linkText.textContent = null
        url.style.background = 'rgba(255,255,255,0.1)'
        link.style.color = 'white' 
        url.style = 'border: 1px solid tranzistion;'
        urll = true
    }
}

firstname.onkeyup = () => {
    if (firstname.value.length > 50){
        firstname.style.color = 'red',
        firstname.style = 'border: 1px solid red;'
    } else {
        firstname.style = 'border: 1px solid tranzistion;'
        firstnamee = true
    }
}

tel.onkeyup = () => {
    if(tel.value.startsWith('+') || !(tel.value.startsWith('9'))){
        tel.style = 'border: 1px solid red;'
        telVal.textContent = '998 dan boshlanishi kerak + qo`yilmasin'
        telV.style.color = 'red'
    }else {
        tel.style = 'border: 1px solid tranzistion;'
        telVal.textContent = null
        telV.style.color = '#17266e'
        tell = true
    }
}

direction.onkeyup = () => {
    if (direction.value.length > 50){
        direction.style = 'border: 1px solid red;'
    }else {
        direction.style = 'border: 1px solid tranzistion;'
        directionn = true
    }
}

email.onkeyup = () => {
    if (email.value.length > 50){
        email.style.color = 'red',
        email.style = 'border: 1px solid red;'
    } else {
        email.style = 'border: 1px solid tranzistion;'
        emaill = true
    }
}

about.onkeyup = () => {
    if (about.value.length > 150){
        about.style.color = 'red',
        about.style = 'border: 1px solid red;'
    } else {
        about.style = 'border: 1px solid tranzistion;'
        aboutt = true
    }
}

descripion.onkeyup = () => {
    if (descripion.value.length > 170){
        descripion.style.color = 'red',
        descripion.style = 'border: 1px solid red;'
    } else {
        descripion.style = 'border: 1px solid tranzistion;'
        descripionn = true
    }
}

texterea.onkeyup = () => {
    if (texterea.value.length > 250){
        texterea.style.color = 'red',
        texterea.style = 'border: 1px solid red;'
    } else {
        texterea.style = 'border: 1px solid tranzistion;'
        textereaa = true
    }
}


let avatarForm = document.querySelector('.upload-img')
let body = document.querySelector('html')
function check() {
    if(urll && 
        firstnamee && 
        tell && 
        direction && 
        emaill && 
        aboutt && 
        descripionn && 
        textereaa &&
        datee &&
        timee
    ){
        if(!personImgUrl.files[0]){
            avatarForm.style = 'border: 1px solid red;'
            imgPerson.textContent = 'Avatar rasmingizni qo\'ying!'
            imgPerson.style.color = 'red'
            body.scrollTop = 0;
            return false
        }else if(!imgUrl.files[0]){
            mgupload.style = 'border: 1px solid red;'
            body.scrollTop = body.scrollHeight - body.clientHeight - 350;
        } return true
    } else {
        alert('Ma`lumotlarni to`ldirishda xatolik tekshirib qayta urinib ko`ring')
    }
    button.removeAttribute('disabled','disabled')
    return false
}
mgupload.onclick = () => {
    mgupload.style = 'border: 1px solid tranzistion;'
}

avatarForm.onclick = () => {
    imgPerson.textContent = null
    avatarForm.style = 'border: 1px solid tranzistion;'
}

let button = document.querySelector("#confirm")

button.onclick = async() => {
    let chek = check()
    if(!chek) return
    try {
        let formData = new FormData()
        formData.append('imgUrl', imgUrl.files[0])
        formData.append('personImgUrl', personImgUrl.files[0])
        formData.append('name', firstname.value)
        formData.append('phoneNumber', tel.value)
        formData.append('category', category.value)
        formData.append('subcategory', supcategory.value)
        formData.append('title', about.value)
        formData.append('description', descripion.value)
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
        alert(error.message)
    }
}

