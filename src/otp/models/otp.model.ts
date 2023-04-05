
import { Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Order } from "../../order/models/order.Model";
import { Driver } from "../../drivers/models/driver.model";
interface OtpCreatorAttr {
    otp: string;
    expiration_time: Date;
    verified: boolean;
    check: string;

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
    expiration_time: Date;

    @Column({
        type: DataType.STRING,

    })
    check: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    verified: boolean;

    @HasMany(() => Order)
    order: Order

    @HasMany(() => Driver)
    driver: Driver
}
