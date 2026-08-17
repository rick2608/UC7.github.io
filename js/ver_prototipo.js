let qty = 1;

const basePrice = 34.90;


/* =========================================
   TROCAR DE PÁGINA
========================================= */

function showPage(id) {

    // Remove a página atual
    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    // Mostra a página escolhida
    document
        .getElementById(id)
        .classList.add("active");


    // Remove o active do menu
    document
        .querySelectorAll(".nav button")
        .forEach(button => {
            button.classList.remove("active");
        });


    // Define qual botão ficará ativo
    const pages = {
        home: 0,
        product: 1,
        tracking: 2
    };

    const index = pages[id];

    document
        .querySelectorAll(".nav button")[index]
        .classList.add("active");
}


/* =========================================
   QUANTIDADE
========================================= */

function changeQty(value) {

    qty += value;

    // Nunca deixa ficar abaixo de 1
    if (qty < 1) {
        qty = 1;
    }

    document
        .getElementById("qty")
        .textContent = qty;

    updatePrice();
}


/* =========================================
   ATUALIZAR PREÇO
========================================= */

function updatePrice() {

    let extras = 0;


    // Procura todos os adicionais selecionados
    document
        .querySelectorAll(".option input:checked")
        .forEach(item => {

            extras += Number(
                item.dataset.price
            );

        });


    const total =
        (basePrice * qty) + extras;


    document
        .getElementById("price")
        .textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");
}


/* =========================================
   ADICIONAIS
========================================= */

document
    .querySelectorAll(".option input")
    .forEach(input => {

        input.addEventListener(
            "change",
            updatePrice
        );

    });


/* =========================================
   FINALIZAR PEDIDO
========================================= */

function finishOrder() {

    // Mostra a página de rastreamento
    showPage("tracking");

}


/* =========================================
   PESQUISA
========================================= */

const search =
    document.getElementById("search");


search.addEventListener(
    "input",
    function () {

        const value =
            this.value
                .toLowerCase()
                .trim();


        document
            .querySelectorAll(".restaurant")
            .forEach(card => {

                const nome =
                    card.innerText
                        .toLowerCase();


                if (
                    nome.includes(value)
                ) {

                    card.style.display =
                        "flex";

                } else {

                    card.style.display =
                        "none";

                }

            });

    }
);