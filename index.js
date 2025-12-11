
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
        if(this.clientes.find(c => c.cpf == cpf)){
            msgErro('CPF já cadastrado');
            return null;
        }
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
        if(this.#movimentacoes == null)
        {
            console.log("Nenhuma movimentação encontrada")
            return [];
        }
        return this.#movimentacoes;
    }

    transferencia(valor, outro) 
    {
        if(this == outro) 
            return 'Voce não pode transferir para voce mesmo'
        if(this.Saldo >= valor) {
            outro.Saldo += valor
            this.Saldo += -valor
           
            // console.log(`${outro.nome} Recebeu ${valor} de ${this.nome}`)

            this.salvarHistorico(new movimentacao(this, -valor, outro))
            outro.salvarHistorico(new movimentacao(outro, valor, this))
            return true
        }   
        msgErro('Saldo insuficiente para transferencia')
    }

    saque(valor)
    {
        if(this.Saldo >= valor){
            this.Saldo += -valor;
            this.salvarHistorico(new movimentacao(this, -valor));
        }
        else msgErro('Saldo insuficiente para saque')
    }

    deposito(valor)
    {
        this.Saldo += valor;
        this.salvarHistorico(new movimentacao(this, +valor));
    }
    
    salvarHistorico(idMov)
    {   
        this.#movimentacoes.push(idMov)
    } 

    constructor (nome, dataNascimento, cpf, agencia){
        super(nome, dataNascimento, cpf);
        this.#saldo = 0;
        this.movimentacoes = [];
        this.#agenciaId = agencia;
        Cliente.clientes.push(this);
    }
}

function msgErro(msg)
{
    alert(msg);
}


agencia1 = new agencia('Bradesco 001', 'Rua Paraiba, 107, Centro - Tres Lagoas/MS')
hudson = new Cliente('hudson', '20/10/2000', 302010, agencia1.Id)
arthur = new Cliente('Artgur', '13/20/2000', 102030, agencia1.Id)
 
mostrarLogin()
 