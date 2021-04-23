import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { id } = req.params;

    const recipientsExists = await Recipient.findByPk(id);

    if (!recipientsExists) {
      return res.status(400).json({ error: 'Recipient not exists!' });
    }

    const recipient = await Recipient.findOne({
      limit: 20,
      attributes: [
        'id',
        'name',
        'address',
        'number',
        'complement',
        'state',
        'city',
        'zipcode',
      ],
      where: {
        id,
      },
    });

    return res.status(200).json(recipient);
  }

  async show(req, res) {
    const { q, page = 1 } = req.query;

    const recipient = await Recipient.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'name',
        'address',
        'number',
        'complement',
        'state',
        'city',
        'zipcode',
      ],
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
    });

    return res.status(200).json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const {
      id,
      name,
      address,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      address,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    const {
      name,
      address,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await recipient.update(req.body);

    return res.status(200).json({
      name,
      address,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not exists!' });
    }

    await recipient.destroy();

    return res.status(200).json({ success: 'Recipient deleted with success' });
  }
}

export default new RecipientController();
