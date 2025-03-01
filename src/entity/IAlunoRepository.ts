import { Aluno } from "../entity/alunos";

export interface IAlunosRepository{
    listarAlunos(): Promise<Aluno[]>
    buscarPorId(id: string): Promise<Aluno[]>
    criarAluno(id: string, nome_aluno:string, idade_aluno:number, turma_aluno:string)
    deletarAluno(id:string)
    atualizarAluno(id:string, coluna:string, registro:string):Promise<void>
}