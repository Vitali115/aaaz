// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Attachments, Requests, Users } = initSchema(schema);

export {
  Attachments,
  Requests,
  Users
};