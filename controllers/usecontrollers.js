const User = require("../model/useModel")
const brcypt = require("bcrypt")


module.exports.register = async (req ,res,next) =>{
    try {
        const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username})
    if(usernameCheck)
        return res.json({msg:"Username already used", status: false})
    const emailCheck = await User.findOne({email})
    if(emailCheck)
        return res.json({msg: "Email already used", status: false})
    const hashedPassword = await brcypt.hash(password, 10)
    const user = await User.create({
        email,
        username,
        password: hashedPassword,
    })
    delete user.password
    return res.json({status: true, user})
    } catch(ex) {
        next(ex)
    }
}


module.exports.login = async (req ,res,next) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user)
            return res.json({msg:"Incorrect uenrnamw or password", status: false})
        const isPasswordValid = await brcypt.compare(password, user.password)
        if(!isPasswordValid)
            return res.json({msg:"Incorrect uenrnamw or password", status: false})
        
        delete user.password
        return res.json({status: true, user})
        } catch(ex) {
            next(ex)
        }
   }


   module.exports.productlist = async (req ,res,next) =>{
    try {
        
        const {username,id} = req.body;
        const user = await User.findOne({username})
        if (!user) {
            return res.status(404).json({ msg: "User not found", status: false });
        }
        const index = user.productlist.indexOf(id);
        let addflag = false;
        if (index > -1) {
            user.productlist.splice(index, 1); // Xóa phần tử
        }
        else
        {
            addflag = true;
            // Thêm ID vào productlist và lưu lại
            user.productlist.push(id);
            user.productlist.sort((a, b) => a - b);
            // ;

        }
        await user.save();

        // Trả về người dùng đã được cập nhật
        const updatedUser = await User.findOne({username}).select('-password');
        return res.json({ like: addflag, status: true, user: updatedUser });
        } catch(ex) {
            next(ex)
        }
   }


   module.exports.creatorlist = async (req ,res,next) =>{
    try {
        const {username,id} = req.body;
        const user = await User.findOne({username})
        if (!user) {
            return res.status(404).json({ msg: "User not found", status: false });
        }
        const index = user.creatorlist.indexOf(id);
        let addflag = false;
        if (index > -1) {
            user.creatorlist.splice(index, 1); // Xóa phần tử
        }
        else
        {
            addflag = true;
            // Thêm ID vào creatorlist và lưu lại
            user.creatorlist.push(id);
            user.creatorlist.sort((a, b) => a - b);
            // ;

        }
        await user.save();

        // Trả về người dùng đã được cập nhật
        const updatedUser = await User.findOne({username}).select('-password');
        return res.json({ like: addflag, status: true, user: updatedUser });
        } catch(ex) {
            next(ex)
        }
   }