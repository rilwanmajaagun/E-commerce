import 'dotenv/config';
import axios from 'axios';
import status from 'http-status';
import logger from '../config/logger';
import { orderAuth } from '../middlewares';
import { orderService } from '../services';

const bankPayment = async(req, res) => {
    try {
        const {
            email, amount, bank: { code, account_number }, birthday
        } = req.body;
        const options = {
            method: 'POST',
            url: 'https://api.paystack.co/charge',
            port: 443,
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: {
                email,
                amount,
                metadata: {
                    custom_fields: [
                        {
                            value: 'makurdi',
                            display_name: 'Donation for',
                            variable_name: 'donation_for'
                        }
                    ]
                },
                bank: {
                    code,
                    account_number
                },
                birthday
            }
        };
        const transaction = await axios(options);
        const { data } = transaction.data;
        return res.json(data);
    } catch (error) {
        logger.info(error.response.status);
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    }
};

const cardPayment = async(req, res) => {
    const { transaction_id } = req.params;
    const { email } = res.locals.user;
    try {
        const amount = await orderService.sumSubTotal(transaction_id);
        const {
            card: {
                cvv, number, expiry_month, expiry_year
            }, pin
        } = req.body;
        const options = {
            method: 'POST',
            url: 'https://api.paystack.co/charge',
            port: 443,
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: {
                email,
                amount: amount.sum,
                card: {
                    cvv,
                    number,
                    expiry_month,
                    expiry_year
                },
                pin
            }
        };
        const transaction = await axios(options);
        const { data } = transaction.data;
        data.transaction_id = transaction_id;
        const transaction_table_id = await orderAuth.createTransactionDetails(data);
        await orderService.updateTransactionTableId(transaction_id, transaction_table_id.id);
        return res.json(data);
    } catch (error) {
        logger.info(error.response.status);
        return res.status(status.INTERNAL_SERVER_ERROR).send({ message: status[500] });
    }
};

const verifyPayment = async(req, res) => {
    try {
        const { reference } = req.params;
        const options = {
            method: 'GET',
            url: `https://api.paystack.co/transaction/verify/${reference}`,
            port: 443,
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        };
        const transactionStatus = await axios(options);
        const { data } = transactionStatus.data;
        if (data.status === 'success') {
            orderService.verifyTransactions('success', reference);
        } else {
            orderService.verifyTransactions('failed', reference);
        }
        return res.json(data);
    } catch (error) {
        logger.info(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    }
};

export default {
    bankPayment,
    cardPayment,
    verifyPayment
};
