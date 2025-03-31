import PromptSync from "prompt-sync";
import { AlunoView } from "./AlunoView";
import { NotasView } from "./NotasView";
import { ProfessorView } from "./ProfessoresView";
import { AlunoService } from "../service.ts/AlunoService";
import { ProfessorService } from "../service.ts/ProfessoresService";
import { NotaService } from "../service.ts/NotaService";
import { exit } from "process";

export class MenuPrinciapl {
    private alunoService: AlunoService
    private profService: ProfessorService
    private notaService: NotaService
    private aluno: AlunoView
    private professor: ProfessorView
    private nota: NotasView
    private prompt: (question: string) => string;

    constructor() {
        this.alunoService = new AlunoService()
        this.profService = new ProfessorService()
        this.notaService = new NotaService()
        this.aluno = new AlunoView()
        this.professor = new ProfessorView()
        this.nota = new NotasView()
        this.prompt = PromptSync()
    }

    async tipoUser() {
        console.log('1- User')
        console.log('2- Adm')
        console.log('3- Sair')
        let opcao = this.prompt('Voce é: ')

        switch (opcao) {
            case '1':
                await this.menuAluno()
                break

            case '2':
                await this.menuPrincipal()
                break

            case '3':
                console.log('Saindo...')
                break

            default:
                console.log('Opção inválida, tente novamente')
                this.tipoUser()
        }
    }

    async menuAluno() {
        console.log('1- Ver alunos')
        console.log('2- Ver professores')
        console.log('3- Ver notas')
        console.log('4- Sair')
        let opcao = this.prompt('Digite o que deseja visualizar: ')

        switch (opcao) {
            case '1':
                let mostrarAlunos = await this.alunoService.listarAlunos()
                console.table(mostrarAlunos)
                return this.menuAluno()

            case '2':
                let mostrarProf = await this.profService.listarProfessores()
                console.table(mostrarProf)
                return this.menuAluno()

            case '3':
                let mostrarNota = await this.notaService.listarNotas()
                console.table(mostrarNota)
                return this.menuAluno()

            case '4':
                console.log('Saindo...')
                break

        }
    }

    public async verificarCPF(cpf: string): Promise<boolean> {
        let regex = /^\d{11}$/
        return regex.test(cpf)
    }

    public async menuPrincipal() {
        console.log(' ')
        console.log("Bem-vindo ao Edugrade")

        let cpfValido = false;
        while (!cpfValido) {
            let cpf = this.prompt("Digite seu CPF: ");
            cpfValido = await this.verificarCPF(cpf);

            if (!cpfValido) {
                console.log('CPF inválido, tente novamente.');
            }
        }

        this.prompt("Digite sua senha: ")

        let opcao = ""

        while (opcao !== "4") {
            console.log(' ')
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


