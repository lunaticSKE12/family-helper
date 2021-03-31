// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { List, ListItem, Action } = initSchema(schema);

export {
  List,
  ListItem,
  Action
};