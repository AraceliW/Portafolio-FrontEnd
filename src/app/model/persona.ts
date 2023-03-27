export class Persona {
    id?: number;
    nombrePersona: string;
    apellidoPersona: string;
    tituloPersona: string;
    imgPersona: string;
    descripcionPersona: string;
  

    constructor(nombrePersona: string, apellidoPersona: string, tituloPersona: string, imgPersona: string, descripcionPersona: string) {
        this.nombrePersona = nombrePersona;
        this.apellidoPersona = apellidoPersona;
        this.tituloPersona = tituloPersona;
        this.imgPersona = imgPersona;
        this.descripcionPersona = descripcionPersona;
    }
}