import { Pool } from "pg";
import { Professor } from "../entity/professores";
import { ProfessorRepository } from "../repository/ProfessoresRepository";

export class ProfessorService {

    private repo: ProfessorRepository

    constructor() {
        this.repo = new ProfessorRepository()

    }

    public async listarProfessores(): Promise<Professor[]> {
        return await this.repo.listarProfessores()
    }

    public async criarProfessor(id_professor: string, nome_professor: string, disciplina_professor: string, telefone_professor: string) {
        let professorBuscar = await this.repo.buscarPorId(id_professor)
        if(!id_professor || !nome_professor || !disciplina_professor || telefone_professor){
            throw new Error('Todas as colunas devem ser preenchidas')
        }
        if(professorBuscar){
            throw new Error('O aluno ja existe')
        }
        await this.repo.criarProfessor(id_professor, nome_professor, disciplina_professor, telefone_professor)
    }


    public async CriarProfessorEValidarTelefone(id_professor: string, nome_professor: string, disciplina_professor: string, telefone_professor: string) {
        const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/
        let teste = regex.test(telefone_professor)
        if (!teste) console.log("Error! O telefone é inválido!")
        this.criarProfessor(id_professor, nome_professor, disciplina_professor, telefone_professor)
    }

    public async buscarPorId(id_professor: string): Promise<Professor[]> {
        let lista: Professor[] = await this.repo.buscarPorId(id_professor)
        if (lista.length == 0) {
            throw new Error('Erro! id não encontrado')
        }

        return lista
    }

    public async deletarProfessor(id:string){
        let deletProfessor = await this.repo.buscarPorId(id)
        if(!deletProfessor){
            throw new Error('Professor não encontrado')
        }
        await this.repo.deletarProfessor(id)
    }

    public async atualizarProfessor(id:string, coluna:string, registro:string){
        let professor = await this.repo.buscarPorId(id)
        if(!professor){
            throw new Error('Id do professor não encontrado')
        }
        if(!id || !coluna || !registro){
            throw new Error('Todas as colunas devem ser preenchidas')
        }
        await this.repo.atualizarProfessor(id, coluna, registro)
    }
}
