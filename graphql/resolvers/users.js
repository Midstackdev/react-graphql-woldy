import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  apollo  from "apollo-server"
import  { validateRegisterInput, validateLoginInput }  from "../../utils/validators.js"

const { UserInputError } = apollo

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
  }, process.env.TOKEN_SECRET, { expiresIn: '1h'})
}

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
    async login(_, {username, password}) {
      const {errors, valid} = validateLoginInput(username, password)
      const user = await User.findOne({ username })

      if(!valid) {
        throw new UserInputError('Wrong credentials', { errors })
      }
      
      if(!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }
      
      const match = await bcrypt.compare(password, user.password)
      if(!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },

    async register(_, 
    {
      registerInput: { username, email, password, confirmPassword }
    }, 
    context, 
    info
    ){
      // Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if(!valid) {
        throw new UserInputError('Errors', {
          errors
        })
      }
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
      
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}