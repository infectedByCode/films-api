import knex from 'knex';

interface Film {
  uid: string;
  title: string;
  description: string;
  year: number;
  keywords: string;
}

interface User {
  uid: string;
  email: string;
  username: string;
}

interface UserCredentials {
  readonly id: number;
  username: string;
  password: string;
}

declare module 'knex/types/tables' {
  interface Tables {
    films: Film;
    users: User;
    user_creds: UserCredentials;
  }
}
