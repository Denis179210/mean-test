import { User } from '../models';
import { BasicController } from './basic.controller';

class Controller extends BasicController {

  async receive(req, res) {
    try {
      await res.json(req.user);
    } catch (e) {
      console.error(e);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findOneAndUpdate(req.body);
      res.json(user);
    } catch (e) {
      console.error(e);
    }
  }

  async remove(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params._id);
      res.json(user);
    } catch (e) {
      console.error(e);
    }
  }

}

export const UserController = new Controller();
