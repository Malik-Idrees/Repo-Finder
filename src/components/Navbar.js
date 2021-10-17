import React from 'react'
import { Header, Input, Icon } from 'semantic-ui-react'

export default function Navbar({ updateSearch }) {
   const changeHandler = (event) => {
      event.preventDefault()
      updateSearch(event.target.value)
   }

   return (
      <Header
         color='teal'
         as='h2'
         style={{
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
         }}
      >
         Repo Finder 🚀
         <Input
            style={{ marginRight: '60px' }}
            size='mini'
            icon
            placeholder='Github Username...'
         >
            <input onChange={changeHandler} />
            <Icon name='search' />
         </Input>
      </Header>
   )
}
