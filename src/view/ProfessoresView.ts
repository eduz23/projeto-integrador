import PromptSync from "prompt-sync";
import { ProfessorService } from "../service.ts/ProfessoresService";
import { ppid } from "process";
import { Pool } from "pg";

export class ProfessorView {

    private professor: ProfessorService
    private prompt: (question: string) => string;

    constructor() {
        this.professor = new ProfessorService()
        this.prompt = PromptSync()
    }

    public async professorMenu() {

        console.log("------------------------")
        console.log("Selecione a opção abaixo que deseja:")
        console.log("1- Listar professores")
        console.log("2- Criar professor")
        console.log("3- Buscar professor por id")
        console.log("4- Deletar professor")
        console.log("5- Atualizar dado de um professor")
        console.log("6- Sair")

        let opcao = this.prompt('Digite o que deseja fazer: ')
        switch (opcao) {
            case '1':
                let mostrarProf = await this.professor.listarProfessores()
                console.table(mostrarProf)
                return this.professorMenu()

            case '2':
                let idProfessor = this.prompt("Digite o id do professor: ")
                let nomeProfessor = this.prompt("Digite o nome do professor: ")
                let disciplinaProfessor = this.prompt("Digite a disciplina do professor: ")
                let telefoneProfessor = this.prompt("Digite o número de telefone do professor: ")
                await this.professor.CriarProfessorEValidarTelefone(idProfessor, nomeProfessor, disciplinaProfessor, telefoneProfessor)
                console.log('Professor inserido com sucesso!')
                return this.professorMenu()

            case '3':
                let idSearch = this.prompt('Digite o id do professor que deseja buscar as informações: ')
                let buscarProf = await this.professor.buscarPorId(idSearch)
                console.table(buscarProf)
                return this.professorMenu()

            case '4':
                let professorDelet = this.prompt('Informe a nota por favor: ')
                try {
                let buscar = await this.professor.buscarPorId(professorDelet)
                    await this.professor.deletarProfessor(buscar[0].getId())
                    console.log('Nota deletada!')
                    console.table(await this.professor.listarProfessores())
                }
                catch (e) {
                    console.log('Erro no sistema', e.message)
                }
                return this.professorMenu()

            case '5':
                let professoratt = this.prompt('Digite o id do professor para atualizar: ')
                let coluna = this.prompt('O que quer atualizar: ')
                let registro = this.prompt('Para o que deseja atualizar: ')
                await this.professor.atualizarProfessor(professoratt, coluna, registro)
                console.log('Professor atualizado')
                return this.professorMenu()

            case '6':
                console.log('saindo...')
                break;
        }

    }

}