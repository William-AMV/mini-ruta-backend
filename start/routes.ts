/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import UsersController from '#controllers/users_controller';
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';
import { RoleEnum } from '../app/patterns/role_enum.js';
import StopsController from '#controllers/places_controller';

router.get('/', async () => {
  return {
    hello: 'MINIRUTA - ORURO - 2025',
  }
})

router.post('auth/verifyEmail', [AuthController, 'verifyEmail']);
router.post('login', [AuthController, 'login']);

router.group(() => {
  router.get('authUser', [AuthController, 'authUser']);
  router.post('auth/logout', [AuthController, 'logout']);

  router.resource("places", StopsController).apiOnly().except(['show']);

   router.group(() => {
    router.resource("users", UsersController).apiOnly().except(['show']);
  }).middleware(middleware.role([RoleEnum.ADMINISTRATOR]));
}).middleware(middleware.auth());