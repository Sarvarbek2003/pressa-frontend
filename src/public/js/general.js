// const elBtns = document.querySelectorAll('.tip__btn')
// const elInputSearch = document.querySelector('.nav__input')
// const elFilterSearch = document.querySelector('.filter-search__input')

// document.querySelector('body').addEventListener('click', evt => {

//   if (evt.target.classList.contains('category__select-btn')) {
//     document.querySelector('.category').classList.toggle('category--active')
//   }

//   if(evt.target.classList.contains('category__btn')) {
//     document.querySelector('.filter__category-box').classList.toggle('subcategory--active')
//   }

//   if(evt.target.classList.contains('nav__menu-btn')) {
//     console.log('123');
//     document.querySelector('.nav').classList.toggle('nav__menu--active')
//   }

//   if(evt.target.classList.contains('subcategory__back')) {
//     document.querySelector('.filter__category-box').classList.remove('subcategory--active')
//     document.querySelector('.category').classList.add('category--active')
//   }

//   if (!document.querySelector('.category--active')) {
//     document.querySelector('.filter__category-box').classList.remove('subcategory--active')
//   }
// })

// elBtns.forEach(btn => {
//   btn.addEventListener('click', evt => {
//     elBtns[0].classList.remove('tip__btn--active')
//     elBtns[1].classList.remove('tip__btn--active')

//     btn.classList.add('tip__btn--active')
//   })
// })

// elInputSearch.addEventListener('keyup', evt => {
//   if (elInputSearch.value.trim()) {
//     document.querySelector('body').classList.add('search-input--active')
//   }else if (!elInputSearch.value.trim()) {
//     document.querySelector('body').classList.remove('search-input--active')
//   }
//   elFilterSearch.value = elInputSearch.value
// })

// elFilterSearch.addEventListener('keyup',  evt => {
//   if (elFilterSearch.value.trim()) {
//     document.querySelector('body').classList.add('search-input--active')
//   }else if (!elFilterSearch.value.trim()) {
//     document.querySelector('body').classList.remove('search-input--active')
//   }
//   elInputSearch.value = elFilterSearch.value
// })
