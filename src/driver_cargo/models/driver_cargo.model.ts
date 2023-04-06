import { BelongsTo, Column, DataType,HasMany, ForeignKey, Model, Table } from "sequelize-typescript";
import { Driver } from "../../drivers/models/driver.model";
import { Cargo } from "../../cargo/models/cargo.model";
import { Status } from "../../status/models/status.model";
import { ApiTags } from "@nestjs/swagger";


interface DriverCargoCreationAttr {
    driver_id: number;
    cargo_id: number;
    status_id: number
}
@ApiTags('driver_cargo')
@Table({tableName: 'driver_cargo'})
export class DriverCargo extends Model<DriverCargo, DriverCargoCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Driver)
    @Column({
        type: DataType.INTEGER,
    })
    driver_id: number;
    
    @ForeignKey(() => Cargo)
    @Column({
        type: DataType.INTEGER,
        
    })
    cargo_id: number;


    @ForeignKey(() => Status)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 2
    })
    status_id: number;

    @BelongsTo(() => Cargo)
    cargo: Cargo[]
    
    @BelongsTo(() => Driver)
    driver: Driver[]

    @BelongsTo(() => Status)
    status: Status[]
}
