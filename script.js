var nome = document.getElementById("nomeInput")
var empresa = document.getElementById("empresaInput")
var cargo = document.getElementById("cargoInput")
var email = document.getElementById("emailInput")
var telefone = document.getElementById("telefoneInput")
var salario = document.getElementById("salarioInput")
var tipo = document.getElementById("tipoInput")
var filtroStatus = document.getElementById("filtroStatus")
var btn = document.getElementById("addBtn")
var lista = document.getElementById("lista")

var funcionarios = JSON.parse(localStorage.getItem("hrmasters_funcionarios")) || []
var editandoId = null

function salvarStorage() {
    localStorage.setItem("hrmasters_funcionarios", JSON.stringify(funcionarios))
}

function limparCampos() {
    nome.value = ""
    empresa.value = ""
    cargo.value = ""
    email.value = ""
    telefone.value = ""
    salario.value = ""
    tipo.value = "novo"
}

function renderizar() {
    lista.innerHTML = ""
    var statusSelecionado = filtroStatus.value

    for (var i = 0; i < funcionarios.length; i++) {
        var f = funcionarios[i]

        if (statusSelecionado == "ativo" && f.arquivado) continue
        if (statusSelecionado == "arquivado" && !f.arquivado) continue

        var li = document.createElement("li")
        if (f.tipo == "novo") li.classList.add("tipo-novo")
        if (f.tipo == "promocao") li.classList.add("tipo-promocao")
        if (f.arquivado) li.classList.add("arquivado")

        var span = document.createElement("span")
        var statusTexto = f.arquivado ? " [Arquivado]" : ""
        span.textContent = f.nome + " (" + f.empresa + ") - " + f.cargo + " - " + f.email + " - " + f.telefone + " - R$ " + f.salario + statusTexto

        var acoes = document.createElement("div")
        acoes.className = "acoes"

        var btnEdit = document.createElement("button")
        btnEdit.textContent = "Editar"
        btnEdit.className = "btn-editar"
        btnEdit.dataset.id = f.id

        var btnArq = document.createElement("button")
        btnArq.textContent = f.arquivado ? "Reativar" : "Arquivar"
        btnArq.className = "btn-arquivar"
        btnArq.dataset.id = f.id

        acoes.appendChild(btnEdit)
        acoes.appendChild(btnArq)
        li.appendChild(span)
        li.appendChild(acoes)
        lista.appendChild(li)
    }
}

btn.addEventListener("click", function() {
    if (nome.value == "" || empresa.value == "" || cargo.value == "" || email.value == "" || telefone.value == "" || salario.value == "") {
        alert("Preencha todos os campos!")
        return
    }

    if (editandoId != null) {
        for (var i = 0; i < funcionarios.length; i++) {
            if (funcionarios[i].id == editandoId) {
                funcionarios[i].nome = nome.value
                funcionarios[i].empresa = empresa.value
                funcionarios[i].cargo = cargo.value
                funcionarios[i].email = email.value
                funcionarios[i].telefone = telefone.value
                funcionarios[i].salario = salario.value
                funcionarios[i].tipo = tipo.value
            }
        }
        editandoId = null
        btn.textContent = "Adicionar Funcionário"
        limparCampos()
    } else {
        var novoFuncionario = {
            id: Date.now(),
            nome: nome.value,
            empresa: empresa.value,
            cargo: cargo.value,
            email: email.value,
            telefone: telefone.value,
            salario: salario.value,
            tipo: tipo.value,
            arquivado: false
        }
        funcionarios.push(novoFuncionario)
        limparCampos()
    }

    salvarStorage()
    renderizar()
})

lista.addEventListener("click", function(evento) {
    var id = evento.target.dataset.id
    if (!id) return

    if (evento.target.classList.contains("btn-editar")) {
        for (var i = 0; i < funcionarios.length; i++) {
            if (funcionarios[i].id == id) {
                editandoId = funcionarios[i].id
                nome.value = funcionarios[i].nome
                empresa.value = funcionarios[i].empresa
                cargo.value = funcionarios[i].cargo
                email.value = funcionarios[i].email
                telefone.value = funcionarios[i].telefone
                salario.value = funcionarios[i].salario
                tipo.value = funcionarios[i].tipo
                btn.textContent = "Salvar Alterações"
            }
        }
    }

    if (evento.target.classList.contains("btn-arquivar")) {
        for (var i = 0; i < funcionarios.length; i++) {
            if (funcionarios[i].id == id) {
                funcionarios[i].arquivado = !funcionarios[i].arquivado
            }
        }
        salvarStorage()
        renderizar()
    }
})

filtroStatus.addEventListener("change", renderizar)

renderizar()