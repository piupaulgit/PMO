exports.responseMessages = (res, statusCode, status, message, data = []) =>{
    return res.status(statusCode).json({
        data: data,
        message : message,
        status: status
    })
}