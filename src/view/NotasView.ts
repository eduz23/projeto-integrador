import PromptSync from "prompt-sync";
import { NotaService } from "../service.ts/NotaService";

export class NotasView {

    private nota: NotaService;
    private prompt: (question: string) => string;

    constructor() {
        this.nota = new NotaService()
        this.prompt = PromptSync()
    }

    public async notaMenu() {
        
        console.log("------------------------")
        console.log("Selecione a opção abaixo que deseja: ")
        console.log("1- Listar notas")
        console.log("2- Buscar nota por id")
        console.log("3- Inserir nota")
        console.log("4- Deletar nota")
        console.log("5- Atualizar algum dado da nota")
        console.log("6- Sair")

        let opcao = this.prompt("Digite a opção que deseja: ")
        switch (opcao) {
            case '1':
                let mostrarNota = await this.nota.listarNotas()
                console.table(mostrarNota)
                return this.notaMenu()

            case '2':
                let searchId = this.prompt('Digite o id de notas para procurar: ')

                try {
                    let resultSearch = await this.nota.buscarPorId(searchId)
                    console.table(resultSearch)
                }
                catch (e) {
                    console.log( e.message)
                }
                return this.notaMenu()

            case '3':
                let idInserir = this.prompt("Digite o id da nota que deseja inserir: ")
                let idProfInserir = this.prompt("Digite o id do professor para inserir: ")
                let idAlunoInserir = this.prompt("Digite o id do aluno para inserir: ")
                let disciplina_nota = this.prompt("Digite a disciplina para inserir: ")
                let nota = parseInt(this.prompt("Digite a nota para inserir: "))

                try {
                    await this.nota.inserirNota(idInserir, idProfInserir, idAlunoInserir, disciplina_nota, nota)
                    console.log('Nota criada com sucesso.')
                }
                catch (e) {
                    console.log(e.message)
                }
                return this.notaMenu()

            case '4':
                let notaDelet = this.prompt('Informe o id da nota por favor: ')
                try {
                    let buscar = await this.nota.buscarPorId(notaDelet)
                    await this.nota.deletarNota(buscar[0].getId())
                    console.log('Nota deletada!')
                    console.table(await this.nota.listarNotas())
                }
                catch (e) {
                    console.log(e.message)
                }
                return this.notaMenu()

            case '5':
                let notaatt = this.prompt('Digite o id da nota para atualizar: ')
                await this.nota.buscarPorId(notaatt)
                let coluna = this.prompt('O que quer atualizar: ')
                let registro = this.prompt('Para o que deseja atualizar: ')

                try {
                    await this.nota.atualizarNota(notaatt, coluna, registro)
                    console.log('Nota atualizada')
                }
                catch (e) {
                    console.log(e.message)
                }
                return this.notaMenu()

            case '6':
                console.log("Saindo...")
                break;

            default:
                console.log("Opção inválida.")
                this.notaMenu()
        }
    }
}
