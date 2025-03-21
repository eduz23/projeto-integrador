import PromptSync from "prompt-sync";
import { AlunoView } from "./AlunoView";
import { NotasView } from "./NotasView";
import { ProfessorView } from "./ProfessoresView";

export class MenuPrinciapl {
    private aluno: AlunoView
    private professor: ProfessorView
    private nota: NotasView
    private prompt: (question: string) => string;

    constructor() {
        this.aluno = new AlunoView()
        this.professor = new ProfessorView()
        this.nota = new NotasView()
        this.prompt = PromptSync()
    }

    public async menuPrincipal() {
        console.log(' ')
        console.log("Bem-vindo ao Edugrade")
        this.prompt("Digite seu CPF ou número de telefone: ")
        this.prompt("Digite sua senha: ")
        console.log(" ")

        let opcao = ""

        while (opcao !== "4") {
            console.log("Selecione o menu que deseja acessar: ")
            console.log("1- Menu de aluno")
            console.log("2- Menu de professor")
            console.log("3- Menu de notas")
            console.log("4- Sair")

            opcao = this.prompt("Digite a opção que deseja: ")

            switch (opcao) {
                case "1":
                    await this.aluno.alunoMenu()
                    break;

                case "2":
                    await this.professor.professorMenu()
                    break;

                case "3":
                    await this.nota.notaMenu()
                    break;

                case "4":
                    console.log("Saindo...")
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.")
            }
        }
    }
}
