import { MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, MYSQL_USER } from '$env/static/private';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'movies',
    MYSQL_USER,
    MYSQL_PASSWORD,
    {
        'host': 'localhost',
        'dialect': 'mysql',
    }
);

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;