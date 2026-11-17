const Bloco = require('./bloco');

class Blockchain {
    constructor() {
        this.cadeia = [
            new Bloco(0, 'Bloco gênese', '0')
        ];
    }

    adicionar(dados) {
        const ultimoBloco = this.cadeia[this.cadeia.length - 1];

        const novoBloco = new Bloco(
            this.cadeia.length,
            dados,
            ultimoBloco.hash
        );

        this.cadeia.push(novoBloco);

        return novoBloco;
    }

    ehValida() {

        const genesis = this.cadeia[0];

        if (!genesis || genesis.hashAnterior !== '0' ||
            genesis.hash !== genesis.calcularHash()) {
            return false;
        }

        for (let i = 1; i < this.cadeia.length; i++) {

            const blocoAtual = this.cadeia[i];
            const blocoAnterior = this.cadeia[i - 1];

            if (blocoAtual.hash !== blocoAtual.calcularHash()) {
                return false;
            }

            if (blocoAtual.hashAnterior !== blocoAnterior.hash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;