export class persona{
    id?: number;
    persona_nombre: string;
    persona_apellido:string;
    persona_titulo: string;
    persona_descripcion: string;
    foto_perfil: string;
    banner_perfil: string;


    constructor(persona_nombre: string, persona_apellido:string, persona_titulo: string, persona_descripcion: string, foto_perfil: string, banner_perfil: string){
        this.persona_nombre = persona_nombre;
        this.persona_apellido = persona_apellido;
        this.persona_titulo = persona_titulo;
        this.persona_descripcion = persona_descripcion;
        this.foto_perfil = foto_perfil;
        this.banner_perfil = banner_perfil;
    }

    
}