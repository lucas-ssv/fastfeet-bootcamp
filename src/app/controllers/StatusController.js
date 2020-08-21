import { isToday, isBefore, parseISO } from 'date-fns';

import Order from '../models/Order';
import Deliverer from '../models/Deliverer';

class StatusController {
    async update(req, res) {
        const { id } = req.params;
        
        const {
            deliveryman_id,
            signature_id,
            start_date,
            end_date,
        } = req.body;

        const order = await Order.findByPk(id);

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

        const orders = await Order.findAll({
            where: {
                deliveryman_id,
            }
        });

        if (!deliveryman_id) {
            return res.status(400).json({ error: 'Deliveryman not exists!' });
        }

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
            start_date,
            end_date
        });

        return res.status(200).json(order);
    }
}

export default new StatusController();