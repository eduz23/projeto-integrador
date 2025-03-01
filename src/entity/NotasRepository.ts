import { Pool } from "pg";
import { Database } from "./database";
import { Nota } from "../entity/notas";

export class NotasRepository {

    private pool: Pool

    constructor() {
        this.pool = Database.iniciarConexao()
    }

    async listarNotas(): Promise<Nota[]> {

        const cod = "SELECT * FROM system.notas"
        const result = await this.pool.query(cod)

        const listaNotas: Nota[] = []

        for (const row of result.rows) {
            const nota = new Nota(row.id_nota, row.id_professor, row.id_aluno, row.disciplina_nota, row.nota)
            listaNotas.push(nota)
        }

        return listaNotas
    }

    public async buscarPorId(id: string): Promise<Nota[]> {
        let cod = "Select * from system.notas where id_nota = $1"
        let result = await this.pool.query(cod, [id])

        let listaNotas: Nota[] = []

        for (const row of result.rows) {
            const nota = new Nota(row.id_nota, row.id_professor, row.id_aluno, row.disciplina_nota, row.nota)
            listaNotas.push(nota)
        }
        return listaNotas
    }

    public async inserirNota(id_nota:string, id_professor:string, id_aluno:string, disciplina_nota:string, nota:number){
        let cod = "insert into system.notas (id_nota, id_professor, id_aluno, disciplina_nota, nota) values ($1, $2, $3, $4, $5)"
        await this.pool.query(cod,[id_nota, id_professor, id_aluno, disciplina_nota, nota])
    }

    public async deletarNota(id:string){
        let cod = 'delete from system.notas where id_nota = $1'
        let result = await this.pool.query(cod, [id])
        return result
    }

    public async atualizarNota(id:string, coluna:string, registro:string):Promise<void>{
        let cod = `update system.notas set ${coluna} = $1 where id_nota = $2`
        let result = await this.pool.query(cod, [registro, id])
    }
}