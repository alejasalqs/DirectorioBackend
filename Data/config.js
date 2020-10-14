module.exports = {
  database: {
    DB_USERNAME: 'admin',
    DB_PASSWORD: '..perrito1',
    DB_NAME: 'Directorio',
    DB_HOST: '127.0.0.1',
    DB_INSTANCE_NAME: 'MSSQLSERVER',
  },
  correo: {
    USER: 'notificaciones@argus-salud.com',
    PASS: '4dministrA',
    FROM: 'notificaciones@argus-salud.com'
  },
  twilio: {
    accountSid: '',
    authToken: '',
    from: '',
  }
};

module.exports.SEED = 'argus-backend-seed';
