//Alerta de Producto Agregado al Carrito

const btnSend = document.getElementById(`btn-agregar`);

const send = () => {
    btnSend.addEventListener(`click`, () => {
        Swal.fire("Producto Agregado", "El producto fue agregado correctamente", "success");
    });
};

send();

