import { routes } from './routes';

export class Routing {

  constructor(
    routes
  ) {
    this.routes = routes;
  }

  generate(app) {
    this.routes.forEach((route) => {
      app.use(route.path, route.controller);
    })
  }

}

export const AppRouting = new Routing(routes);
