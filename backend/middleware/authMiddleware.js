import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
//middleware function (req,res,next)
//asyncHandler to handle exception
const protect = asyncHandler(async (req, res, next) => {
  let token

//if authorization value exists and is also a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
        //try to decode token
      token = req.headers.authorization.split(' ')[1] //want token not Bear
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //fetch the user, select('-password') don't want password here
      req.user = await User.findById(decoded.id).select('-password')

      next()

    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})


const admin = (req, res, next) => {
  //if user login and is admin
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }