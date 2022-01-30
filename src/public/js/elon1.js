let elonlist = document.querySelector('.list')


;(async()=>{
    let elonlar = await  request('/56846846818416')
    console.log(elonlar)
    render(elonlar)
})()
    
function render(elonlar){
    let announcement = elonlar.announcement
    let t = announcement.time
    elonlist.innerHTML = `
        <div class="img">
        <span>${announcement.name}</span>
        <span>${announcement.yonalish}</span>
        <img src="${backendApi + announcement.imgUrl}" alt="">
        </div>
        <div class="data">
        <p class="ttle">${announcement.title}</p>
        <p class="info">${announcement.info}</p>
        <p class="time">${t.date+'/'+t.month+'/'+t.year} | ${t.hour + ':' + t.minute}</p>
        <p class="tel">+${announcement.phoneNumber}</p>
        <p class="link"><a href="${announcement.link}">${announcement.link}</a></p>
        <p class="view">${announcement.view}</p>
        </div>
        `
}
