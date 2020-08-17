import * as Yup from 'yup';

import Deliverer from '../models/Deliverer';

class DelivererController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliverers = await Deliverer.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email', 'avatar_id'],
    });

    return res.json(deliverers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const delivererExists = await Deliverer.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (delivererExists) {
      return res.status(401).json({ error: 'Deliverer already exists!' });
    }

    const { id, name, email } = await Deliverer.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { email } = req.body;

    const deliverer = await Deliverer.findByPk(req.params.id);

    if (email && email == deliverer.email) {
      const delivererExists = await Deliverer.findOne({
        where: {
          email,
        }
      });

      if (delivererExists) {
        return res.status(400).json({ error: 'User already exists!' });
      }
    }

    const { id, name, avatar_id } = await deliverer.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliverer = await Deliverer.findByPk(req.params.id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer not exists!' });
    }

    await deliverer.destroy();

    return res.json(deliverer);
  }
}

export default new DelivererController();
