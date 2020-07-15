import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
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
    const recipient = await Recipient.findByPk(req.userId);

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
