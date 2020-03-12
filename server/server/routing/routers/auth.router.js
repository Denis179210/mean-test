import express from 'express';
import passport from 'passport';
import { AuthController } from '../../controllers';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/signin', passport.authenticate('local', {session: false}) , AuthController.signin);

export const AuthRouter = router;
