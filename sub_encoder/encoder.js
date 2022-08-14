const crypto = require('crypto')
const errorHandler = require("../utils/errorHandler");
const encryptionMethod = 'AES-256-CBC'
const secret = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
const iv = 'Sirius1Sirius134'

module.exports.encrypt = async function(req, res){
    try{
        const textToEncrypt = req.body.pix +' '+ req.body.name +' '+ req.body.camp
        const encrypt = function (plain_text, encryptionMethod, secret, iv) {
            const encryptor = crypto.createCipheriv(encryptionMethod, secret, iv)
            return encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64')
        }
        const encryptedMessage = encrypt(textToEncrypt, encryptionMethod, secret, iv)
        const encryptedData = Buffer.from(encryptedMessage).toString('base64url')
        res.status(200).json(encryptedData)
    }catch (e){
        errorHandler(res, e)
    }
}