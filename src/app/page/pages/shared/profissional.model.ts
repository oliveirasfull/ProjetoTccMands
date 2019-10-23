export class Profissional {
    constructor(
        public primeiroNome : string,
        public segundoNome : string,
        public nomeProfissional: string,
        public manicure : boolean,
        public pedicure : boolean,
        public atendimentoDomicilio: boolean,
        public idade: number,
        public urlFoto : string ="./../../../../assets/perfil.jpg" // colocar a foto montada do profissional
        

    ){}
}