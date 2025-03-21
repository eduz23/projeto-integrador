import { Aluno } from "../entity/alunos"
import { AlunosRepository } from "../repository/AlunoRepository"

export class AlunoService {

    private repo: AlunosRepository

    constructor() {
        this.repo = new AlunosRepository()
    }

    public async listarAlunos(): Promise<Aluno[]> {
        return await this.repo.listarAlunos()
    }

    public async buscarPorId(id: string): Promise<Aluno[]> {
        let lista: Aluno[] = await this.repo.buscarPorId(id)
        if (lista.length == 0) {
            throw new Error('Erro! id não encontrado')
        }

        return lista
    }

    public async inserirAluno(id: string, nome_aluno: string, idade_aluno: number, turma_aluno: string) {
        let aluno = await this.repo.buscarPorId(id)

        if(!id || !nome_aluno || !idade_aluno || !turma_aluno){
            throw new Error('Todas as colunas devem ser preenchidas')
        }
        if(aluno.length > 0){
            throw new Error('O aluno ja existe')
        }

        await this.repo.criarAluno(id, nome_aluno, idade_aluno, turma_aluno)

    }

    public async deletarAluno(id:string){
       await this.repo.deletarAluno(id)

    }

    public async atualizarAluno(id:string, coluna:string, registro:string){
        let aluno = await this.repo.buscarPorId(id)
        if(!aluno){
            throw new Error('Aluno não encontrado')
        }
        if(!id || !coluna || !registro){
            throw new Error('Todas as colunas devem ser preenchidas')
        }
        await this.repo.atualizarAluno(id, coluna, registro)
    }
}
