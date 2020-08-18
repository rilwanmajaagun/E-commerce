/* eslint-disable import/no-cycle */
import { userService } from '../../services';

const user_id = async(res) => {
    const { email } = res.locals.user;
    const user = await userService.checkIfUserExist(email);
    return user.id;
};

const successful = (res, status_code, message) => res.status(status_code).send({ message });
export default {
    user_id,
    successful
};
