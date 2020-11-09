import  apollo  from "apollo-server";
import gql from 'graphql-tag'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const env = dotenv.config()

const { ApolloServer } = apollo

const typeDefs = gql`
  type Query{
    sayHi: String!
  }
`
const resolvers = {
  Query: {
    sayHi: () => 'Hello World'
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