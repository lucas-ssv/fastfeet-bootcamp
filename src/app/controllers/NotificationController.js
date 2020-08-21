import { Op } from 'sequelize';

import Order from '../models/Order';

class NotificationController {
    async index(req, res) {
        const { id } = req.params;

        const order = await Order.findAll({
            where: {
                deliveryman_id: id,
                end_date: null,
                [Op.or]: [
                    {
                        canceled_at: null,
                    }
                ]
            },
        });

        if (!order) {
            return res.status(400).json({ error: 'Not found orders delivered!' });
        }

        return res.json(order);
    }

    async show(req, res) {
        const { id } = req.params;

        const order = await Order.findAll({
            where: {
                deliveryman_id: id,
                [Op.not]: [
                    {
                        end_date: null
                    }
                ]
            }
        });

        return res.status(200).json(order);
    }
}

export default new NotificationController();