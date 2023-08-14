import { Model, DataTypes } from 'sequelize';
import database from '../Configs/config.database';
import { Access } from './models.Access';
import { Users } from './models.Users';

//Interface for the User Access
interface userAccessInterface {
    id: number,
}

export class UserAccess extends Model<userAccessInterface>{}

UserAccess.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "User_Access",
    timestamps: false,
});

//Association between User and User access.
Users.hasMany(UserAccess)
UserAccess.belongsTo(Users)
//Association between Assess and User access.
Access.hasMany(UserAccess)
UserAccess.belongsTo(Access)
