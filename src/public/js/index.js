let elonlist = document.querySelector('.elonlar')
let str = ""

;(async()=>{
    let elonlar = await  request('/56846846818416')
    console.log(elonlar)
    redner(elonlar)
    filter(elonlar)
})()


function redner(elonlar){
    elonlist.innerHTML = null
    elonlar.users.forEach(elon => {
        elon.online ? str = "Online" : str = "Offline"
        const [div] = createElements('div')
        div.setAttribute('class','list')
        div.innerHTML = `
        <img src="${backendApi+elon.imgUrl}" alt="elon">
                    <div id="tana">
                        <h3 id="title">${elon.title}</h3>
                        <div id="kart">
                            <span>${elon.kategoriya}</span>
                            <span>${elon.supkategoriya}</span>
                        </div>
                        <div id="list-footer">
                            <span id="online">${str}</span>
                            <span>10:00</span>
                            <span>${elon.view}</span>
                        </div>
                    </div>`
        
        elonlist.append(div)
        div.onclick = () => {
            window.location.pathname = '/announcement/' + elon.ID
        }
    });
}
let kartegoriya = document.querySelector('#kartegoriya')
function filter(elonlar){
    kartegoriya.innerHTML = null
    console.log()
    Object.keys(elonlar.cart).forEach(el => {
        const [ option ] = createElements('option')
        option.value = el
        option.textContent = el
        kartegoriya.append(option)
    })
    kartegoriya.addEventListener('change', ell =>{
            supkartegoriya.innerHTML = null
            elonlar.cart[kartegoriya.value].forEach(el => {
                const [ option ] = createElements('option')
                option.value = (el == 1 ? "All" : el)
                option.textContent = (el == 1 ? "All" : el)
                supkartegoriya.append(option)
            })
        })
    
}

// function sup(arg,key){
//     console.log(arg)
//     console.log(key)
    
// }
