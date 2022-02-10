const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.header["x-access-token"] || req.header["x-auth-token"] ;


    try {

        let user = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
        req.user = user = user.email;
        next();

    } catch (error) {
        return res.status(400).json({
            msg: error
        })
    }

}




