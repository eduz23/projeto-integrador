import { Pool } from "pg";

//const { Pool } = require('pg')
 
export class Database{
  static pool: Pool

  static iniciarConexao():Pool{

    this.pool = new Pool({

    user: 'postgres',      
    host: 'localhost',        
    database: 'Projeto_integrador',  
    password: '1234',    
    port: 5432      

    })

    return this.pool
  }
}

