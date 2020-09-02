import * as Yup from 'yup';

import DeliveryProblems from '../models/DeliveryProblems'
import Order from '../models/Order'

import Mail from '../../lib/Mail';
import Deliverer from '../models/Deliverer';

class DeliveryProblemsController {
    async index(req, res) {
        const deliveryProblems = await DeliveryProblems.findAll({
            attributes: ['delivery_id', 'description'],
            include: [
                {
                    model: Order,
                    as: 'delivery',
                    attributes: ['id', 'product', 'canceled_at' ,'start_date', 'end_date'],
                    include: [
                        {
                            model: Deliverer,
                            as: 'deliveryman',
                            attributes: ['name', 'email']
                        }
                    ]
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
                    attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date']
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

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(400).json({ error: 'Order not exists!' });
        }

        if (order.canceled_at !== null) {
            return res
                .status(401)
                .json({ error: 'This order has already been canceled!' });
        }

        const { description } = req.body;

        const deliveryProblems = await DeliveryProblems.create({
            delivery_id: id,
            description,
        });

        order.canceled_at = new Date();

        await order.save();

        return res.json(deliveryProblems);
    }

    async delete(req, res) {
        const { id } = req.params;

        const deliveryProblems = await DeliveryProblems.findByPk(id, {
            include: [
                {
                    model: Order,
                    as: 'delivery',
                    include: [
                        {
                            model: Deliverer,
                            as: 'deliveryman',
                            attributes: ['name', 'email'],
                        }
                    ]
                }
            ]
        });

        if (!deliveryProblems) {
            return res.status(400).json({ error: "Delivery not exists!" });
        }

        /**
         * Email para o entregador falando que a encomenda foi cancelada
         */
        await Mail.sendMail({
            to: `${deliveryProblems.delivery.deliveryman.name} <${deliveryProblems.delivery.deliveryman.email}>`,
            subject: 'Encomenda cancelada.',
            text: `${deliveryProblems.description}`,
        });

        await deliveryProblems.destroy();

        return res.status(200).json({ success: "Delivered problem canceled with success!" });
    }
}

export default new DeliveryProblemsController();