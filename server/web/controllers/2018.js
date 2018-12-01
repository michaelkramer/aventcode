import D from "distraught";

exports.routes = (server: Object) => {
  server.app.get('/', w(async (req: any, res: any) => {
    const name = req.query.name || 'World';

    return res.render('page/index', {
      name,
    });
  }));