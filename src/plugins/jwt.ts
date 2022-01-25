import fp from 'fastify-plugin'

require("dotenv").config();

export default fp(async function( fastify : any , options : any, next : any) {
    fastify.register(require('fastify-jwt'), {
        secret: process.env.TOKEN
    });
    fastify.decorate('createNewToken', async (payload : any, expires? : string) => {
        if(expires){
            return fastify.jwt.sign({payload}, {expires});
        }
        else{
            return fastify.jwt.sign({payload});
        }
    })
});

declare module "fastify" {
    export interface FastifyInstance{
        createNewToken(payload: any, expires: string) : Promise<string>
    }
}