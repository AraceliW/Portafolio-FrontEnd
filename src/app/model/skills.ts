export class Skill {

    id?: number;
    nombreSkill: string;
    porcentajeSkillS: number;

    constructor(nombreSkill: string, porcentajeSkillS: number) {
        this.nombreSkill = nombreSkill;
        this.porcentajeSkillS = porcentajeSkillS;
    }

}