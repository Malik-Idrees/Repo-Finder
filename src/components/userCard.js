import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Card, Icon, Image, Label } from 'semantic-ui-react'

const GET_USER_INFO = gql`
   query GET_USER_INFO($login: String!) {
      user(login: $login) {
         id
         avatarUrl
         name
         login
         bio
         followers(first: 6) {
            totalCount
         }
         following(first: 6) {
            totalCount
         }
         location
      }
   }
`
const login = process.env.REACT_APP_AUTHOR_GITHUB_USERNAME
   ? process.env.REACT_APP_AUTHOR_GITHUB_USERNAME
   : 'malik-idrees'

// const UserCard = ({ login }) => {

const UserCard = () => {
   //Important ! You must use a variable named login  #Required By Schema i guess!
   const { loading, error, data } = useQuery(GET_USER_INFO, {
      variables: { login },
   })

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error :{error.message}</p>

   const { name, login: user, avatarUrl, bio, followers, following } = data.user
   const { totalCount: followerCount } = followers
   const { totalCount: followingCount } = following

   return (
      <>
         <Card>
            <Image src={avatarUrl} wrapped ui={false} />
            <Card.Content>
               <Card.Header>{name}</Card.Header>
               <Card.Meta>@{user}</Card.Meta>
               <Card.Description>{bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
               <Icon name='user secret' />
               <Label>{followerCount} Followers</Label>
            </Card.Content>
            <Card.Content extra>
               <Icon name='user secret' />
               <Label>{followingCount} Following</Label>
            </Card.Content>
         </Card>
      </>
   )
}

export default UserCard
