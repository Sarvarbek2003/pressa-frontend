const list = document.querySelector('.list__menu')
const btns = document.querySelectorAll('.lists__btn')

let data

async function fech(){
    data = await request('/admin/data')   // frond end serverga so`rov 
    if(data == true) window.location = '/'
}

fech()
render('pending')

btns[0].value = 'pending'
btns[1].value = 'accepted'
btns[2].value = 'rejected'

btns.forEach(el => {
    el.onclick = () => {
        btns[0].classList.remove('active-btn')
        btns[1].classList.remove('active-btn')
        btns[2].classList.remove('active-btn')
        el.classList.add('active-btn')
        render(el.value)
    }
})

function render(result){
    list.innerHTML = null
   if (!data) return
    data.forEach(el => {
        const [ li, div, input, img, span, h3, p, a, div2, btn, btn2 ] = createElements('li', 'div','input','img','span','h3','p','a','div','button','button')
        if(el.result.toLowerCase() == result.toLowerCase()){
            li.className = 'menu__card card'
            div.className = 'card__wrapper'
            input.className = 'card__checkbox'
            input.setAttribute('type', 'checkbox')
            input.setAttribute('name', 'checkbox')
            input.setAttribute('id', 'checkbox')

            img.src = backendApi + el.personImgUrl
            img.className = 'card__img'
            img.setAttribute('width', '60')
            img.setAttribute('height', '60')

            span.className = 'text__wrapper'
           
            h3.className = 'card__title'
            p.className = 'card__text'
            a.className = 'card__link'
            a.setAttribute('href', 'tel:+' + el.phoneNumber)

            h3.textContent = el.title
            p.textContent = el.name
            a.textContent = '+' + el.phoneNumber

            div2.className = 'button__wraper wrapper'


            btn.id = 'ok'
            btn.textContent =  'Tasdiqlash'
            btn.className = 'wrapper__btn ok-btn'
            
            btn2.id = 'cancel' 
            btn2.textContent =  'Bekor qilish'
            btn2.className = 'wrapper__btn cencel-btn' 

            if(result.toLowerCase() == 'pending') div2.append(btn,btn2)
            else if (result.toLowerCase() == 'accepted') div2.append(btn2)
            else div2.append(btn)
             

            btn.onclick = () => {
                fech()
                li.remove()
                update(el.ID, (btn.id == 'ok'? 'accepted' : 'rejected') )
            }
            btn2.onclick = () => {
                fech()
                li.remove()
                update(el.ID, (btn2.id == 'ok'? 'accepted' : 'rejected') )
            }
            btn.onmouseover = () =>  btn.style.background = "green"
            btn.onmouseout = () => btn.style.background = "#526eff"

            btn2.onmouseover = () =>  btn2.style.background = "red"
            btn2.onmouseout = () => btn2.style.background = "transparent"
            
            div.onclick = () => {
                window.open('https://pressauz.herokuapp.com/announcement/'+el.ID, '_blank')
                li.style.background = 'rgba(165, 179, 250, 0.2)'
            }

            span.append(h3,p,a)
            div.append(input,img,span)
            li.append(div,div2)
            list.append(li)

        }
    })
}

async function update(ID, result){
    let btnss = document.querySelectorAll('#cancel, #ok')
    btnss.forEach(bt => {
        bt.setAttribute('disabled','disabled')  // Ushbu funcsiya serverga zapros borganda  -->
    })                                          //--> undan repsnse qaytguncha buttonlarni o`chirib turadi
    let formData = new FormData()

    formData.append('ID', ID)
    formData.append('result', result)

    let res = await req('/admin/update','PUT', formData)
    if(res.messag == 'OK'){
        setTimeout(() => {
            btnss.forEach(bt => {
                bt.removeAttribute('disabled','disabled') // serverdan respnse qaytganida buttonlar yonadi
            })
        }, 2000);
    } else { 
        alert('Xatolik yuz berdi qaytadan urining')
    }
}

/// bu funksiyada serverdan response qaymagan xolda buttonlarni yoqib qo`yadi
function disabled(){
    let btnss = document.querySelectorAll('#cancel, #ok')
    btnss.forEach(bt => {
        bt.removeAttribute('disabled','disabled')
    })
}

setInterval(() => {
    disabled()   // funksiya set interval orqali chaqirilib turiladi
    fech()       // yangi malumot olib keladi
}, 5000);
