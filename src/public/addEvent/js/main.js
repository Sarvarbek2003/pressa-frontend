const elBtns = document.querySelectorAll('.tip__btn')
let Elurl = document.querySelector('.filter__input')
let onlinebtn = document.getElementById('#online')
let oflineBtn = document.getElementById('#ofline')


// onlinebtn.addEventListener('click', () => {
//   console.log('online');
// })

// oflineBtn.addEventListener('click', () => {
//   console.log('ofline');
// })

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
      Elurl.style.backgroundImage = "url('../img/icon-internet.svg')";
    }else{
      Elurl.style.backgroundImage = "url('../img/location.svg')";
    }
  })
})



function openNav() {
  document.getElementById("mySidenav").style.width = "70%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

