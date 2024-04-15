class Cliente {
    constructor(){ //é chamado toda vez que a classe é instanciada
        this.clientes = JSON.parse(localStorage.getItem('tbClientes')) || []
    }
    static fields = ['nome', 'nascimento', 'telefone', 'sistema', 'sexo', 'notificação']

    salva(cliente){
        this.clientes.push(cliente) //o push adiciona no fim do array
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso ✔')
        this.lista() // atualiza a listagem
        document.getElementById('nome').value = ''
        document.getElementById('nascimento').value = ''
        document.getElementById('telefone').value = ''
        document.getElementById('sistema').value = ''
        document.getElementById('notificação').value = ''
        
    }
    lista(){
        const tbody = document.getElementById('listaClientes')
        const linhas = this.clientes.map(cliente => {
            return `
            <tr>
                <td>${cliente.nome}</td>
                <td>${new Date(cliente.nascimento).toLocaleDateString()}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.sistema}</td>
                <td>${cliente.sexo}</td>
                <td>${cliente.notificação}</td>
                
            </tr>
            `
        })
        tbody.innerHTML = linhas.join('')
    }
}
//criando o objeto cliente
const cliente = new Cliente()

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault() //evita que a página seja recarregada
    let valorSexo = ''
    if(document.getElementById('masculino').checked){
        valorSexo = 'masculino'
    } else {
        valorSexo = 'feminino'
    }

    const registro = {
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('nascimento').value,
        telefone: document.getElementById('telefone').value,
        sistema: document.getElementById('sistema').value,
        sexo: valorSexo,
        notificação: document.getElementById('notificação').value
        
    }
    const limparButton = document.getElementById("limpar")
  limparButton.addEventListener("click", function () {
    registroForm.reset()
  })

    
    //salvando os dados
    cliente.salva(registro)
})

//carregar a listagem no momento que carregar a página
window.onload = function(){
    cliente.lista()
}

