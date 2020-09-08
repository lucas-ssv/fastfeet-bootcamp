import { isToday, isBefore, parseISO } from 'date-fns';

import Order from '../models/Order';
import File from '../models/File';
import Deliverer from '../models/Deliverer';
import Recipient from '../models/Recipient';

class StatusController {
    async update(req, res) {
        const { id, deliveryman_id } = req.params;
        
        const { signature_id } = req.body;

        const signatureExists = await File.findByPk(signature_id);

        if (!signatureExists) {
            return res.status(400).json({ error: 'Signature not exists!' });
        }

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(400).json({ error: 'Order not exists!' });
        }

        const deliveryman = await Deliverer.findByPk(deliveryman_id);

        if (!deliveryman) {
            return res.status(400).json({ error: 'Deliveryman not exists!' });
        }

        const orders = await Order.findAll({
            where: {
                deliveryman_id,
            }
        });

        let countOrderDelivered = 0;

        orders.forEach(order => {
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
            signature_id,
        });

        await order.reload({
            attributes: [
                'product', 
                'canceled_at', 
                'start_date', 
                'end_date', 
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
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['name', 'path', 'url']
                }
              ]
        });

        return res.status(200).json(order);
    }
}

export default new StatusController();