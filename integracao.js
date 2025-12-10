document.getElementById('cadastroForm').addEventListener('submit', criarCliente);
document.getElementById('saqueForm').addEventListener('submit', saqueCliente);
document.getElementById('depositoForm').addEventListener('submit', depositoCliente);

// botoes
document.getElementById('sacarBtn').addEventListener('click', mostrarSaque);
document.getElementById('depositarBtn').addEventListener('click', mostarDeposito);
document.getElementById('transferirBtn').addEventListener('click', mostrarTransferencia);
document.getElementById('cadastrarBtn').addEventListener('click', mostrarCadastro);
document.getElementById('loginBtn').addEventListener('click', mostrarLogin);
document.getElementById('transacaoForm').addEventListener('submit', realizarPix);


document.getElementById('login').style.display = 'none'
document.getElementById('1').style.display = 'grid'
document.getElementById('cadastro').style.display = 'none'
document.getElementById('saque').style.display = 'none'
document.getElementById('deposito').style.display = 'none'
document.getElementById('transacao').style.display = 'none' 


currentCliente = null;

function acessarConta(event)
{
    event.preventDefault()	
    const form = event.target
    const dadosForm = new FormData(form)
    const clienteCpf = dadosForm.get('conta')
    const cliente = Cliente.clientes.find(c => c.cpf == clienteCpf)
 
    if(cliente)
    {
        currentCliente = cliente
        mostrarPrincipal()
        console.log(`Bem vindo, ${currentCliente.nome}`)
    }
}

function criarCliente(event)
{
	event.preventDefault()	
    const form = event.target
    const dadosForm = new FormData(form)
    const nome = dadosForm.get('nome')
    const dataNascimento = dadosForm.get('dataNascimento')
    const agencia_id = 1
    const cpf = dadosForm.get('cpf')
    const cliente = Cliente.cadastrar(nome, dataNascimento, cpf, agencia_id)

    mostrarPrincipal()
    console.log(`Cliente ${cliente.nome} criado com sucesso!`)
}

function saqueCliente(event)
{
	event.preventDefault()	
    const form = event.target
    const dadosForm = new FormData(form)
    const valor = dadosForm.get('valorSaque')
    currentCliente.saque(parseFloat(valor))
    atualizarExtrato(currentCliente)
}

function depositoCliente(event)
{
	event.preventDefault()	
    const form = event.target
    const dadosForm = new FormData(form)
    const valor = dadosForm.get('valorDeposito')
    currentCliente.deposito(parseFloat(valor))
    atualizarExtrato(currentCliente)
}


function mostrarCadastro(){
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'none'
    document.getElementById('cadastro').style.display = 'flex'
    document.getElementById('saque').style.display = 'none'
    document.getElementById('deposito').style.display = 'none'
    document.getElementById('transacao').style.display = 'none'    
    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(currentCliente)
}

function mostrarLogin(){

    if(document.getElementById('acessarBtn'))
        document.getElementById('acessarBtn').remove();

    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'none'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('saque').style.display = 'none'
    document.getElementById('deposito').style.display = 'flex'
    document.getElementById('transacao').style.display = 'none'   
    document.getElementById('login').style.display = 'flex'   


    const selectConta = document.getElementById('conta');
    selectConta.id = 'conta';
    selectConta.name = 'conta';
    selectConta.required = true;
    selectConta.innerHTML = ''; // Limpa opções anteriores

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Escolha uma conta --';
    selectConta.appendChild(defaultOption);

    Cliente.clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.cpf;  
        option.textContent = `${cliente.nome} - CPF: ${cliente.cpf}`;  
        selectConta.appendChild(option);
    });

    document.getElementById('loginForm').appendChild(selectConta); // Append the select to the login section

    //botão 
    const submitButton = document.createElement('button');
    submitButton.type = 'click';
    submitButton.textContent = 'Acessar';
    submitButton.id = 'acessarBtn';
    document.getElementById('loginForm').appendChild(submitButton);
    document.getElementById('loginForm').addEventListener('submit', acessarConta);

    document.querySelector('main').style.alignItems = 'normal'


    atualizarExtrato(currentCliente)
}

