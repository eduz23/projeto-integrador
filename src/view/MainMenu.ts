import PromptSync from "prompt-sync";
import { Aluno } from "../entity/alunos";
import { AlunoView } from "./AlunoView";
import { NotasView } from "./NotasView";
import { ProfessorView } from "./ProfessoresView";

export class MenuPrinciapl{
    private aluno: AlunoView
    private professor: ProfessorView
    private nota: NotasView
    private prompt: (question: string) => string;

    constructor(){
        this.aluno = new AlunoView()
        this.professor = new ProfessorView()
        this.nota = new NotasView()
        this.prompt = PromptSync()
    }
    
}