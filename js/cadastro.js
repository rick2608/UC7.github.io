const form = document.getElementById("cadastroForm");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const mostrarSenha = document.getElementById("mostrarSenha");
const mostrarConfirmacao = document.getElementById("mostrarConfirmacao");

const barraForca = document.getElementById("barraForca");
const textoForca = document.getElementById("textoForca");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");


// =====================================================
// MOSTRAR / OCULTAR SENHA
// =====================================================

mostrarSenha.addEventListener("click", () => {

    if (senha.type === "password") {

        senha.type = "text";
        mostrarSenha.textContent = "Ocultar";

    } else {

        senha.type = "password";
        mostrarSenha.textContent = "Mostrar";

    }

});


mostrarConfirmacao.addEventListener("click", () => {

    if (confirmarSenha.type === "password") {

        confirmarSenha.type = "text";
        mostrarConfirmacao.textContent = "Ocultar";

    } else {

        confirmarSenha.type = "password";
        mostrarConfirmacao.textContent = "Mostrar";

    }

});


// =====================================================
// FORÇA DA SENHA
// =====================================================

senha.addEventListener("input", () => {

    const valor = senha.value;

    let forca = 0;

    if (valor.length >= 6) {
        forca++;
    }

    if (valor.length >= 10) {
        forca++;
    }

    if (/[A-Z]/.test(valor)) {
        forca++;
    }

    if (/[0-9]/.test(valor)) {
        forca++;
    }

    if (/[^A-Za-z0-9]/.test(valor)) {
        forca++;
    }


    if (valor.length === 0) {

        barraForca.style.width = "0%";
        textoForca.textContent = "Mínimo de 6 caracteres";

    }

    else if (forca <= 1) {

        barraForca.style.width = "25%";
        textoForca.textContent = "Senha fraca";

    }

    else if (forca <= 3) {

        barraForca.style.width = "50%";
        textoForca.textContent = "Senha média";

    }

    else if (forca === 4) {

        barraForca.style.width = "75%";
        textoForca.textContent = "Senha forte";

    }

    else {

        barraForca.style.width = "100%";
        textoForca.textContent = "Senha muito forte";

    }

});


// =====================================================
// LIMPAR ERROS
// =====================================================

function limparErros() {

    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroSenha.textContent = "";

    nome.classList.remove("input-erro");
    email.classList.remove("input-erro");
    senha.classList.remove("input-erro");
    confirmarSenha.classList.remove("input-erro");

}


// =====================================================
// CADASTRO
// =====================================================

form.addEventListener("submit", (evento) => {

    evento.preventDefault();

    limparErros();


    const nomeValor = nome.value.trim();
    const emailValor = email.value.trim().toLowerCase();
    const senhaValor = senha.value;
    const confirmarValor = confirmarSenha.value;

    const tipoConta = document.querySelector(
        'input[name="tipoConta"]:checked'
    );


    // ==============================
    // VALIDAÇÕES
    // ==============================

    if (nomeValor.length < 3) {

        erroNome.textContent =
            "Digite seu nome completo.";

        nome.classList.add("input-erro");

        nome.focus();

        return;
    }


    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(emailValor)) {

        erroEmail.textContent =
            "Digite um email válido.";

        email.classList.add("input-erro");

        email.focus();

        return;
    }


    if (senhaValor.length < 6) {

        erroSenha.textContent =
            "A senha precisa ter pelo menos 6 caracteres.";

        senha.classList.add("input-erro");

        senha.focus();

        return;
    }


    if (senhaValor !== confirmarValor) {

        erroSenha.textContent =
            "As senhas não são iguais.";

        confirmarSenha.classList.add("input-erro");

        confirmarSenha.focus();

        return;
    }


    if (!tipoConta) {

        alert("Selecione o tipo de conta.");

        return;
    }


    // =====================================================
    // VERIFICAR SE EMAIL JÁ EXISTE
    // =====================================================

    const usuarios =
        JSON.parse(localStorage.getItem("devfinderUsuarios")) || [];


    const emailExiste = usuarios.some(
        usuario => usuario.email === emailValor
    );


    if (emailExiste) {

        erroEmail.textContent =
            "Este email já está cadastrado.";

        email.classList.add("input-erro");

        email.focus();

        return;
    }


    // =====================================================
    // CRIAR USUÁRIO
    // =====================================================

    const novoUsuario = {

        id: Date.now(),

        nome: nomeValor,

        email: emailValor,

        senha: senhaValor,

        tipo: tipoConta.value,

        dataCadastro: new Date().toISOString()

    };


    usuarios.push(novoUsuario);


    localStorage.setItem(
        "devfinderUsuarios",
        JSON.stringify(usuarios)
    );


    // =====================================================
    // LOGIN AUTOMÁTICO
    // =====================================================

    const sessao = {

        id: novoUsuario.id,

        nome: novoUsuario.nome,

        email: novoUsuario.email,

        tipo: novoUsuario.tipo

    };


    localStorage.setItem(
        "devfinderSessao",
        JSON.stringify(sessao)
    );


    // =====================================================
    // REDIRECIONAMENTO
    // =====================================================

    if (novoUsuario.tipo === "desenvolvedor") {

        window.location.href = "desenvolvedor.html";

    } else {

        window.location.href = "cliente.html";

    }

});
