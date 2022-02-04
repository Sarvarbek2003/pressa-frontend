let card_box_div = document.querySelector('.card__box')
let card_detail_div = document.querySelector('.card__detail')

let announs = {}
;(async()=>{
    announs = await  request('/56846846818416')
    render(announs)
})()

function render() {
    let card_top_div = document.createElement('div')
    card_top_div.setAttribute('class', 'card-top')
    card_top_div.innerHTML = `
        <div class="card-top__holder">
            <img class="card-top__img" src="${backendApi + announs.announcement.personImgUrl}" alt="user img" width="60" height="60">
            <div class="card-top__detail">
              <h3 class="card-top__name">${announs.announcement.name}</h3>
                <p class="card-top__job">${announs.announcement.category}/${announs.announcement.subcategory}</p>
            </div>
        </div>
    `

    let card_main_div = document.createElement('div')
    card_main_div.setAttribute('class', 'card-main')
    card_main_div.innerHTML = `
        <div class="card-main__holder">
            <div class="card-wrapper">
              <h5 class="card__box-title">Sana:</h5>
              <div class="card-wrapper__info">
                <span class="card-wrapper__year">${announs.announcement.time.date}/${announs.announcement.time.month}/${announs.announcement.time.year}</span>
                <span class="card-wrapper__time">${announs.announcement.time.hour}:${announs.announcement.time.minute} da</span>
              </div>
            </div>
              <div class="card-wrapper">
                <h5 class="card__box-title">Kuzatish: </h5>
                <a class="card__box-link" href="${announs.announcement.link}">${announs.announcement.link}</a>
              </div>
            </div>
            <div class="card-main__holder">
              <div class="card-wrapper">
                <h5 class="card__box-title">Telefon:</h5>
               <a class="card__box-number" href="tel:+${announs.announcement.phoneNumber}">+${announs.announcement.phoneNumber}</a>
              </div>
            <span class="card__box-watch">${announs.announcement.view}</span>
        </div>
    `

    card_detail_div.setAttribute('class', 'card__detail')
    card_detail_div.innerHTML = `
        <h3 class="card__title">${announs.announcement.title}</h3>
        <p class="card__text">${announs.announcement.info}</p>
        <img class="card__img" src="${backendApi + announs.announcement.imgUrl}" alt="hero img" width="710" height="550">
        <p class="card__quotes">${announs.announcement.info}</p>
        <div class="card-link__box">
            <button class="card-link__btn card-link__share" type="button"></button>
            <button class="card-link__btn card-link__comment" type="button">Izoh: </button>
        </div>
    `

    card_box_div.append(card_top_div, card_main_div)
}

// render()