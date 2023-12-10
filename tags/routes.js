import * as dao from './daos.js';

function TagsRoutes(app) {
  const wrapAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
  }
  
  app.get('/api/tags/:id', wrapAsync(async (req, res) => {
    const user = await dao.findUserById(req.params.id);
    req.status(200).json(user);
  }));
}

export default TagsRoutes;