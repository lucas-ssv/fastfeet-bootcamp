const bcrypt = require('bcryptjs');

'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users', [{
      name: 'Distribuidora Fast Feet',
      email: 'admin@fastfeet.com.br',
      password_hash: bcrypt.hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async () => {}
};
