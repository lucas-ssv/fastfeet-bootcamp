import { isToday, isBefore, parseISO } from 'date-fns';

import Order from '../models/Order';
import File from '../models/File';
import Deliverer from '../models/Deliverer';
import Recipient from '../models/Recipient';

class StatusController {
  async update(req, res) {
    const { id, deliveryman_id } = req.params;

    const { signature_id, end_date } = req.body;

    if (end_date) {
      const signatureExists = await File.findByPk(signature_id);

      if (!signatureExists) {
        return res.status(400).json({ error: 'Signature not exists!' });
      }
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists!' });
    }

    if (order.status === 'CANCELADA') {
      return res.status(400).json({ error: 'Order was canceled!' });
    }

    if (order.status === 'ENTREGUE') {
      return res
        .status(400)
        .json({ error: 'This order has already delivered!' });
    }

    const start_date = new Date();

    const dateStart = parseISO(start_date);

    if (isBefore(end_date, new Date()) || end_date < start_date) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    // Check if date already passed
    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    // Check if hour are between 8:00am and 18:00pm
    if (dateStart.getHours() < 8 || dateStart.getHours() > 18) {
      return res.status(401).json({
        error: 'The orders can be only placed between 8:00am to 18:00pm',
      });
    }

    const deliveryman = await Deliverer.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists!' });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id,
      },
    });

    let countOrderDelivered = 0;

    orders.forEach((order) => {
      if (isToday(order.start_date)) {
        countOrderDelivered++;

        if (countOrderDelivered > 5) {
          return res
            .status(400)
            .json({ error: 'Number of orders withdrawals by day held!' });
        }
      }
    });

    await order.update({
      signature_id: end_date ? signature_id : null,
      start_date: !signature_id && !end_date ? start_date : null,
      end_date,
      status: end_date ? 'ENTREGUE' : 'RETIRADA',
    });

    await order.reload({
      attributes: [
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address',
            'number',
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: Deliverer,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.status(200).json(order);
  }
}

export default new StatusController();
