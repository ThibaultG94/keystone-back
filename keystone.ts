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

console.log('ENV', process.env.ENV);

const dbConfig = process.env.DB_CONFIG
  ? process.env.DB_CONFIG
  : "";

console.log("dbConfig", dbConfig);

const dbObject:any = process.env.ENV === "dev" ? {
  provider: 'sqlite',
  url: 'file:./keystone.db',
} : {
  provider: 'mysql',
  url: dbConfig,
};

console.log('dbObject', dbObject);

export default withAuth(
  config({
    db: dbObject,
    lists,
    session,
  })
);
