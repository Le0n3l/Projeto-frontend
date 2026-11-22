var nome = document.getElementById("nomeInput")
var cargo = document.getElementById("cargoInput")
var email = document.getElementById("emailInput")
var telefone = document.getElementById("telefoneInput")
var salario = document.getElementById("salarioInput")
var btn = document.getElementById("addBtn")
var lista = document.getElementById("lista")

var editando = null // guarda o funcionário que está sendo editado

function limparCampos(){
    nome.value = ""
    cargo.value = ""
    email.value = ""
    telefone.value = ""
    salario.value = ""
}

function mostrar(f, span){
    span.textContent = f.nome + " - " + f.cargo + " - " + f.email + " - " + f.telefone + " - R$ " + f.salario
}

btn.addEventListener("click", function(){
    if (nome.value == "" || cargo.value == "" || email.value == "" || telefone.value == "" || salario.value == ""){
        alert("Preencha todos os campos!")
    } else if (editando != null){
        // Atualizar
        editando.f.nome = nome.value
        editando.f.cargo = cargo.value
        editando.f.email = email.value
        editando.f.telefone = telefone.value
        editando.f.salario = salario.value
        mostrar(editando.f, editando.span)
        editando = null
        btn.innerHTML = "Adicionar Funcionário"
        limparCampos()
    } else {
        // Criar
        var f = {
            nome: nome.value,
            cargo: cargo.value,
            email: email.value,
            telefone: telefone.value,
            salario: salario.value
        }
        var li = document.createElement("li");
        var span = document.createElement("span");
        var btnEdit = document.createElement("button")
        var btnDel = document.createElement("button")

        mostrar(f, span)
        btnEdit.innerHTML = "Editar";
        btnDel.innerHTML = "Excluir";

        li.appendChild(span);
        li.appendChild(btnEdit);
        li.appendChild(btnDel);
        lista.appendChild(li);
        limparCampos()

        // Editar: coloca os dados nos campos
        btnEdit.addEventListener("click", function(){
            editando = { f: f, span: span }
            nome.value = f.nome
            cargo.value = f.cargo
            email.value = f.email
            telefone.value = f.telefone
            salario.value = f.salario
            btn.innerHTML = "Salvar Alterações"
        })

        // Excluir: remove o funcionário da lista
        btnDel.addEventListener("click", function(){
            if (editando != null && editando.f == f){
                editando = null
                btn.innerHTML = "Adicionar Funcionário"
                limparCampos()
            }
            li.remove()
        })
    }
})