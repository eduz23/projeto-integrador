import { Pool } from "pg";
import { Aluno } from "../entity/alunos";
import { Database } from "./database";
import { IAlunosRepository } from "./IAlunoRepository";

export class AlunosRepository implements IAlunosRepository{

    private pool: Pool

    constructor(){
        this.pool = Database.iniciarConexao()
    }

    async listarAlunos(): Promise<Aluno[]>{

        const  cod = "SELECT * FROM system.alunos"
        const result = await this.pool.query(cod)
        
        const listaAlunos: Aluno[] = []


        for(const row of result.rows){
            const aluno = new Aluno(row.id_aluno, row.nome_aluno, row.idade_aluno, row.turma_aluno)
            listaAlunos.push(aluno)

        }
        return listaAlunos
    }

    public async buscarPorId(id: string): Promise<Aluno[]>{
        let cod = "Select * from system.alunos where id_aluno = $1"
        let result = await this.pool.query(cod, [id])

        let listaAlunos: Aluno[] = []

        for(const row of result.rows){
        const aluno = new Aluno(row.id_aluno, row.nome_aluno, row.idade_aluno, row.turma_aluno)
        listaAlunos.push(aluno)
        }
        return listaAlunos
    }

    public async criarAluno(id: string, nome_aluno:string, idade_aluno:number, turma_aluno:string){
        let cod = "insert into system.alunos (id_aluno, nome_aluno, idade_aluno, turma_aluno) values ($1, $2, $3, $4)"
        await this.pool.query(cod,[id, nome_aluno, idade_aluno, turma_aluno])
        
    }

    public async deletarAluno(id:string){
        let cod = 'delete from system.alunos where id_aluno = $1'
        let result = await this.pool.query(cod, [id])
        return result
    }

    public async atualizarAluno(id:string, coluna:string, registro:string):Promise<void>{
        let cod = `update system.alunos set ${coluna} = $1 where id_aluno = $2`
        let result = await this.pool.query(cod, [registro, id])
    }
}