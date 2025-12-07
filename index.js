// // anexação do js com html do kenzo

// const formulario = document.getElementById("forms")

// formulario.addEventListener('submit', function (cadastro){
//     cadastro.preventDefault

//     const dadosFormulados = new FormData(formulario)

//     const objetoPuro = Object.fromEntries(dadosFormulados.entries())

//     const jsonString = JSON.stringify(objetoPuro, null, 2)



// })
// function criarCliente(event)
// {
	
// 	event.preventDefault()
	
//     const form = event.target
	
//     const dadosForm = new FormData(form)
	
//     const nome = dadosForm.get('nome')
    
//     const idade = dadosForm.get('idade')
	
//     const agencia_id = dadosForm.get('agencia')
	
//     const clientado = new cliente(nome, idade, agencia_id)
// }
// document.getElementById('forms').addEventListener('submit', criarCliente);


// objetificação do hud

class agencia {
	static countAgencia = 1;
    #id;
	
    static countAgenciaId(){
        this.countAgencia++;
    }
    
    get agenciaId (){
        return this.#id;
    }

    constructor (){
        this.#id = this.constructor.countAgencia;
        this.constructor.countAgenciaId();
    }
}


class movimentacao
{
    datatime; 
    pessoa;
    pessoa2; valor;
    constructor (pessoa, valor, pessoa2 = null, datatime = new Date())
    {
        this.datatime = new Date();
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

class cliente extends pessoa {
    #saldo;
    #agenciaId;
    #movimentacoes = [];
 
    get Saldo(){
        return this.saldo;
    }

    set Saldo(valor){
        this.saldo += valor
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
        if(this.#saldo >= valor) {
            outro.Saldo(valor)
            this.Saldo(-valor)
           
            console.log(`${outro.nome} Recebeu ${valor} de ${this.nome}`)

            this.salvarHistorico(new movimentacao(this, -valor, outro))
            this.salvarHistorico(new movimentacao(outro, valor, this))
        }   
        else console.log("Dinheiro insuficiente")  
    }

    saque(valor)
    {
        if(this.saldoCliente >= valor){
            this.setSaldo(-valor);
            this.salvarHistorico(new movimentacao(this, -valor));
        }
        else console.log("Dinheiro insuficiente")  
    }

    deposito(valor)
    {
        // Saldo = valor;
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

agencia1 = new agencia('Rua Paraiba, 107, Centro - Tres Lagoas/MS')
hudson = new cliente('hudson', '20/10/2000', 302010, agencia1.agenciaId)
arthur = new cliente('Artgur', '13/20/2000', 102030, agencia1.agenciaId)

hudson.transferencia(5, arthur)
console.log(hudson.Saldo)
// const elemento = document.getElementById("navbar-brand");
// elemento.style.color = "yellow";
hudson.deposito(10)
hudson.saque(10)
console.log(hudson.Historico)