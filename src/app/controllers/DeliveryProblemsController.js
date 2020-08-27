import * as Yup from 'yup';

import DeliveryProblems from '../models/DeliveryProblems'
import Order from '../models/Order'

class DeliveryProblemsController {
    async index(req, res) {
        const deliveryProblems = await DeliveryProblems.findAll({
            attributes: ['delivery_id', 'description'],
            include: [
                {
                    model: Order,
                    as: 'delivery',
                    attributes: ['id', 'product', 'start_date', 'end_date']
                }
            ]
        });

        return res.status(200).json(deliveryProblems);
    }

    async show(req, res) {
        const { id } = req.params;

        const deliveryProblems = await DeliveryProblems.findOne({
            where: {
                delivery_id: id,
            },
            attributes: ['delivery_id', 'description'],
            include: [
                {
                    model: Order,
                    as: 'delivery',
                    attributes: ['id', 'product', 'start_date', 'end_date']
                }
            ]
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

        if (id) {
            const orderExists = await Order.findByPk(id);

            if (!orderExists) {
                return res.status(400).json({ error: 'Order not exists!' });
            }
        }

        const { description } = req.body;

        const deliveryProblems = await DeliveryProblems.create({
            delivery_id: id,
            description,
        });

        return res.json(deliveryProblems);
    }
}

export default new DeliveryProblemsController();