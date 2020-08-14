import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init({
      product: Sequelize.STRING,
      canceled_at: Sequelize.DATE,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'id', as: 'recipient_id' });
    this.belongsTo(models.Deliverer, { foreignKey: 'id', as: 'deliveryman_id' });
    this.belongsTo(models.Recipient, { foreignKey: 'id', as: 'signature_id' });
  }
}

export default Order;
