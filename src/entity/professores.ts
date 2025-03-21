const { Pool } = require('pg');

export class Professor{
    private id_professor: string
    private nome_professor:string
    private disciplina_professor:string
    private telefone_professor:string


    constructor(id_professor:string, nome_professor:string, disciplina_professor:string, telefone_professor:string){
    this.id_professor = id_professor
    this.nome_professor = nome_professor
    this.disciplina_professor = disciplina_professor
    this.telefone_professor = telefone_professor

    }
    
    getId(){
        return this.id_professor
    }
}