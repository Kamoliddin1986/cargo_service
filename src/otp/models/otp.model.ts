
import { INTEGER } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
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
    name: string;

    @Column({
        type: DataType.DATE,
    })
    expiretion_time: Date;

    @Column({
        type: DataType.BOOLEAN,
    })
    verified: boolean;
}
