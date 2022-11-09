import connectDb from "../../middleware/mongoose"
import User from "../../models/User"
var jwt = require("jsonwebtoken")
const handler = async (req, res) => {
    console.log(req.body)
    if (req.method == "POST") { 
        let user = await User.findOne({ "email": req.body.email })
        if(user){
        var token = jwt.sign({  email: user.email, name: user.name },"jwtsecret",{expiresIn :"2d"})
        res.status(200).json({success: true,token})
        }
        else {

            res.status(200).json({ success: false, error: "Sign Up First" })
        }
       }
    
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);
