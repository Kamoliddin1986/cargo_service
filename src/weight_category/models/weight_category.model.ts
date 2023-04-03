
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface WeightCategoryCreationAttr {

    name: string
}

@Table({tableName: 'weight-category'})
export class WeightCategory extends Model<WeightCategory,WeightCategoryCreationAttr> {

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
