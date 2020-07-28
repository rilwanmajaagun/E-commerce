import status from 'http-status';
import { categoryService } from '../services';
import { client } from '../config';

const createCategory = async(req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        return res.status(status.CREATED).send({
            message: 'category created successfully',
            data: {
                id: category.id,
                name: category.name,
                created_at: category.created_at
            }
        });
    } catch (e) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const selectAllCategory = async(req, res) => {
    try {
        client.get('allcategory', async(error, result) => {
            if (result) {
                return res.status(status.OK).send({
                    message: 'All categories selected sucessfully',
                    data: JSON.parse(result)
                });
            }
            const allCategory = await categoryService.selectAllCategory();
            if (allCategory) {
                client.set('allcategory', JSON.stringify(allCategory));
                client.expire('allcategory', 300); /*  expires in five minute*/
                return res.status(status.OK).send({
                    message: 'All categories selected sucessfully ',
                    data: allCategory
                });
            }
            return res.status(status.BAD_REQUEST).send({
                message: 'Error get all categories',
                data: null
            });
        });
    } catch (e) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const deleteCategory = async(req, res) => {
    try {
        const category = await categoryService.deleteCategory(req.body);
        return res.status(status.OK).send({
            message: `${category.name} Deleted successfully`
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

const updateCategory = async(req, res) => {
    try {
        const category = await categoryService.updateCategory(req.body);
        return res.status(status.CREATED).send({
            message: `${category.name} updated sucessfully`
        });
    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({
            message: status[500],
            data: null
        });
    }
};

export default {
    createCategory,
    selectAllCategory,
    deleteCategory,
    updateCategory
};
