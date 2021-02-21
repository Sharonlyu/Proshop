import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  //save when changed
  if (!this.isModified('password')) {
    next()//move on
  }
  const salt = await bcrypt.genSalt(10)//generate salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt)//encrypt password
})

const User = mongoose.model('User', userSchema)

export default User