class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana() {
        return this._http
            .get('negociacoes/semana')
            .then( negociacoes => {
                return negociacoes.map( objeto => 
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                );
            })
            .catch( erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana.');
            });
    }

    obterNegociacoesSemanaPassada() {
        return this._http
            .get('negociacoes/anterior')
            .then( negociacoes => {
                return negociacoes.map( objeto => 
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                );
            })
            .catch( erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana passada.');
            });
    }

    obterNegociacoesSemanaRetrasada() {
        return this._http
            .get('negociacoes/retrasada')
            .then( negociacoes => {
                return negociacoes.map( objeto => 
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                );
            })
            .catch( erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada.');
            });
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaPassada(),
            this.obterNegociacoesSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });
    } 

    /*
    0: requisição ainda não iniciada
    1: conexão com o servidor estabelecida
    2: requisição recebida
    3: processando requisição
    4: requisição está concluída e a resposta está pronta
    */

    /*obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            
            xhr.open('GET', 'negociacoes/semana');

            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        //JSON.parse(xhr.responseText)
                        //    .map( objeto => 
                        //        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                        //        )
                        //    .forEach( negociacao => this._listaNegociacoes.adiciona(negociacao)
                        //);
                        this.Mensagem.texto = 'Negociações importadas com sucesso.';
                        resolve(JSON.parse(xhr.responseText)
                            .map( objeto => 
                                new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                            )
                        );
                    }
                    else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana retrasada.');
                    }
                }
            }

            xhr.send();
        });
    }*/

    /*obterNegociacoesSemanaRetrasada(cb) {
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map( objeto => 
                            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)
                        )
                    );
                }
                else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana retrasada.',null);
                }
            }
        }

        xhr.send();
    }*/
}