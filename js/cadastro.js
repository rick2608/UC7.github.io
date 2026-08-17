let destino = "";

function abrirPagina() {
    if (document.getElementById("check1").checked) {
        document.getElementById("check2").checked = false;
        destino = "cliente.html";
    }

    if (document.getElementById("check2").checked) {
        document.getElementById("check1").checked = false;
        destino = "desenvolvedor.html";
    }
}

function irParaPagina() {
    if (destino) {
        window.location.href = destino;
    }
}
