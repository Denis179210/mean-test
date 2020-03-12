import express from 'express';
import { RoleController } from '../../controllers';
import passport from 'passport';

const router = express.Router();

/* GET predefined roles. */

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', RoleController.receiveMany);

export const RoleRouter = router;
