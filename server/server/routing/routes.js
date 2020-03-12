import { AuthRouter, RecordRouter, RootRouter, UserRouter } from './routers';
import { RoleRouter } from './routers';

export const routes = [
  {
    path: '/api/v3/auth',
    controller: AuthRouter
  },
  {
    path: '/api/v3/user',
    controller: UserRouter
  },
  {
    path: '/api/v3/role',
    controller: RoleRouter
  },
  {
    path: '/api/v3/record',
    controller: RecordRouter
  },
  {
    path: '/*',
    controller: RootRouter
  },
];
