import { Model, DataTypes } from 'sequelize';
import database from '../Configs/config.database';
import { Organization } from './models.Organization';

//Interface for the User
export interface userInterface {
    id?: number,
    Frist_name: string,
    Last_name: string,
    Email: string,
}


export class Users extends Model<userInterface>{}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Frist_name: {
        type: DataTypes.STRING
    },
    Last_name: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING
    }

}, {
    sequelize: database,
    tableName: "Users",
    timestamps: false,
});

//Association between User and Organization.
Organization.hasMany(Users)
Users.belongsTo(Organization)
//Syncing the database.
database.sync({ alter: true })
