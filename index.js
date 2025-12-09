document.getElementById('cadastroForm').addEventListener('submit', criarCliente);
document.getElementById('saqueForm').addEventListener('submit', saqueCliente);
document.getElementById('depositoForm').addEventListener('submit', depositoCliente);

// botoes
document.getElementById('sacarBtn').addEventListener('click', mostrarSaque);
document.getElementById('depositarBtn').addEventListener('click', mostarDeposito);
document.getElementById('transferirBtn').addEventListener('click', mostrarTransferencia);
document.getElementById('cadastrarBtn').addEventListener('click', mostrarCadastro);
document.getElementById('loginBtn').addEventListener('click', mostrarLogin);


document.getElementById('login').style.display = 'none'
document.getElementById('1').style.display = 'grid'
document.getElementById('cadastro').style.display = 'none'
document.getElementById('saque').style.display = 'none'
document.getElementById('deposito').style.display = 'none'
document.getElementById('transacao').style.display = 'none' 


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
    hudson.saque(parseFloat(valor))
    atualizarExtrato(hudson)
}

function depositoCliente(event)
{
	event.preventDefault()	
    const form = event.target
    const dadosForm = new FormData(form)
    const valor = dadosForm.get('valorDeposito')
    hudson.deposito(parseFloat(valor))
    atualizarExtrato(hudson)
}


function mostrarCadastro(){
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'none'
    document.getElementById('cadastro').style.display = 'flex'
    document.getElementById('saque').style.display = 'none'
    document.getElementById('deposito').style.display = 'none'
    document.getElementById('transacao').style.display = 'none'    
    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(hudson)
}

function mostrarLogin(){
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

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Escolha uma conta --';
    selectConta.appendChild(defaultOption);

    Cliente.clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente;  
        option.textContent = cliente.nome;  
        selectConta.appendChild(option);
    });

    document.getElementById('login').appendChild(selectConta); // Append the select to the login section



    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(hudson)
}

function mostrarPrincipal(){
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'grid'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('saque').style.display = 'flex'
    document.getElementById('deposito').style.display = 'none'
    document.getElementById('transacao').style.display = 'none'    
    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(hudson)
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
    atualizarExtrato(hudson)
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
    atualizarExtrato(hudson)
}

function mostarDeposito(){
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'grid'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('saque').style.display = 'none'
    document.getElementById('deposito').style.display = 'flex'
    document.getElementById('transacao').style.display = 'none'    

    document.querySelector('main').style.alignItems = 'normal'
    atualizarExtrato(hudson)
}



function atualizarExtrato(cliente){
    document.getElementById('linhasExtrato').innerHTML = ''
    let extratoHtml = ''

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


document.getElementById('transacaoForm').addEventListener('submit', realizarPix);

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
        if(hudson.transferencia(valor, clienteDestino))
            atualizarExtrato(hudson)
        else console.log("Falha na transferência")
    }
    else console.log("Cliente não encontrado")
}


// objetificação do hud

class agencia {
	static countAgencia = 1;
    #nome;
    #endereco;
    #id;
	
    static countAgenciaId(){
        this.countAgencia++;
    }
    
    get Id (){
        return this.#id;
    }

    get Nome(){
        return this.#nome;
    }

    get Endereco(){
        return this.#endereco;
    }  

    constructor (nome, endereco){
        this.#id = this.constructor.countAgencia;
        this.#nome = nome;
        this.#endereco = endereco;
        this.constructor.countAgenciaId();
    }
}


class movimentacao
{
    date; 
    pessoa;
    pessoa2; valor;
    constructor (pessoa, valor, pessoa2 = null)
    {
        this.date = new Date();
        this.pessoa = pessoa,
        this.pessoa2 = pessoa2,
        this.valor = valor
        return this
    }
}

class pessoa {
    nome;
    dataNascimento;
    cpf;

    constructor (nome, dataNascimento, cpf){
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
    }  
}

class Cliente extends pessoa {
    static clientes = [];
    #saldo = 0;
    #agenciaId;
    #movimentacoes = [];


    static cadastrar(nome, dataNascimento, cpf, agencia){
        return new Cliente(nome, dataNascimento, cpf, agencia)
    }


    get Saldo(){
        return this.#saldo;
    }

    set Saldo(valor){
        this.#saldo = valor
     }

    get Agencia(){
        return this.#agenciaId;
    }

    get Historico(){
        return this.#movimentacoes;
    }

    transferencia(valor, outro) 
    {
        if(this == outro) 
            return 'Voce não pode transferir para voce mesmo'
        if(this.Saldo >= valor) {
            outro.Saldo += valor
            this.Saldo += -valor
           
            console.log(`${outro.nome} Recebeu ${valor} de ${this.nome}`)

            this.salvarHistorico(new movimentacao(this, -valor, outro))
            outro.salvarHistorico(new movimentacao(outro, valor, this))
            return true
        }   
        else return console.log("Dinheiro insuficiente")  
    }

    saque(valor)
    {
        if(this.Saldo >= valor){
            this.Saldo += -valor;
            this.salvarHistorico(new movimentacao(this, -valor));
        }
        else console.log("Dinheiro insuficiente")  
    }

    deposito(valor)
    {
        this.Saldo += valor;
        this.salvarHistorico(new movimentacao(this, +valor));
    }
    
    salvarHistorico(idMov)
    {   
        console.log(idMov)
        this.#movimentacoes.push(idMov)
    } 

    constructor (nome, dataNascimento, cpf, agencia){
        super(nome, dataNascimento, cpf);
        this.#saldo = 0;
        this.#movimentacoes = [];
        this.#agenciaId = agencia;
        Cliente.clientes.push(this);
    }
}

agencia1 = new agencia('Bradesco 001', 'Rua Paraiba, 107, Centro - Tres Lagoas/MS')
hudson = new Cliente('hudson', '20/10/2000', 302010, agencia1.Id)
arthur = new Cliente('Artgur', '13/20/2000', 102030, agencia1.Id)
hudson.deposito(1000)
console.log(hudson.Saldo)

hudson.transferencia(5, arthur)
console.log(hudson.Saldo)

hudson.deposito(10)
hudson.saque(10)

console.log(hudson.Historico)

mostrarPrincipal()
atualizarExtrato(hudson)