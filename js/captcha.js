/*captcha*/

generarCaptcha();




function generarCaptcha() {

    let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let codigo = "";



    for (let i = 0; i < 5; i++) {
        let numero = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres.charAt(numero);
    }


    document.querySelector("#textCaptcha").value = codigo;
    let btnVerificar = document.querySelector("#btnVerificar");
    btnVerificar.addEventListener("click", verificarCaptcha);
}





function verificarCaptcha() {
    let ingresoCaptcha = document.querySelector("#ingresoCaptcha");
    let codigo = document.querySelector("#textCaptcha").value;
    if (ingresoCaptcha.value == codigo) {
        document.querySelector("#resultado").innerHTML = "Captcha correcto, consulta enviada";
        agregarConsulta();
    }

    else {
        generarCaptcha();
        document.querySelector("#resultado").innerHTML = "Captcha incorrecto"
    }
}


