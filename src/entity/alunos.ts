const { Pool } = require('pg');

export class Aluno{
    id(id: any) {
        throw new Error("Method not implemented.");
    }
    private id_aluno: string
    private nome_aluno:string
    private idade_aluno:number
    private turma_aluno:string

    constructor(id_aluno:string, nome_aluno:string, idade_aluno:number, turma_aluno:string){
        this.id_aluno = id_aluno
        this.nome_aluno = nome_aluno
        this.idade_aluno = idade_aluno
        this.turma_aluno = turma_aluno
    }

    public getId(){
        return this.id_aluno
    }

}