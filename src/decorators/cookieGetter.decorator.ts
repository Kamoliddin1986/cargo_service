import {
    ExecutionContext,
    UnauthorizedException,
    createParamDecorator,
} from '@nestjs/common'



export const CookieGetter = createParamDecorator(
    async (data:  'refresh_token', context: ExecutionContext): Promise<string> => {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies[data];
        if(!refreshToken) {
            throw new UnauthorizedException('Tken is not founded')
        }
        return refreshToken
    }
)


