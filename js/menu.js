
/*Mostrar menu*/
let botonMenu= document.querySelector('#boton-menu');
botonMenu.addEventListener("click",mostrarMenu);
let menu=document.querySelector('#menu');


function mostrarMenu(){
    menu.classList.toggle("active");
}

function ocultarMenu(){
    menu.classList.remove("active");
}



