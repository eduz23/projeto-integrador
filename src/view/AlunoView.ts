import PromptSync from "prompt-sync";
import { AlunoService } from "../service.ts/AlunoService";
import { Pool } from "pg";
import { Nota } from "../entity/notas";
import { NotaService } from "../service.ts/NotaService";

export class AlunoView {

    private aluno: AlunoService;
    private nota: NotaService
    private prompt: (question: string) => string;

    constructor() {
        this.nota = new NotaService()
        this.aluno = new AlunoService()
        this.prompt = PromptSync()
    }



    public async alunoMenu() {

        console.log("------------------------")
        console.log("Selecione a opção abaixo que deseja: ")
        console.log("1- Listar alunos")
        console.log("2- Buscar por id")
        console.log("3- Inserir aluno")
        console.log("4- Deletar aluno")
        console.log("5- Atualizar dado de um aluno")
        console.log("6- Sair")

        let opcao = this.prompt("Digite a opção que deseja: ")
        switch (opcao) {
            case '1':
                let mostrarAlunos = await this.aluno.listarAlunos()
                console.table(mostrarAlunos)
                return this.alunoMenu()

            case '2':
                let idSearch = this.prompt('Digite o id do aluno que deseja procurar: ')

                try {
                    let alunoSearch = await this.aluno.buscarPorId(idSearch)
                    console.table(alunoSearch)
                }
                catch (e) {
                    console.log(e.message)
                }

                return this.alunoMenu()

            case '3':
                let idInserir = this.prompt('Digite o id do aluno para inserir: ')
                let nome = this.prompt('Digite o nome do aluno para inserir: ')
                let idade = parseInt(this.prompt('Digite a idade do aluno para inserir: '))
                let turma = this.prompt('Digite a turma do aluno para inserir: ')

                try {
                    await this.aluno.inserirAluno(idInserir, nome, idade, turma)
                    console.log('Aluno criado com sucesso')
                }
                catch (e) {
                    console.log(e.message)
                }
                return this.alunoMenu()

            case '4':
                let aluno = this.prompt('Informe o Id do aluno por favor: ')
                try {
                    let buscar = await this.aluno.buscarPorId(aluno)
                    await this.aluno.deletarAluno(buscar[0].getId())
                    console.log('Aluno deletado!')
                    console.table(await this.aluno.listarAlunos())
                }
                catch (e) {
                    console.log(e.message)
                }
                return this.alunoMenu()

            case '5':
                let alunoatt = this.prompt('Digite o id do aluno para atualizar: ')
                let coluna = this.prompt('O que quer atualizar: ')
                let registro = this.prompt('Para o que deseja atualizar: ')

                try {
                    await this.aluno.buscarPorId(alunoatt)
                    await this.aluno.atualizarAluno(alunoatt, coluna, registro)
                    console.log('Aluno atualizado')
                }

                catch (e) {
                    console.log(e.message)
                }
                return this.alunoMenu()

            case '6':
                console.log("Saindo...")
                break;

            default:
                console.log("Opção inválida.")
                this.alunoMenu()
        }
    }
}
