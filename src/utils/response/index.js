import status from 'http-status';

const info = (message, code, data) => ({
    message: message || status[code],
    data: data || {}
});
const error = (message, code = 500, data, override = null) => {
    const error = override || {
        code: status[status[`${code}_NAME`]],
        message: status[`${code}_NAME`]
    };

    if (message && message.name) {
        return {
            message: status[code],
            error_code: error.code,
            error_message: error.message,
            data: data || null
        };
    }

    return {
        message: message || status[code],
        error_code: error.code,
        error_message: error.message,
        data: data || null
    };
};

export default { info, error };
