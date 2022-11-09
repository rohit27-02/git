// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Feed from "../../models/Feed"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    console.log(req.body)
    if (req.method == "POST") { 
       
            let f = new Feed({name:req.body.name,email:req.body.email,message:req.body.message,company:req.body.company,number:req.body.number})
            await f.save()
            res.status(200).json({ success: "success" })
        }
    
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);

