import 'dotenv/config';
import Nexmo from 'nexmo';

const nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_SECRET_KEY
});

export default nexmo;