function mostrarPrincipal(){

    if(currentCliente == null) return console.log("Nenhum cliente logado")
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'grid'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('saque').style.display = 'flex'
    document.getElementById('deposito').style.display = 'none'
    document.getElementById('transacao').style.display = 'none'    
    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(currentCliente)
}

function mostrarTransferencia(){
    console.log("mostrar transferencia")

    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'grid'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('saque').style.display = 'none'
    document.getElementById('deposito').style.display = 'none'
    document.getElementById('transacao').style.display = 'flex'    
    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(currentCliente)
}

function mostrarSaque(){
    console.log("mostrar saque")
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'grid'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('saque').style.display = 'flex'
    document.getElementById('deposito').style.display = 'none'
    document.getElementById('transacao').style.display = 'none'    
    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(currentCliente)
}

function mostarDeposito(){
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'grid'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('saque').style.display = 'none'
    document.getElementById('deposito').style.display = 'flex'
    document.getElementById('transacao').style.display = 'none'    

    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(currentCliente)
}

function atualizarExtrato(cliente){
    document.getElementById('linhasExtrato').innerHTML = ''
    let extratoHtml = ''

    if(currentCliente == null) return console.log("Nenhum cliente logado")

    cliente.Historico.slice().reverse().forEach(transacao => {
        if(transacao.pessoa2) 
        {
            if(transacao.valor < 0)
            {
                extratoHtml = `Pix para ${transacao.pessoa2.nome}
                <div style="color: red;"><strong>R$${transacao.valor}</strong></div>`
            }

            else if(transacao.valor > 0)
            {
                extratoHtml = `Pix recebido de ${transacao.pessoa2.nome}
                <div style="color: green;"><strong>R$${transacao.valor}</strong></div>`
            }
        }

        else if(transacao.valor < 0 && !transacao.pessoa2)
        {
            extratoHtml = `Saque realizado
            <div style="color: red;"><strong>R$${transacao.valor}</strong></div>`
        }

        else if(transacao.valor > 0 && !transacao.pessoa2)
        {
            extratoHtml = `Deposito realizado
            <div style="color: green;"><strong>R$${transacao.valor}</strong></div>`
        }


        const linha = document.createElement('div')
        linha.className = 'linhaExtrato'  
        linha.innerHTML = extratoHtml
        document.getElementById('linhasExtrato').appendChild(linha)
    });

    console.log(cliente.Saldo)
    const saldo = document.getElementById('saldo_conta')
    saldo.innerHTML = `<span style="font-size: 15px">Saldo Atual:</span> <strong style="color: ${cliente.Saldo >= 0 ? 'green' : 'red'};"> R$${cliente.Saldo}</strong>`
}



function realizarPix(event){
    event.preventDefault()	
    const forma = event.target
    console.log(forma)
    const dadosForm = new FormData(forma)

    let destino = dadosForm.get('destinoPix')
    let valor = dadosForm.get('valorPix')

    // fallback: se o form não tiver name, pegar pelo id
    if (!destino) destino = document.getElementById('destinoPix')?.value || ''
    if (!valor) valor = document.getElementById('valorPix')?.value || ''

    destino = String(destino).trim()
    valor = parseFloat(valor)

    if (!destino) {
        console.log('Destino inválido')
        return
    }

    if (Number.isNaN(valor)) {
        console.log('Valor inválido')
        return
    }

    console.log(destino, valor)
    const clienteDestino = Cliente.clientes.find(c => String(c.cpf) == destino)
    if(clienteDestino)
    {
        if(currentCliente.transferencia(valor, clienteDestino))
            atualizarExtrato(currentCliente)
        else console.log("Falha na transferência")
    }
    else console.log("Cliente não encontrado")
}

