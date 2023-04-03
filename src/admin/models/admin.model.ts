import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface AdminCreationAttr{
    name: string;
    login: string;
    hashed_password: string;
    hashed_refresh_token: string;
    is_creator: string;
    is_active: string;

}


@Table({tableName: 'admin'})
export class Admin extends Model<Admin,AdminCreationAttr>{


    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    login: string;


    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_creator: string;


    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: string;
}
