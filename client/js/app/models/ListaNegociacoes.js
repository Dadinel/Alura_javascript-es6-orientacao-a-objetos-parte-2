class ListaNegociacoes {
    
    constructor(/*contexto, *//*armadilha*/) {
        
        this._negociacoes = [];
        //this._armadilha = armadilha;
        //this._contexto = contexto;
    }
    
    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        //this._negociacoes = [].concat(this._negociacoes, negociacao);
        //this._armadilha(this);
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    esvazia() {
        this._negociacoes = [];
        //this._armadilha(this);
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    ordena(criterio) {
        this._negociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }

    get negociacoes() {
        
        return [].concat(this._negociacoes);
    }

    // novo método
    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}