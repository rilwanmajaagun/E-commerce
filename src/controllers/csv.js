import { Parser } from 'json2csv';
import status from 'http-status';
import { productService } from '../services';
import logger from '../config';

const downloadCsv = async (req, res) => {
    try {
        const product = await productService.getAllProduct();
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(product);
        res.setHeader('Content-disposition', 'attachment; filename=product.csv');
        res.set('Content-Type', 'text/csv');
        return res.status(status.OK).send(csv);
    } catch (error) {
        logger.info(error);
    }
};

export default downloadCsv;
