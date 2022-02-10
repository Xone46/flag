const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//
exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send({ msg: "All input is required" });
    }

    const client = await Client.findOne({ email });

    if (client) {
        let decryptedPassword = await bcrypt.compare(password, client.password);

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
// register client
exports.register = async (req, res, next) => {

    const { nom, prenom, email, password, adresse, ville, pays, telephone, refClient, nomSociete } = req.body;

    const isMatch = await Client.findOne({ email });

    if (!isMatch) {

        let encryptedPassword = await bcrypt.hash(password, 10);

        let client = await Client({
            nom: nom,
            prenom: prenom,
            email: email,
            password: encryptedPassword,
            adresse: adresse,
            ville: ville,
            pays: pays,
            telephone: telephone,
            refClient: refClient,
            cas: 'active',
            nomSociete: nomSociete,
        })

        let flagSucces = client.save();

        if (flagSucces) {
            await res.status(200).json({ msg: "succes", token: token });
        } else {
            await res.status(400).json({ msg: "echec" });
        }

    } else {
        await res.status(400).json({ msg: "email already exists" });
    }


}

exports.profile = async (req, res, next) => {

    let cid = req.params.cid
    const client = await Client.findById(cid);
    await res.status(200).json({ client });

}

exports.show = async (req, res, next) => {

    const client = await Client.find();
    await res.status(200).json({ client });

}

exports.delete = async (req, res, next) => {

    let cid = req.params.cid
    const client = await Client.findByIdAndRemove(cid);
    await res.status(200).json({ msg: "succes" });

}
exports.update = async (req, res, next) => {
    // get id
    let cid = req.params.cid
    // info update
    const { nom, prenom, email, password, adresse, ville, pays, telephone, refClient, nomSociete, cas } = req.body;

    let clientInfo = {
        nom,
        prenom,
        email,
        password: await bcrypt.hash(password, 10),
        adresse,
        ville,
        pays,
        telephone,
        refClient,
        cas,
        nomSociete,
    }

    const client = await Client.findByIdAndUpdate(cid, { $set: clientInfo });
    if (client) {
        await res.status(200).json({ msg: "les information modifier" });
    }

}

exports.active = async (req, res, next) => {
    // get id
    let cid = req.params.cid
    // info update

    const client = await Client.findByIdAndUpdate(cid, { $set: { cas: "active" } });
    if (client) {
        await res.status(200).json({ msg: "les information modifier" });
    }

}

exports.desactive = async (req, res, next) => {
    // get id
    let cid = req.params.cid
    // info update

    const client = await Client.findByIdAndUpdate(cid, { $set: { cas: "desactive" } });
    if (client) {
        await res.status(200).json({ msg: "les information modifier" });
    }

}



