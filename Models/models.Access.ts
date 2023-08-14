import {Model, DataTypes} from 'sequelize';
import database from '../Configs/config.database';

//Interface for the Access
export interface accessInterface{
    id:number,
    Access_name:string    
}

export class Access extends Model <accessInterface>{}

//INIT Method for Access class.
Access.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    Access_name: {
        type:DataTypes.STRING,
    },
},{
    sequelize:database,
    tableName:"access",
    timestamps: false,
});
