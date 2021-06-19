export interface Relation {
  from_database: string;
  from_table: string;
  to_database: string;
  to_table: string;
  path: string;
  '1-N?': boolean;
}
