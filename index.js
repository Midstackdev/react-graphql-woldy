import  apollo  from "apollo-server";
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import typeDefs from './graphql/typeDefs.js'
import resolvers from './graphql/resolvers/index.js'


const env = dotenv.config()

const { ApolloServer, PubSub } = apollo

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({ req, pubsub })
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