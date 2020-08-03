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

// app.get('/', (req, res) => {
//     client.ping((err, msg) => {
//         if (err) {
//             return res.status(status.INTERNAL_SERVER_ERROR).send(status[500]);
//         }
//         return res.status(status.OK).send({ mesaage: msg });
//     });
// });
app.get('/', (req, res) => {
    res.status(status.OK).send({
        message: 'Hello'
    });
});
app.use('/api/v1', route);

export default app;
