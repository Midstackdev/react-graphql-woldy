import gql from 'graphql-tag'

export const FETCH_POST_QUERY = gql`
{
  getPosts{
    id body username createdAt likeCount
    likes{
      username
    }
    commentCount
    comments{
      id username body createdAt
    }
  }
}
`