const prepareSuccess = (data) => {
    return {
        success: true,
        data: data
    }
}

const prepareError = (err) => {
    return {
        success: false,
        message: err.message,
        stack: err.stack,
    }
}

const response = {
    prepareSuccess,
    prepareError,
}

module.exports = response;
