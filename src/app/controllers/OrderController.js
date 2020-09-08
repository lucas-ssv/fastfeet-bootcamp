import { isBefore, parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import * as Yup from 'yup';

import Order from '../models/Order';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';

import Notification from '../schemas/Notification';

import Mail from '../../lib/Mail';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const order = await Order.finddAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'product', 
        'canceled_at',
        'start_date', 
        'end_date', 
        'signature_id'
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
            'zipcode'
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
              attributes: ['name', 'path', 'url']
            }
          ]
        }
      ]
    });

    return res.status(200).json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { 
      recipient_id, 
      deliveryman_id, 
      product,
    } = req.body;

    const start_date = new Date();

    const dateStart = parseISO(start_date);

    // Check if date already passed
    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    // Check if hour are between 8:00am and 18:00pm
    if (dateStart.getHours() < 8 || dateStart.getHours() > 18) {
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
    const deliveryman = await Deliverer.findOne({
      where: {
        id: deliveryman_id,
      }
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists!' });
    }

    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product,
      start_date,
    });

    const formatDate = format(
      start_date,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );
    
    /**
     * Notify deliveryman
     */
    const recipient = await Recipient.findByPk(recipient_id);

    await Notification.create({
      content: `Nova encomenda de ${product} para ${recipient.name} já está disponível para retirada.`,
      user: deliveryman_id
    });

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Nova encomenda de ${recipient.name}.`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.6; color: #222; max-width: 600px;">
          <strong>Olá, ${deliveryman.name}</strong>
          <p>Há uma nova encomenda. Confira os detalhes:</p>
          <p>
              <strong>Cliente: </strong> ${recipient.name} <br />
              <strong>Encomenda: </strong> ${product} <br />
              <strong>Data/Hora: </strong> ${formatDate} <br />
              <br />
              Equipe FastFeet      
          </p>
        </div>
      `,
    });

    await order.reload({
      attributes: ['id', 'product', 'start_date'],
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
          ]
        },
        {
          model: Deliverer,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url']
            }
          ]
        }
      ]
    });

    return res.json(order);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists!' });
    }

    const end_date = new Date();

    if (isBefore(end_date, new Date()) || end_date < order.start_date) {
      return res.status(400).json({ error: 'Past date is not permitted!' });
    }

    await order.update({
      end_date,
    });

    await order.reload({
      attributes: [
        'product', 
        'canceled_at', 
        'start_date', 
        'end_date', 
        'signature_id'
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
            'zipcode'
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
              attributes: ['name', 'path', 'url']
            }
          ]
        }
      ]
    });

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
