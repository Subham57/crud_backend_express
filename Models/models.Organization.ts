import {Model, DataTypes} from 'sequelize';
import database from '../Configs/config.database';

//Interface for the Organization class
interface organizationInterface{
    id:number,
    Org_name:string    
}

export class Organization extends Model <organizationInterface>{}

Organization.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    Org_name: {
        type:DataTypes.STRING
    },
},{
    sequelize:database,
    tableName:"organization",
    timestamps: false,
});
