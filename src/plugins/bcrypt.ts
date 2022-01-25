import fp from 'fastify-plugin'

export interface SupportPluginOptions {}
  

export default fp<SupportPluginOptions>(async (fastify : any, options : any, next : any) => {
    fastify.register(require('fastify-bcrypt'),{
        saltWorkFactor: 15
    });
    fastify.decorate("bcryptHash", async function (password : string) : Promise<string>{
        return await fastify.bcrypt.hash(password);
    });
    fastify.decorate("checkHash", async function (password : string, hashed : string) : Promise<boolean>{
        return await fastify.bcrypt.compare(password, hashed)
    });
});

declare module "fastify"{
    export interface FastifyInterface{
        bcryptHash(password : string) : Promise <string>,
        checkHash(password : string, hashed : string) : Promise <boolean>,
    }
}