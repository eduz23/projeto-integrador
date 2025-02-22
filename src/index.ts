/*import { Client, Pool } from "pg";
import { Database } from "./repository/database";
import { Cliente } from "./entity/alunos";
import { ClienteRepository } from "./repository/AlunoRepository";
import { ClienteService } from "./service.ts/ClienteService";
 */

import { Aluno } from "./entity/alunos"
import { ProfessorView } from "./view/ProfessoresView"
import { AlunoService } from "./service.ts/AlunoService"
import { NotaService } from "./service.ts/NotaService"
import { ProfessorService } from "./service.ts/ProfessoresService"
import { AlunoView } from "./view/AlunoView"
import { NotasView } from "./view/NotasView"


/* async function testConnection() {
   try {
     const client = await pool.connect();
     console.log('Conexão bem-sucedida com o banco');
     client.release(); // Libera o cliente para reutilização
   } catch (error) {
     console.error('Erro ao conectar ao banco:', error);
   }
}*/

/*const aluno = new AlunoService()

async function listaAlunos() {
  console.table(await servico.listarAlunos())
}
listaAlunos()


async function buscarPorId() {
  console.table(await servico.buscarPorId('2'))
}
buscarPorId()

async function criarAluno() {
  await servico.inserirAluno("9", "marcos", 16, "3b")
  listaAlunos()
}
criarAluno()*/


/*const professor = new ProfessorService()

async function listaProfessores() {
  console.table(await professor.listarProfessores())
}
listaProfessores()


async function validarTelefoneCriarProfessor(){
  await professor.validarTelefone("6", "jonas", "Dança", "5193")
}
validarTelefoneCriarProfessor()
*/

/*const nota = new NotaService()

async function listaNotas() {
  console.table(await servico2.listarNotas())
}
listaNotas()*/

//const professorView = new ProfessorView()
//professorView.professorMenu()

//const alunoView = new AlunoView
//alunoView.alunoMenu()

const notaView = new NotasView()
notaView.notaMenu()