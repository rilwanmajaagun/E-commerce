import status from 'http-status';
// eslint-disable-next-line import/no-cycle
import { categoryService } from '../services';

const selectCategory = async(req, res, next) => {
    try {
        const category = await categoryService.selectCategory(req.body);
        if (category) {
            return res.status(status.CONFLICT).send({
                message: 'category already exist'
            });
        }
    } catch (e) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    }
    next();
};

const CheckCategory = async(req, res, next) => {
    try {
        const category = await categoryService.selectCategory(req.body);
        if (!category) {
            return res.status(status.CONFLICT).send({
                message: 'category does not exist'
            });
        }
    } catch (e) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500]
        });
    }
    next();
};

export default {
    selectCategory,
    CheckCategory
};
