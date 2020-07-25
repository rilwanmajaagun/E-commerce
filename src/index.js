import 'dotenv/config';
import status from 'http-status';
import {
    app, logger, client
} from './config';
import route from './config/route';

const port = process.env.ECOMMERCE_PORT || 3000;

app.listen(port, () => {
    logger.info(`Application listen on port ${port}`);
});

app.get('/', (req, res) => {
    client.ping((err, msg) => {
        if (err) {
            return res.send(status.INTERNAL_SERVER_ERROR);
        }
        res.send(msg, status.OK);
    });
});
app.use('/api/v1', route);
