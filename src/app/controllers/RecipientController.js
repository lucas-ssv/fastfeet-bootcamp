import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required()
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
}

export default new RecipientController();
