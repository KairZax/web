"use strict";
let arrayPestanas = [
      "inicio.html" ,
     "productos.html" ,
     "nosotros.html" 
];
let contenidoMain;
document.addEventListener("DOMContentLoaded", () => {
    let btnInicio = document.querySelector("#btnInicio");
    btnInicio.addEventListener("click", () => {
        cargarMain(0);

    });

    let btnProductos = document.querySelector("#btnProductos");
    btnProductos.addEventListener("click", () => {
        cargarMain(1);

    });

    let btnNosotros = document.querySelector("#btnNosotros");
    btnNosotros.addEventListener("click", () => {
        cargarMain(2);

    });

    contenidoMain = document.querySelector("#contenidoMain");
    cargarMain(0);

})



async function cargarMain(indice) {
    ocultarMenu();
    let pestana = arrayPestanas[indice];

    contenidoMain.innerHTML = "cargando..."
    try {
        let response = await fetch(pestana);
        if (response.ok) {
            let t = await response.text();

            contenidoMain.innerHTML = t;
            if (indice == 2) {
                if (!(document.querySelector("#script-captcha"))) {
                    let script = document.createElement("script");
                    script.src = "js/captcha.js";
                    script.id = "script-captcha";

                    script.onload = () => {
                        if (typeof generarCaptcha === "function"){
                            imprimirConsultas();
                            generarCaptcha();
                        } 
                    };

                    document.body.appendChild(script);
                }
                else {
                    if (typeof generarCaptcha === "function"){ 
                        generarCaptcha();
                        imprimirConsultas();
                    }
                }
            }
        }
        else {
            contenidoMain.innerHTML = "error else";
        }
    }
    catch (error) {
        contenidoMain.innerHTML = error;
    };
};