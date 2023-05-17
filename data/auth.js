import SQ from 'sequelize'
import { sequelize } from '../db/database.js'
const DataTypes = SQ.DataTypes

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT,
        // regdate: 날짜타입, 현재시간을 자동으로 등록
        regdate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {timestamps: false}
)


export async function findByUsername(username){
    return User.findOne({where: {username}})
} 

export async function createUser(user){
    return User.create(user).then((data) => data.dataValues.id)
}   

export async function findById(id){
    return User.findByPk(id)
}