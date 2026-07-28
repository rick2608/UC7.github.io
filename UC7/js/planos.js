function escolherPlano(nome, valor) {
    localStorage.setItem('planoNome', nome);
    localStorage.setItem('planoValor', valor);
}

document.addEventListener('DOMContentLoaded', () => {
    const nome = document.getElementById('nome');

    if (nome) {
        nome.textContent = localStorage.getItem('planoNome') || '';
    }

    const valor = localStorage.getItem('planoValor') || '';

    document.querySelectorAll('.valor').forEach(elemento => {
        elemento.textContent = valor;
    });
});

function escolherPlano(nome, valor, periodo) {
    localStorage.setItem('planoNome', nome);
    localStorage.setItem('planoValor', valor);
    localStorage.setItem('planoPeriodo', periodo);
}