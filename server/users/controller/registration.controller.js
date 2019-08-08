//Third Party Packages
const bcrypt = require('bcrypt');


//Local Packages
const validation = require('../../helper/validation.controller');

//fun() to validate & register users
async function registerUser(req, res, next) {

    try {
        const USERS = req.db.collection('users');


        //Validate user before register
        const { error } = validation.joivalidateUser(req.body);
        if (error) {
            error.statusCode = 412; //Precondition failed
            return next(error);
        }

        
        //Check email Uniqueness
        const user = await USERS.findOne({ email: req.body.email });
        if (user) return res.status(401).json({
            status: 401,
            message: {
                error: "Email already taken!!",
                success: false
            }
        });


        //bcrypt password before registration
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);



        //Register Validated Users

        await USERS.insertOne(req.body, (error, result) => {
            if (error) {
                error.statusCode = 500; //internal server error
                next(error);
            }
            console.log("User has jus been registered " + result.insertedCount);
            res.status(201).json({
                status: 201,
                message: {
                    error: null,
                    data: result.ops,
                    success: true

                }
            });
        });
    } catch (error) {
        error.statusCode = 500; //INtrenal server error
        error.message = "Internal Server error catched";
        return next(error);
    }

}



module.exports = {
    registerUser: registerUser
}