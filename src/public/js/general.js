
if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('submit', evt => {
        evt.preventDefault()
    })
}

document.querySelector('.nav__menu-btn').addEventListener('click', evt => {
    document.querySelector('.nav').classList.toggle('nav__menu--active')
})

if (document.querySelector('.nav__input')) {
    const elInputSearch = document.querySelector('.nav__input')

    elInputSearch.addEventListener('keyup', evt => {
    if (elInputSearch.value.trim()) {
        document.querySelector('body').classList.add('search-input--active')
    }else if (!elInputSearch.value.trim()) {
        document.querySelector('body').classList.remove('search-input--active')
    }
    if (document.querySelector('.filter-search__input')) {
        document.querySelector('.filter-search__input').value = elInputSearch.value
    }
    })

    if (document.querySelector('.filter-search__input')) {
        const elFilterSearch = document.querySelector('.filter-search__input')

        elFilterSearch.addEventListener('keyup',  evt => {
          if (elFilterSearch.value.trim()) {
            document.querySelector('body').classList.add('search-input--active')
          }else if (!elFilterSearch.value.trim()) {
            document.querySelector('body').classList.remove('search-input--active')
          }
          elInputSearch.value = elFilterSearch.value
        })
    }
}



