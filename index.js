class agencia {
    static countAgencia = 1;
    #id;

    static countAgenciaId(){
        this.countAgencia++;
    }
    
    get agencia (){
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

class cliente {
    nome;
    idade;
    saldoCliente;
    #agenciaId;
    movimentacoes = [];
 
    get saldo(){
        return this.SaldoCliente;
    }

    get agencia(){
        return this.#agenciaId;
    }

    get historico(){
        return this.movimentacoes;
    }

    transferencia(valor, outro) 
    {
        if(this == outro) 
            return 'Voce não pode transferir para voce mesmo'
        if(this.saldoCliente >= valor) {
            outro.saldoCliente += valor
            this.saldoCliente -= valor
            console.log(`${outro.nome} Recebeu ${valor} de ${this.nome}`)

            this.salvarHistorico(new movimentacao(this, -valor, outro))
            this.salvarHistorico(new movimentacao(outro, valor, this))
        }   
        else console.log("Dinheiro insuficiente")  
    }

    saque(valor)
    {
        if(this.SaldoCliente >= valor){
            this.saldoCliente -= valor;
            this.salvarHistorico(new movimentacao(this, -valor));
        }
        else console.log("Dinheiro insuficiente")  
    }

    deposito(valor)
    {
        this.saldoCliente += valor;
        this.salvarHistorico(new movimentacao(this, +valor));
    }
    
    salvarHistorico(idMov)
    {   
        console.log(idMov)
        this.movimentacoes.push(idMov)
    } 

    constructor (nome, idade, saldo, agencia){
        this.nome = nome;
        this.idade = idade;
        this.saldoCliente = saldo;
        this.historicoCliente = [];
        this.#agenciaId = agencia;
    }

}

agencia1 = new agencia('Rua Paraiba, 107, Centro - Tres Lagoas/MS')
hudson = new cliente('hudson', 10, 100, agencia1.agencia)
arthur = new cliente('Artgur', 10, 10, agencia1.agencia)

hudson.transferencia(5, arthur)

// const elemento = document.getElementById("navbar-brand");
// elemento.style.color = "yellow";
hudson.deposito(10)
hudson.saque(10)
console.log(hudson.historico)