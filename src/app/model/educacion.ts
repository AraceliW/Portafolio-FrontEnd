export class Educacion {
    id?: number;
    nombreEducacion: string;
    establecimiento: string;
    imgEducacion: string;
    startEducacion: number;
    endEducacion: number;

    constructor(nombreEducacion: string, establecimiento: string, imgEducacion: string, startEducacion: number, endEducacion: number) {
        this.nombreEducacion = nombreEducacion;
        this.establecimiento = establecimiento;
        this.imgEducacion = imgEducacion;
        this.startEducacion = startEducacion;
        this.endEducacion = endEducacion;
    }

}