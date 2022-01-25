/*import userctl from './userController';
import {userSchema} from "./userSchema";

export default async (fastify : any) => {
    const userController = userctl(fastify);
    fastify.route({
        method: 'GET',
        url: '/getAll',
        schema: userSchema,
        handler: userController.showUser
    });
  }
*/