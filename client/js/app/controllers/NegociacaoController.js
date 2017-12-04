class NegociacaoController {
    
    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemaAtual = '';

        //this._listaNegociacoes = new ListaNegociacoes(/*this,*/ model => {
        //    this._negociacoesView.update(model);
        //}/*.bind(this)*/);

        /*let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });*/

        /*this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            ['adiciona','esvazia'] ,
            model => { this._negociacoesView.update(model); }
         );*/

        //this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia','ordena','inverteOrdem');

        //this._negociacoesView.update(this._listaNegociacoes);
        
        //this._mensagem = new Mensagem();

        //this._mensagemView = new MensagemView($('#mensagemView'));

        /*this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => { this._mensagemView.update(model); }
        );*/

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto' );

        //this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        //this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();   
    }

    importaNegociacoes(/*event*/) {
        //event.preventDefault();

        let service = new NegociacaoService();

        service
            .obterNegociacoes()
            .then( negociacoes => {
                negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao) );
                this._mensagem.texto = 'Negociações importadas com sucesso.';
            })
            .catch( error => this._mensagem.texto = error );

        /*Promise.all([service.obterNegociacoesSemana()
                  , service.obterNegociacoesSemanaPassada()
                  , service.obterNegociacoesSemanaRetrasada()] )
            .then( arrayNegociacoes => {
                arrayNegociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [] )
                    .forEach( negociacao => this._listaNegociacoes.adiciona(negociacao) )
                this._mensagem.texto = 'Negociações importadas com sucesso.';
                })
            .catch( erro => this._mensagem.texto = erro );*/

        /*service.obterNegociacoesSemana()
            .then(
                negociacoes => {
                    negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações da semana obtida com sucesso.';
            })
            .catch( erro => this._mensagem.texto = erro );

        service.obterNegociacoesSemanaPassada()
            .then(
                negociacoes => {
                    negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações da semana passada obtida com sucesso.';
            })
            .catch( erro => this._mensagem.texto = erro );

        service.obterNegociacoesSemanaRetrasada()
            .then(
                negociacoes => {
                    negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações da semana retrasada obtida com sucesso.';
            })
            .catch( erro => this._mensagem.texto = erro );*/

        //Callback
        /*service.obterNegociacoesSemana( (erro, negociacoes) => {
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
            //this._mensagem.texto = 'Negociações importadas com sucesso.';

            service.obterNegociacoesSemanaPassada( (erro, negociacoes) => {
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }
    
                negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
                //this._mensagem.texto = 'Negociações importadas com sucesso.';

                service.obterNegociacoesSemanaRetrasada( (erro, negociacoes) => {
                    if(erro) {
                        this._mensagem.texto = erro;
                        return;
                    }
        
                    negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso.';
                });
            });
        });*/
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        //this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }

    ordena(coluna) {
        if(this._ordemaAtual == coluna ) {
            this._listaNegociacoes.inverteOrdem();
        }
        else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemaAtual = coluna;
    }
}