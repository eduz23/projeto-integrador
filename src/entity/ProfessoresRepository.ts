import { Pool } from "pg"
import { Professor } from "../entity/professores"
import { Database } from "./database"

export class ProfessorRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    public async listarProfessores(): Promise<Professor[]> {
        const cod = "SELECT * FROM system.professores"
        const result = await this.pool.query(cod)

        const listaProfessores: Professor[] = []

        for (const row of result.rows) {
            const professor = new Professor(row.id_professor, row.nome_professor, row.disciplina_professor, row.telefone_professor)
            listaProfessores.push(professor)
        }

        return listaProfessores
    }

    public async criarProfessor(id_professor: string, nome_professor: string, disciplina_professor: string, telefone_professor: string) {
        let cod = "insert into system.professores (id_professor, nome_professor, disciplina_professor, telefone_professor) values($1, $2, $3, $4)"
        await this.pool.query(cod, [id_professor, nome_professor, disciplina_professor, telefone_professor])
    }

    public async buscarPorId(id: string): Promise<Professor[]>{
            let cod = "Select * from system.professores where id_professor = $1"
            let result = await this.pool.query(cod, [id])
    
            let listaProfessores: Professor[] = []
    
            for(const row of result.rows){
            const professor = new Professor(row.id_professor, row.nome_professor, row.disciplina_professor, row.telefone_professor)
            listaProfessores.push(professor)
            }
            return listaProfessores
        }

    public async deletarProfessor(id:string){
        let cod = "delete from system.professores where id_professor = $1"
        let result = await this.pool.query(cod, [id])
        return result
    }

    public async atualizarProfessor(id:string, coluna:string, registro:string):Promise<void>{
        let cod = `update system.professores set ${coluna} = $1 where id_professor = $2`
        let result = await this.pool.query(cod, [registro, id])
    }
}
