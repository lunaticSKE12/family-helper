import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class List {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly listItems?: (ListItem | null)[];
  constructor(init: ModelInit<List>);
  static copyOf(source: List, mutator: (draft: MutableModel<List>) => MutableModel<List> | void): List;
}

export declare class ListItem {
  readonly id: string;
  readonly title: string;
  readonly quantity?: number;
  readonly done?: boolean;
  readonly list?: List;
  readonly actions?: (Action | null)[];
  constructor(init: ModelInit<ListItem>);
  static copyOf(source: ListItem, mutator: (draft: MutableModel<ListItem>) => MutableModel<ListItem> | void): ListItem;
}

export declare class Action {
  readonly id: string;
  readonly action?: string;
  readonly listItem?: ListItem;
  constructor(init: ModelInit<Action>);
  static copyOf(source: Action, mutator: (draft: MutableModel<Action>) => MutableModel<Action> | void): Action;
}