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
        let notaBuscar = await this.repo.buscarPorId(id_nota)
        if(nota > 10){
            throw new Error('A nota não pode ser maior que 10')
        }
        if(!id_nota || !id_professor || !id_aluno || !disciplina_nota || !nota){
            throw new Error('Todas as colunas devem ser preenchidas')
        }
        if(notaBuscar.length > 0){
            throw new Error('Já existe id com essa nota')
        }
        await this.repo.inserirNota(id_nota, id_professor, id_aluno,  disciplina_nota, nota)
    }

    public async deletarNota(id: string){
        let deletNota = await this.repo.deletarNota(id)
        if(!deletNota){
            throw new Error('Id da nota não encontrado')
        }
        await this.repo.deletarNota(id)
    }

    public async atualizarNota(id:string, coluna:string, registro:string){
        let nota = await this.repo.buscarPorId(id)
        if(!nota){
            throw new Error('Id da nota não encontrado')
        }
        if(!id || !coluna || !registro){
            throw new Error('Todas as colunas devem ser preenchidas')
        }
        await this.repo.atualizarNota(id, coluna, registro)
}
}