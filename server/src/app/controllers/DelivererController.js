import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import Deliverer from '../models/Deliverer';
import File from '../models/File';

import authConfig from '../../config/auth';

class DelivererController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const deliverer = await Deliverer.findOne({
      where: {
        id,
      },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer not found!' });
    }

    return res.json({
      deliverer,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async show(req, res) {
    const { q, page = 1 } = req.query;

    const deliveryman = await Deliverer.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email'],
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.status(200).json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails!' });
    }

    const { name, email, avatar_id } = req.body;

    const delivererExists = await Deliverer.findOne({
      where: {
        email,
      },
    });

    if (delivererExists) {
      return res.status(401).json({ error: 'Deliverer already exists!' });
    }

    const fileExists = await File.findByPk(avatar_id);

    if (!fileExists) {
      return res.status(400).json({ error: 'File not exists!' });
    }

    const deliverer = await Deliverer.create({
      name,
      email,
      avatar_id,
    });

    await deliverer.reload({
      attributes: ['name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json(deliverer);
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
        },
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
