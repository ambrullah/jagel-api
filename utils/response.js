exports.success = function (res, data, message = "OK") {

    return res.json({

        success: true,

        message,

        data

    });

}

exports.error = function (res, message = "Error", code = 500) {

    return res.status(code).json({

        success: false,

        message

    });

}