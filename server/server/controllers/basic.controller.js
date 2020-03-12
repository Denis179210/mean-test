export class BasicController {

  async unknown(req, res) {
    res.status(404).end('Unknown resource');
  }

}
