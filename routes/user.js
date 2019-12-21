const { userModel } = require("../model");

const register = (req, res) => {
    const id = req.body.id;
    const pass = req.body.pass;

    const user = new userModel({
        id,
        pass
    });

    user.save()
    .then(() => {
        return res.json({id, pass});
    });
};

const login = (req, res) => {
    const id = req.body.id;
    const pass = req.body.pass;

    userModel.countDocuments({id, pass})
    .then((count) => {
        if(count) {
            return res.json({success: true});
        }
        else {
            return res.json({success: false});
        }
    });
};

module.exports = {
    register,
    login
};