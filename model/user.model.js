const bcrypt = require('bcrypt');
const db = require('../config/database');
db.connect();
const UserModel = {
    register: function (data, callback) {
        const pwd = bcrypt.hashSync(data.pwd, 10);
        const query = 'INSERT INTO mst_user (mu_name, mu_email, mu_phone, mu_password, mu_avatar) VALUES(?,?,?,?,?)';
        return db.query(query,[data.name, data.email, data.phone, pwd, data.filename], callback);
    },

    login: function (data, callback) {
        const query = 'SELECT mu_id id, mu_name name, mu_password pwd, mu_email email, mu_phone phone FROM mst_user WHERE mu_phone = ?';
        return db.query(query,[data.phone], callback);
    }
};

// function connectionErr(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + db.threadId);
// }

module.exports = UserModel;