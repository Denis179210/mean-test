import { Role } from '../models';

class Controller {
  async receiveMany(req, res) {
    try {
      res.json({roles: await Role.find().exec()});
    } catch (e) {
      console.log(e);
    }
  }
}

export const RoleController = new Controller();
