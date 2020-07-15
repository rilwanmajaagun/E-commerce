import status from 'http-status';
import userService from '../services';

const signupMiddleware = async(req, res, next) => {
    try {
        const data = await userService.checkIfUserExist(req.body);
        if (data) {
            return res.send('user already exist', status.CONFLICT);
        }
    } catch (e) {
        return res.send(status.INTERNAL_SERVER_ERROR);
    }
    next();
};

export default { signupMiddleware };
