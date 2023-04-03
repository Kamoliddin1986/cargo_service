
import { BelongsTo, Column, DataType,HasMany, ForeignKey, Model, Table } from "sequelize-typescript";
import { CarType } from "../../car_type/models/car_type.model";
import { Otp } from '../../otp/models/otp.model';
import { VolumeCategory } from '../../volume_category/models/volume_category.model';
import { WeightCategory } from '../../weight_category/models/weight_category.model';
import { Status } from '../../status/models/status.model';
import { DriverCargo } from '../../driver_cargo/models/driver_cargo.model';

interface DriverCreationAttr {
    first_name: string;
    last_name: string;
    phone: string;
    hashed_password: string;
    hashed_refresh_token: string;
    is_active: boolean;
    weight_category_id: number;
    car_type_id: number;
    otp_id: number;
    volume_category_id: number;
}

@Table({tableName: 'driver'})

export class Driver extends Model<Driver,DriverCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    first_name: string;


    @Column({
        type: DataType.STRING,
    })
    last_name: string;

    @Column({
        type: DataType.STRING,
    })
    phone: string;

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
    })
    is_active: boolean;

    @ForeignKey(() => WeightCategory)
    @Column({
        type: DataType.INTEGER,
    })
    weight_category_id: number;


    @ForeignKey(() => CarType)
    @Column({
        type: DataType.INTEGER,
    })
    car_type_id: number;

    @ForeignKey(() => Otp)
    @Column({
        type: DataType.INTEGER,
    })
    otp_id: number;

    @ForeignKey(() => VolumeCategory)
    @Column({
        type: DataType.INTEGER,
    })
    volume_category_id: number;


    @BelongsTo(() => WeightCategory)
    weight_category: WeightCategory[]

    @BelongsTo(() => VolumeCategory)
    volume_category: VolumeCategory[]

    @BelongsTo(() => Otp)
    otp: Otp[]

    @HasMany(() => DriverCargo)
    driver_cargo: DriverCargo[]
}
