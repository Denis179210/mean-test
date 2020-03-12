import express from 'express';
import passport from 'passport';
import { UserController } from '../../controllers';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/me', UserController.receive);
router.patch('/', UserController.update);
router.delete('/', UserController.remove);
router.get('/*', UserController.unknown);

export const UserRouter = router;
