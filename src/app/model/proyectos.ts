export class Proyecto {
    id?: number;
    nombreProyecto: string;
    url: string;
    imgProyecto: string;
    endProyecto: number;
    descripcionProyecto: string;


    constructor(nombreProyecto: string, url: string, imgProyecto: string, endProyecto: number, descripcionProyecto: string) {
        this.nombreProyecto = nombreProyecto;
        this.url = url;
        this.imgProyecto = imgProyecto;
        this.endProyecto = endProyecto;
        this.descripcionProyecto = descripcionProyecto;
    }


    
}

