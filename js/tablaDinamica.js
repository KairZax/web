"use strict"
const url = "https://685c7a98769de2bf085cda04.mockapi.io/api/v1/consultas";



let arrayConsultas = [];
rellenarConsultas();


async function rellenarConsultas() {
    arrayConsultas = [];
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            data.forEach(element => {
                arrayConsultas.push(element);
            });

        }
        else {
            console.log("error else");
        }
    }
    catch (error) {
        console.log(error);
    }
}


function imprimirConsultas() {
    let tabla = document.querySelector("#tabla-dinamica");
    tabla.innerHTML = ""

    for (let index = 0; index < arrayConsultas.length; index++) {
        let row = document.createElement("tr");
        let c1 = document.createElement("td");
        c1.innerHTML = arrayConsultas[index].email;
        let c2 = document.createElement("td");
        c2.innerHTML = arrayConsultas[index].consulta;
        let c3 = document.createElement("td");
        let btnEditar = document.createElement("button");
        btnEditar.innerHTML = "Editar"
        c3.appendChild(btnEditar);
        let c4 = document.createElement("td");
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Eliminar"
        c4.appendChild(btnEliminar);

        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);

        let consulta = arrayConsultas[index];

        btnEditar.addEventListener("click", async () => {
            let inputmail = document.querySelector("#email-consulta");
            let inputconsulta = document.querySelector("#texto-consulta");
            let edicion = {
                email: inputmail.value,
                consulta: inputconsulta.value
            };
            try {
                let response = await fetch(`${url}/${consulta.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(edicion)
                });
                if(response.ok){
                await rellenarConsultas();
                imprimirConsultas();
                }
                else{}
            } catch (error) {
                console.error("Error al editar:", error);
            }
        });






        btnEliminar.addEventListener("click", async () => {

            try {
                let response = await fetch(`${url}/${consulta.id}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    console.log(`Consulta ${consulta.id} eliminada`);
                    arrayConsultas.splice(index, 1);
                    imprimirConsultas();
                } else {
                    console.error("No se pudo eliminar");
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
            }


        })

        tabla.appendChild(row);


    }

}


async function agregarConsulta() {
    let mail = document.querySelector("#email-consulta");
    let consulta = document.querySelector("#texto-consulta");

    let nuevo = {
        email: mail.value,
        consulta: consulta.value
    };
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevo)
        });

        if (response.ok) {
            await rellenarConsultas();
            imprimirConsultas();
        }
        else { console.log("no se pudo cargar") }
    }
    catch (error) {
        console.log(error);
    }
}
