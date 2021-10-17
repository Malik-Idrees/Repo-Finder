import React from 'react'
import { Card, Icon, Label } from 'semantic-ui-react'

const RepoCard = ({
   key,
   name,
   nameWithOwner,
   url,
   description,
   forkCount,
   homepageUrl,
   openGraphImageUrl,
   stargazers,
}) => {
   return (
      <>
         <Card key={key} style={{ margin: '0 0' }}>
            <Label
               attached='bottom right'
               as='a'
               href={url}
               size='medium'
               color='teal'
               target='_blank'
            >
               <Icon name='code' />
               Code
            </Label>
            <Label
               attached='bottom left'
               as='a'
               href={homepageUrl ? homepageUrl : '#'}
               size='medium'
               color='teal'
               target='_blank'
            >
               <Icon name='paper plane' />
               Demo
            </Label>
            <Card.Content
               extra
               style={{
                  textAlign: 'center',
               }}
            >
               <div
                  style={{
                     height: '290px',
                     width: '270px',
                  }}
               >
                  <img
                     style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                     }}
                     alt='a project of the user'
                     src={openGraphImageUrl}
                  />
               </div>
            </Card.Content>
            <Card.Content>
               <Card.Header color='teal' color='red'>
                  {name}
               </Card.Header>
               <Card.Meta>@{nameWithOwner}</Card.Meta>
               <Card.Description>{description}</Card.Description>
            </Card.Content>
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
               }}
            >
               <Card.Content extra>
                  <Icon name='fork' />
                  <Label>{forkCount} Forks</Label>
               </Card.Content>
               <Card.Content extra className='item'>
                  <Icon name='star' />
                  <Label>{stargazers} stargazers</Label>
               </Card.Content>
            </div>
         </Card>
      </>
   )
}

export default RepoCard
