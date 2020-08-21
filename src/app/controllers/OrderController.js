import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';

import Notification from '../schemas/Notification';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const order = await Order.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.status(200).json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { 
      recipient_id, 
      deliveryman_id, 
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = req.body;

    const dateStart = parseISO(start_date);
    const dateEnd = parseISO(end_date);

    // Check if date already passed
    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    if (isBefore(dateEnd, new Date()) || dateEnd < dateStart) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    // Check if hour are between 8:00am and 18:00pm
    if (dateStart.getHours() < 8 || dateEnd.getHours() > 18) {
      return res
        .status(401)
        .json({ error: 'The orders can be only placed between 8:00am to 18:00pm' });
    }

    // Check if recipient exists
    const recipientExists = await Recipient.findOne({
      where: {
        id: recipient_id,
      }
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not exists' });
    }

    // Check if deliveryman exists
    const deliverymanExists = await Deliverer.findOne({
      where: {
        id: deliveryman_id,
      }
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not exists!' });
    }

    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
    
    /**
     * Notify deliveryman
     */
    const recipient = await Recipient.findByPk(recipient_id);

    await Notification.create({
      content: `Nova encomenda de ${product} para ${recipient.name} já está disponível para retirada.`,
      user: deliveryman_id
    });

    return res.json(order);
  }

  async update(req, res) {
    const {
      recipient_id, 
      deliveryman_id, 
      signature_id,
      product,
      start_date,
      end_date,
    } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists!' });
    }

    const dateStart = parseISO(start_date);
    const dateEnd = parseISO(end_date);

    // Check if date already passed
    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    if (isBefore(dateEnd, new Date()) || dateEnd < dateStart) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    // Check if hour are between 8:00am and 18:00pm
    if (dateStart.getHours() < 8 || dateEnd.getHours() > 18) {
      return res
        .status(401)
        .json({ error: 'The orders can be only placed between 8:00am to 18:00pm' });
    }

    // // Check if recipient exists
    // const recipientExists = await Recipient.findOne({
    //   where: {
    //     id: recipient_id,
    //   }
    // });

    // if (!recipientExists) {
    //   return res.status(400).json({ error: 'Recipient not exists' });
    // }

    // // Check if deliveryman exists
    // const deliverymanExists = await Deliverer.findOne({
    //   where: {
    //     id: deliveryman_id,
    //   }
    // });

    // if (!deliverymanExists) {
    //   return res.status(400).json({ error: 'Deliveryman not exists!' });
    // }

    await order.update(req.body);

    return res.status(200).json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists!' });
    }

    await order.destroy();

    return res.status(200).json(order);
  }
}

export default new OrderController();
