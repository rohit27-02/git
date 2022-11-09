// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js")
var jwt = require("jsonwebtoken")
const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email })
        if(user !== null ){
            const bytes =  CryptoJS.AES.decrypt(user.password,"secret123")
            var decryptedPass = bytes.toString(CryptoJS.enc.Utf8)
        }
      
        if(req.body.email==="abc@123" && req.body.password==="123"){
            var token = jwt.sign({  email: req.body.email, name: user.name },"jwtsecret",{expiresIn :"2d"})
                res.status(200).json({success: true,token,admin:true})
                
        }
        else if (user) {
            if (req.body.email == user.email &&  req.body.password==decryptedPass) {
                var token = jwt.sign({  email: user.email, name: user.name },"jwtsecret",{expiresIn :"2d"})
                res.status(200).json({success: true,token})
            }
            else {
                res.status(200).json({ success: false, error: "Invalid Credentials" })
            }
        }
        else {

            res.status(200).json({ success: false, error: "No User Found" })
        }
    }

    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);

