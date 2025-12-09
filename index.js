// // anexação do js com html do kenzo

// const formulario = document.getElementById("forms")

// formulario.addEventListener('submit', function (cadastro){
//     cadastro.preventDefault

//     const dadosFormulados = new FormData(formulario)

//     const objetoPuro = Object.fromEntries(dadosFormulados.entries())

//     const jsonString = JSON.stringify(objetoPuro, null, 2)


// })

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

function mostrarPrincipal(){
    document.getElementById('login').style.display = 'none'
    document.getElementById('1').style.display = 'grid'
    document.getElementById('cadastro').style.display = 'none'
    document.getElementById('sacar').style.display = 'none'
    document.getElementById('deposito').style.display = 'none'
    document.getElementById('cadastro').style.display = 'none'
 
    document.getElementById('main').style.backgroundColor = 'red'

}

document.getElementById('cadastroForm').addEventListener('submit', criarCliente);
document.getElementById('login').style.display = 'none'
document.getElementById('1').style.display = 'none'


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
    constructor (pessoa, valor, pessoa2 = null, date = new Date())
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
            this.salvarHistorico(new movimentacao(outro, valor, this))
        }   
        else console.log("Dinheiro insuficiente")  
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
    }
}

agencia1 = new agencia('Bradesco 001', 'Rua Paraiba, 107, Centro - Tres Lagoas/MS')
hudson = new Cliente('hudson', '20/10/2000', 302010, agencia1.Id)
arthur = new Cliente('Artgur', '13/20/2000', 102030, agencia1.Id)
hudson.deposito(10)
console.log(hudson.Saldo)

hudson.transferencia(5, arthur)
console.log(hudson.Saldo)

hudson.deposito(10)
hudson.saque(10)

console.log(hudson.Historico)

mostrarPrincipal()