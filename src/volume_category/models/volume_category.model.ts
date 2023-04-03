import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface VolumeCategoryCreationAttr {

    name: string
}


@Table({tableName: 'volume-category'})
export class VolumeCategory extends Model<VolumeCategory,VolumeCategoryCreationAttr> {

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
