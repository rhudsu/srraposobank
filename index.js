class agencia {
    agenciaId
    constructor (){
        agenciaId = this
    }
}


class movimentacao
{
    datatime; 
    pessoa1;
    pessoa2; valor;
    constructor (pessoa, valor, pessoa2 = null, datatime = new Date())
    {
        datatime = new Date();
        pessoa = this.pessoa1,
        pessoa2 = pessoa2,
        valor = valor
    }
}

class cliente {
    nome;
    idade;
    saldoCliente;
    movimentacoesClientes = [];
 
    get saldo(){
        return this.SaldoCliente;
    }

    get historico(){
        return this.historicoCliente;
    }

    transferencia(valor, outro) 
    {
        if(this == outro) 
            return 'Voce não pode transferir para voce mesmo'
        if(this.saldoCliente <= valor) {

            
            outro.saldoCliente += valor
            this.saldoCliente -= valor
            console.log(`${outro.nome} Recebeu ${valor} de ${this.nome}`)

            this.salvarHistorico(new movimentacao(this, -valor, outro))
            this.salvarHistorico(new movimentacao(outro, valor, this))
        }   
        else console.log("Dinheiro insuficiente")  
    }

    
    salvarHistorico(idMov)
    {   
        this.movimentacoesClientes.push(idMov)
    } 

    constructor (nome, idade){
        this.nome = nome
        this.idade = idade
        this.saldoCliente = 0
        this.historicoCliente = []
    }

}


hudson = new cliente('hudson', 10 )
arthur = new cliente('Artgur', 10 )

hudson.transferencia(5, arthur)

// const elemento = document.getElementById("navbar-brand");
// elemento.style.color = "yellow";

console.log(hudson.historico)