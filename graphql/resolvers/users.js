import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  apollo  from "apollo-server"

const { UserInputError } = apollo

export default {
  Query: {
    async getUsers () {
      try{
        const users = await User.find()
        return users
      }catch(err) {
        throw new Error(err)
      }
    } 
  },

  Mutation: {
    async register(_, 
    {
      registerInput: { username, email, password, confirmPassword }
    }, 
    context, 
    info
    ){
      // Make sure user doesnt already exist
      const user = await User.findOne({ username })
      if(user) {
        throw new UserInputError('Username exist', {
          errors: {
            username: 'This username is taken'
          }
        })
      }
      // hash password and create auth user
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save()
      
      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
      }, process.env.TOKEN_SECRET, { expiresIn: '1h'})

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}