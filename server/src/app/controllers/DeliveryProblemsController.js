import * as Yup from 'yup';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliverer from '../models/Deliverer';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class DeliveryProblemsController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
            'status',
          ],
          include: [
            {
              model: Deliverer,
              as: 'deliveryman',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryProblems = await DeliveryProblems.findAll({
      where: {
        delivery_id: id,
      },
      attributes: ['id', 'delivery_id', 'description', 'created_at'],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
            'status',
          ],
        },
      ],
    });

    if (!deliveryProblems) {
      return res.status(400).json({ error: 'Order not found!' });
    }

    return res.status(200).json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists!' });
    }

    if (order.canceled_at !== null) {
      return res
        .status(401)
        .json({ error: 'This order has already been canceled!' });
    }

    if (order.status === 'ENTREGUE') {
      return res
        .status(400)
        .json({ error: 'This order has already delivered!' });
    }

    const { description } = req.body;

    const deliveryProblems = await DeliveryProblems.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblems);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblems = await DeliveryProblems.findByPk(id);

    if (!deliveryProblems) {
      return res.status(400).json({ error: 'Delivery not exists!' });
    }

    const order = await Order.findByPk(deliveryProblems.delivery_id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists!' });
    }

    if (order.canceled_at) {
      return res.status(400).json({ error: 'Order already canceled' });
    }

    await order.update({
      canceled_at: new Date(),
      status: 'CANCELADA',
    });

    const formatDate = format(
      order.canceled_at,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    /**
     * Email para o entregador falando que a encomenda foi cancelada
     */
    await Queue.add(CancellationMail.key, {
      deliveryProblems,
      formatDate,
    });

    return res
      .status(200)
      .json({ success: 'Delivered problem canceled with success!' });
  }
}

export default new DeliveryProblemsController();
