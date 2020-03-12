import { User } from '../models';
import * as JWT from 'jsonwebtoken';
import { config } from '../config';

class Controller {

  async signin(req, res) {
    try {
      const token = await Promise.resolve(
        JWT.sign({
          sub: req.user._id,
          exp: Date.now() + (24 * 60 * 60 * 1000)
        }, config.secretKey)
      );
      res.json({token});
    } catch (e) {
      console.error(e);
    }
  }

  async signup(req, res) {
    try {
      const user = await User.create(req.body);
      const token = await Promise.resolve(
        JWT.sign({
          sub: user._id,
          exp: Date.now() + (24 * 60 * 60 * 1000)
        }, config.secretKey)
      );
      res.json({token});
    } catch (e) {
      console.error(e);
    }
  }

}

export const AuthController = new Controller();
