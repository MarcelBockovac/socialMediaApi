import fp from 'fastify-plugin'
// import { User } from '../../api/Users/userModel';
import {User} from "../api/Users/userModel";
require("dotenv").config()

export interface SupportPluginOptions {}

export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.register(require('fastify-typeorm-plugin'), {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true,
    logging: true

  });
});
