import path from 'path';

class Controller {
  async redirectToHome(req, res,) {
    try {
      res.sendFile(path.resolve('public/client', 'index.html'));
    } catch (e) {
      console.log(e);
    }
  }
}

export const RootController = new Controller();
