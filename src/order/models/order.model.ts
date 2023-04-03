import { BelongsTo, Column, DataType,HasMany, ForeignKey, Model, Table } from "sequelize-typescript";
import { Otp } from "../../otp/models/otp.model";
interface OrderCreationAttr {
    first_name: string;
    last_name: string;
    email: string;
    hashed_password: string;
    hashed_refresh_token: string;
    is_active: boolean;
    phone: string;
    otp_id: number;

}


@Table({tableName: 'order'})
export class Order extends Model<Order,OrderCreationAttr>{
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
    email: string;

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

    @Column({
        type: DataType.STRING,
    })
    phone: string;


    @ForeignKey(() => Otp)
    @Column({
        type: DataType.INTEGER,
    })
    otp_id: number;
    

    @BelongsTo(() => Otp)
    otp: Otp
}
