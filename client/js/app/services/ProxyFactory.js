class ProxyFactory {

    static create(object, props, acao) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function(){
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                let returno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    acao(target);
                }
                return returno;
            }
        });
    }

    static _ehFuncao(func) {
        return typeof(func) == typeof(Function);
    }
}