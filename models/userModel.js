const mongoose =require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    created_at:Date,
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})


const User = mongoose.model("User",UserSchema)

/*UserSchema.pre('save',//need to figure out why this pre-hook didn't work
async (next)=>{
    const user = this
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
    const modEmail = this.email.toLowerCase()
    this.email = modEmail
    next()
}
)

UserSchema.methods.isValidPassword = async function(password){
    const user = this
    const compare = await bcrypt.compare(password,user.password)
    return compare
}*/

module.exports = User