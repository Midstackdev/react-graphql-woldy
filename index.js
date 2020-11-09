import  apollo  from "apollo-server";
import gql from 'graphql-tag'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import User from './models/User.js'
import Post from './models/Post.js'

const env = dotenv.config()

const { ApolloServer } = apollo

const typeDefs = gql`
  type Post{
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query{
    getPosts: [Post]
  }
`
const resolvers = {
  Query: {
    async getPosts () {
      try{
        const posts = await Post.find()
        return posts
      }catch(err) {
        throw new Error(err)
      }
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})
// console.log(process.env.DB_NAME)

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vnmkz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5005 })
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })