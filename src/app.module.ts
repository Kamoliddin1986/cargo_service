


import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {SequelizeModule} from '@nestjs/sequelize'
import { StatusModule } from './status/status.module';
import { Status } from './status/models/status.model';
import { OrdersModule } from './orders/orders.module';
import { VolumeCategoryModule } from './volume_category/volume_category.module';
import { WeightCategoryModule } from './weight_category/weight_category.module';
import { DriverCargoModule } from './driver_cargo/driver_cargo.module';
import { CarTypeModule } from './car_type/car_type.module';
import { OtpModule } from './otp/otp.module';
import { DriversModule } from './drivers/drivers.module';
import { CargoModule } from './cargo/cargo.module';
import { AdminModule } from './admin/admin.module';
import { Otp } from './otp/models/otp.model';




@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [Status,Otp],
            autoLoadModels: true,
            logging: true
        }),
        StatusModule,
        OrdersModule,
        VolumeCategoryModule,
        WeightCategoryModule,
        DriverCargoModule,
        CarTypeModule,
        OtpModule,
        DriversModule,
        CargoModule,
        AdminModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
