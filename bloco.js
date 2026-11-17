const crypto = require('crypto');

class Bloco {
    constructor(indice, dados, hashAnterior) {

        if (typeof dados !== 'string') {
            throw new Error('Os dados da entrega devem ser um texto.');
        }

        if (dados.length < 3) {
            throw new Error('Os dados da entrega devem ter no mínimo 3 caracteres.');
        }

        if (dados.length > 80) {
            throw new Error('Os dados da entrega devem ter no máximo 80 caracteres.');
        }

        if (!Number.isInteger(indice) || indice < 0) {
            throw new Error('O índice deve ser um número inteiro não negativo.');
        }

        if (typeof hashAnterior !== 'string' || hashAnterior.length === 0) {
            throw new Error('O hash anterior deve ser um texto não vazio.');
        }

        this.indice = indice;
        this.dados = dados;
        this.hashAnterior = hashAnterior;

        this.hash = this.calcularHash();
    }

    calcularHash() {
        const texto = `${this.indice}|${this.dados}|${this.hashAnterior}`;

        return crypto
            .createHash('sha256')
            .update(texto)
            .digest('hex');
    }
}

module.exports = Bloco;