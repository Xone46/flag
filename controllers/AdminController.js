const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send({ msg: "All input is required" });
    }

    const admin = await Admin.findOne({ email });

    if (admin) {
        let decryptedPassword = await bcrypt.compare(password, admin.password);

        if (decryptedPassword) {
            //Create token
            const token = jwt.sign(
                { email: email },
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                {
                    expiresIn: "2h",
                }
            );
            res.status(200).json({ msg: "succes", token: token });
        } else {
            res.status(400).send({ msg: "sorry but password not correct" });
        }
    } else {
        res.status(400).json({ msg: "email not exists" });
    }




}

exports.register = async (req, res, next) => {

    const { nom, prenom, email, password, refEmp, code } = req.body;

    if (code == "gthconsult") {

        const isMatch = await Admin.findOne({ email });

        if (!isMatch) {

            let encryptedPassword = await bcrypt.hash(password, 10);

            let admin = await Admin({
                nom: nom,
                prenom: prenom,
                email: email,
                password: encryptedPassword,
                refEmp: refEmp,
                code: code
            })

            let flagSucces = admin.save();

            if (flagSucces) {
                //Create token
                const token = jwt.sign(
                    { email: email },
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                    {
                        expiresIn: "2h",
                    }
                );
                await res.status(200).json({ msg: "succes", token: token });
            } else {
                await res.status(400).json({ msg: "echec" });
            }

        } else {
            await res.status(400).json({ msg: "email already exists" });
        }
    } else {
        await res.status(400).json({ msg: "vous ne possède le droit pour créer un compte Admin" });
    }


}

exports.profile = async (req, res, next) => {

    let aid = req.params.aid
    const admin = await Admin.findById(aid);
    await res.status(200).json({ admin });

}

exports.show = async (req, res, next) => {

    const admin = await Admin.find();
    await res.status(200).json({ admin });

}

exports.delete = async (req, res, next) => {

    let aid = req.params.aid

    const { code } = req.body

    if (code == "gthconsult") {

        const admin = await Admin.findByIdAndRemove(aid);
        
        if(admin) {
            await res.status(200).json({ msg: "succes" });
        } else {
            await res.status(400).json({ msg: "echec" });
        }

    } else {
        res.status(400).json({ msg: "le code secret n' correct" });
    }


}

exports.update = async (req, res, next) => {
    // get id
    let aid = req.params.aid
    // info update
    const { nom, prenom, email, password, refEmp, code } = req.body;

    if (code == "gthconsult") {

        let adminInfo = {
            nom,
            prenom,
            email,
            password: await bcrypt.hash(password, 10),
            refEmp,
            code
        }

        const admin = await Admin.findByIdAndUpdate(aid, { $set: adminInfo });
        if (admin) {
            await res.status(200).json({ msg: "les information Admin modifier" });
        }

    } else {
        res.status(400).json({ msg: "le code secret n' correct" });
    }

}

