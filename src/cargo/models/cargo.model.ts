import { BelongsTo, Column, DataType,HasMany, ForeignKey, Model, Table } from "sequelize-typescript";
import { WeightCategory } from "../../weight_category/models/weight_category.model";
import { VolumeCategory } from "../../volume_category/models/volume_category.model";
import { Order } from "../../order/models/order.model";
import { Status } from "../../status/models/status.model";
import { DriverCargo } from "../../driver_cargo/models/driver_cargo.model";
interface CargoCreationAttr {
    weight_category_id: number;
    volume_category_id: number;
    loading_location: string;
    unloading_location: string;
    order_id: number;
    loading_date: Date;
    unloading_date: Date;
    status_id: number;
    price: number;
    photo: string;
}

@Table({tableName: 'cargo'})

export class Cargo extends Model<Cargo,CargoCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => WeightCategory)
    @Column({
        type: DataType.INTEGER,
    })
    weight_category_id: number;

    @ForeignKey(() => VolumeCategory)
    @Column({
        type: DataType.INTEGER,
    })
    volume_category_id: number;


    @Column({
        type: DataType.STRING,
    })
    loading_location: string;

    @Column({
        type: DataType.STRING,
    })
    unloading_location: string;


    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
    })
    order_id: number;


    @Column({
        type: DataType.DATE,
    })
    loading_date: Date;


    @Column({
        type: DataType.DATE,
    })
    unloading_date: Date;

    
    @ForeignKey(() => Status)
    @Column({
        type: DataType.INTEGER,
    })
    status_id: number;

    @Column({
        type: DataType.INTEGER,
    })
    price: number;

    @Column({
        type: DataType.STRING,
    })
    photo: string;

    @BelongsTo(() => WeightCategory)
    weight_category: WeightCategory[]


    @BelongsTo(() => VolumeCategory)
    volume_category: VolumeCategory[]


    @BelongsTo(() => Status)
    status: Status[]

    @BelongsTo(() => Order)
    order: Order[]

    @HasMany(() => DriverCargo)
    driver_cargo: DriverCargo[]
}
