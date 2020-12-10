import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function PostCard({ 
  post: { body, createdAt, id, username, likeCount, commentCount }
}) {
  function likePost(){
    console.log('like')
  }

  function commentOnPost(){
    console.log('comment')
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={likePost}
          basic
          color='teal'
          icon='heart'
          label={{ basic: true, color: 'teal', pointing: 'left', content: likeCount }}
        />
        <Button
          onClick={commentOnPost}
          basic
          color='blue'
          icon='comments'
          label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
        />
      </Card.Content>
    </Card>
  )
}

export default PostCard
