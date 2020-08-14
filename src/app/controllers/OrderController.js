import { Op } from 'sequelize';
import { parseISO, startOfDay } from 'date-fns';

import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    const { product } = req.body;

    const dateStart = startOfDay(parseISO(new Date()));

    console.log(dateStart);

    return res.json();
  }
}

export default new OrderController();
