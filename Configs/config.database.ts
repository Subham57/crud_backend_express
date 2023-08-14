import { Sequelize } from "sequelize";

//Creating a database connection with the user name and password
const database  = new  Sequelize('project', 'root','root',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default database;