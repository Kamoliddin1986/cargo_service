
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";


interface StatusCreationAttr {
    name: string
}
@Table({tableName: 'status'})
export class Status extends Model<Status,StatusCreationAttr> {
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

}
