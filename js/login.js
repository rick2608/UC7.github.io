const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");
const senha = document.getElementById("senha");

const mostrarSenha = document.getElementById("mostrarSenha");

const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");

const esqueceuSenha =
    document.getElementById("esqueceuSenha");


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


// =====================================================
// LIMPAR ERROS
// =====================================================

function limparErros() {

    erroEmail.textContent = "";
    erroSenha.textContent = "";

    email.classList.remove("input-erro");
    senha.classList.remove("input-erro");

}


// =====================================================
// LOGIN
// =====================================================

loginForm.addEventListener("submit", (evento) => {

    evento.preventDefault();

    limparErros();


    const emailValor =
        email.value.trim().toLowerCase();

    const senhaValor =
        senha.value;


    if (!emailValor) {

        erroEmail.textContent =
            "Digite seu email.";

        email.classList.add("input-erro");

        email.focus();

        return;
    }


    if (!senhaValor) {

        erroSenha.textContent =
            "Digite sua senha.";

        senha.classList.add("input-erro");

        senha.focus();

        return;
    }


    // =====================================================
    // BUSCAR USUÁRIOS
    // =====================================================

    const usuarios =
        JSON.parse(
            localStorage.getItem("devfinderUsuarios")
        ) || [];


    if (usuarios.length === 0) {

        erroEmail.textContent =
            "Nenhuma conta cadastrada.";

        email.classList.add("input-erro");

        return;
    }


    // =====================================================
    // PROCURAR USUÁRIO
    // =====================================================

    const usuario =
        usuarios.find(
            user => user.email === emailValor
        );


    if (!usuario) {

        erroEmail.textContent =
            "Email não encontrado.";

        email.classList.add("input-erro");

        email.focus();

        return;
    }


    // =====================================================
    // VERIFICAR SENHA
    // =====================================================

    if (usuario.senha !== senhaValor) {

        erroSenha.textContent =
            "Senha incorreta.";

        senha.classList.add("input-erro");

        senha.focus();

        return;
    }


    // =====================================================
    // CRIAR SESSÃO
    // =====================================================

    const sessao = {

        id: usuario.id,

        nome: usuario.nome,

        email: usuario.email,

        tipo: usuario.tipo

    };


    localStorage.setItem(
        "devfinderSessao",
        JSON.stringify(sessao)
    );


    // =====================================================
    // REDIRECIONAMENTO
    // =====================================================

    if (usuario.tipo === "desenvolvedor") {

        window.location.href =
            "desenvolvedor.html";

    } else {

        window.location.href =
            "cliente.html";

    }

});


// =====================================================
// ESQUECEU A SENHA
// =====================================================

esqueceuSenha.addEventListener("click", (evento) => {

    evento.preventDefault();


    const emailValor =
        email.value.trim().toLowerCase();


    if (!emailValor) {

        alert(
            "Digite seu email primeiro para recuperar sua senha."
        );

        email.focus();

        return;
    }


    const usuarios =
        JSON.parse(
            localStorage.getItem("devfinderUsuarios")
        ) || [];


    const usuario =
        usuarios.find(
            user => user.email === emailValor
        );


    if (!usuario) {

        alert(
            "Não encontramos uma conta com esse email."
        );

        return;
    }


    /*
        Como ainda não temos backend,
        a recuperação é apenas demonstrativa.
    */

    alert(
        "Conta encontrada!\n\n" +
        "Em uma versão real, um link de recuperação " +
        "seria enviado para seu email."
    );

});
