// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import "dotenv/config";
import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

const dbConfig = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : "";

const dbObject:any = process.env.ENV === "prod" ? {
  provider: 'mysql',
  url: dbConfig,
} : {
  provider: 'sqlite',
  url: 'file:./keystone.db',
};

console.log("DATABASE CONFIGURATION");
console.log(process.env.DATABASE_URL, "DATABASE URL");
console.log(process.env.ENV, "ENVIRONMENT");
console.log(dbObject, "DB OBJECT");
console.log(process.env.FRONTEND_URL, "FRONTEND URL");

export default withAuth(
  config({
    db: dbObject,
    lists,
    session,
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
      port: 3000,
    },
  })
);
