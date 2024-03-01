class Formatador {
    static formatarData(dataStr) {
        if (dataStr.length !== 8) {
            throw new Error("A string da data deve ter 8 caracteres.");
        }
    
        var dia = dataStr.substring(0, 2);
        var mes = dataStr.substring(2, 4);
        var ano = dataStr.substring(4, 8);
    
        return dia + "/" + mes + "/" + ano;
    }
}

export default Formatador;