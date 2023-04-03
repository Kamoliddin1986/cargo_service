import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core"

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT

    
    app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`);
        
    });
    } catch (error) {
        console.log(error);        
    }    
}

start();