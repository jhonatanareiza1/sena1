const abrirMenu = document.querySelector('.abrirMenu');
const cerrarMenu = document.querySelector('.cerrarMenu');
const aside = document.querySelector('.aside');
const merchant = document.querySelector('.merch');

abrirMenu.addEventListener('click', () => {
    aside.classList.add('aside-visible');
});

cerrarMenu.addEventListener('click', () => {
    aside.classList.remove('aside-visible');
});

merch.forEach(boton => boton.addEventListener('click', () => {
   aside.classList.remove('aside-visible'); 
}))