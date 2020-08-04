import { Parser } from 'json2csv';
import status from 'http-status';
import { productSerivce } from '../services';

const downloadCsv = async(req, res) => {
    try {
        const product = await productSerivce.getAllProduct();
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(product);
        res.setHeader('Content-disposition', 'attachment; filename=product.csv');
        res.set('Content-Type', 'text/csv');
        return res.status(status.OK).send(csv);
    } catch (error) {
        console.log(error);
    }
};

export default downloadCsv;
