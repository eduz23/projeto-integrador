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
        await this.repo.criarProfessor(id_professor, nome_professor, disciplina_professor, telefone_professor)
    }


    public async CriarProfessorEValidarTelefone(id_professor: string, nome_professor: string, disciplina_professor: string, telefone_professor: string) {
        const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/
        let teste = regex.test(telefone_professor)
        if (!teste) console.log("Error! O telefone é inválido!")
        else this.criarProfessor(id_professor, nome_professor, disciplina_professor, telefone_professor)
    }

    public async buscarPorId(id_professor: string): Promise<Professor[]> {
        let lista: Professor[] = await this.repo.buscarPorId(id_professor)
        if (lista.length == 0) {
            throw new Error('Erro! id não encontrado')
        }

        return lista
    }

    public async deletarProfessor(id:string){
        await this.repo.deletarProfessor(id)
    }

    public async atualizarProfessor(id:string, coluna:string, registro:string){
        await this.repo.atualizarProfessor(id, coluna, registro)
    }
}
