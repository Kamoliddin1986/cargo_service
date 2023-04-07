import { CanActivate, Injectable, ExecutionContext, UnauthorizedException, ForbiddenException, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';


@Injectable()
export class isOrderSelfGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(
        context: ExecutionContext,
    ){
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new UnauthorizedException({
                message: 'token yuq'
            })
        }

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer !== 'Bearer' || !token){
            throw new UnauthorizedException({
                message: "Tokenda hatolik"
            });
        }

    
        let user: any;
        try {
            user = await this.jwtService.verifyAsync(token, {secret:process.env.ACCESS_TOKEN_KEY})
        } catch (error) {
            throw new UnauthorizedException({
                message: "Token xato"
            })
        } 

        // console.log('Is Admin>>>>>>>',user);
        
        if(user.role != 'order'){

            throw new ForbiddenException({
                message: "Siz buyurtmachi emassiz"
            })
            
            
        }
        
        if(req.params.id != user.id){
            throw new ForbiddenException ({
                massage: "Ruxsat etilmagan order"
            })
        }


        return true
    } 
}