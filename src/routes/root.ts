import { FastifyPluginAsync } from 'fastify'
import userController from '../api/Users/userController';

const {userSchema,registerUserSchema,loginUserSchema, logoutUserSchema} = require("../api/Users/userSchema");

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const userCtl = userController(fastify);
  fastify.route({
    method: 'GET',
    url: '/showAll',
    schema: userSchema,
    handler: userCtl.showAll

  });
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerUserSchema,
    handler: userCtl.register
  });
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginUserSchema,
    handler: userCtl.login
  })
  fastify.route({
    method: 'GET',
    url: '/logout/:username',
    schema: logoutUserSchema,
    handler: userCtl.logout
  })
  fastify.route({
    method: 'GET',
    url: '/follow/:currentUserUsername/:followUserUsername',
    schema: logoutUserSchema,
    handler: userCtl.follow
  })
}

export default root;


