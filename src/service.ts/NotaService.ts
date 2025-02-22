import { Nota } from "../entity/notas";
import { NotasRepository } from "../repository/NotasRepository";

export class NotaService {

    private repo: NotasRepository

    constructor() {
        this.repo = new NotasRepository()
    }

    async listarNotas(): Promise<Nota[]> {
        return await this.repo.listarNotas()
    }

    public async buscarPorId(id: string): Promise<Nota[]> {
        let lista: Nota[] = await this.repo.buscarPorId(id)
        if (lista.length == 0) {
            throw new Error('Erro! id não encontrado')
        }
        return lista
    }

    public async inserirNota(id_nota:string, id_professor:string, id_aluno:string,  disciplina_nota:string, nota:number){
        await this.repo.inserirNota(id_nota, id_professor, id_aluno,  disciplina_nota, nota)
    }

    public async deletarNota(id){
        await this.repo.deletarNota(id)
    }

    public async atualizarNota(id:string, coluna:string, registro:string){
        await this.repo.atualizarNota(id, coluna, registro)
}
}