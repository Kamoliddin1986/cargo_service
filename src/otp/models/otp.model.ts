
import { Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Order } from "../../order/models/order.Model";
import { Driver } from "../../drivers/models/driver.model";
interface OtpCreatorAttr {
    otp: string;
    expiretion_time: Date;
    verified: boolean
}

@Table({tableName: 'otp'})
export class Otp extends Model<Otp, OtpCreatorAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    otp: string;

    @Column({
        type: DataType.DATE,
    })
    expiretion_time: Date;

    @Column({
        type: DataType.BOOLEAN,
    })
    verified: boolean;

    @HasOne(() => Order)
    order: Order

    @HasOne(() => Driver)
    driver: Driver
}
