import gql from 'graphql-tag'

export default gql`
type Post{
  id: ID!
  body: String!
  username: String!
  createdAt: String!
}
type User{
  id: ID!
  email: String!
  username: String!
  token: String!
  createdAt: String!
}
input RegisterInput{
  username: String!
  email: String!
  password: String!
  confirmPassword: String!
}
type Query{
  getPosts: [Post]
}
type Mutation{
  register(registerInput: RegisterInput): User
}
`