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
    accountSid: 'AC089ca578406ecab71ddca13b6239aa19',
    authToken: '048383ef22fd6603c767804ece711a52',
    from: '',
  }
};

module.exports.SEED = 'argus-backend-seed';
//twilio: {
//  accountSid: 'AC5c825244966dedd253cb2083e2701ab5',
//  authToken: 'b27f5486bb8eae140ab7940e9c084f7a',
//}