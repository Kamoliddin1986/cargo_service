
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface CartypeCreationAttr {
    name: string;
    description: string
}

@Table({tableName: 'car_type'})
export class CarType extends Model<CarType,CartypeCreationAttr>{

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
    description: string;
}
