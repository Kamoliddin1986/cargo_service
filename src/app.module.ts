


import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {SequelizeModule} from '@nestjs/sequelize'
import { StatusModule } from './status/status.module';
import { Status } from './status/models/status.model';
import { VolumeCategoryModule } from './volume_category/volume_category.module';
import { WeightCategoryModule } from './weight_category/weight_category.module';
import { DriverCargoModule } from './driver_cargo/driver_cargo.module';
import { CarTypeModule } from './car_type/car_type.module';
import { OtpModule } from './otp/otp.module';
import { DriversModule } from './drivers/drivers.module';
import { CargoModule } from './cargo/cargo.module';
import { AdminModule } from './admin/admin.module';
import { Otp } from './otp/models/otp.model';
import { Order } from './order/models/order.model';
import { Admin } from './admin/models/admin.model';
import { VolumeCategory } from './volume_category/models/volume_category.model';
import { WeightCategory } from './weight_category/models/weight_category.model';
import { Driver } from './drivers/models/driver.model';
import { DriverCargo } from './driver_cargo/models/driver_cargo.model';
import { CarType } from './car_type/models/car_type.model';
import { Cargo } from './cargo/models/cargo.model';
import { OrderModule } from './order/order.module';




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
            models: [Status,Otp,Admin,VolumeCategory,WeightCategory,Driver,Order,DriverCargo,CarType,Cargo],
            autoLoadModels: true,
            logging: false
        }),
        StatusModule,
        VolumeCategoryModule,
        WeightCategoryModule,
        DriverCargoModule,
        CarTypeModule,
        OtpModule,
        DriversModule,
        CargoModule,
        AdminModule,
        OrderModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
