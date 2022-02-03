const settings = document.getElementById('options')
const settingModal = document.querySelector('.option-modal') 
const Check = document.getElementById('check')
const censelBtn = document.getElementById('cencel')
const okBtn = document.getElementById('ok')


settings.addEventListener('click', () => {
    settingModal.classList.toggle('option-modal-active')
})
