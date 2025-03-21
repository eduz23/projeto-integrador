import { Aluno } from "./alunos"
import { Professor } from "./professores"

export class Nota{
    private id_nota: string
    private id_professor: Professor
    private id_aluno: Aluno
    private disciplina_nota:string
    private nota:number

    constructor(id_nota:string, id_professor:Professor, id_aluno:Aluno, disciplina_nota:string, nota:number){
        this.id_nota = id_nota
        this.id_professor = id_professor
        this.id_aluno = id_aluno
        this.disciplina_nota = disciplina_nota
        this.nota = nota
    }

    getId(){
        return this.id_nota
    }
}