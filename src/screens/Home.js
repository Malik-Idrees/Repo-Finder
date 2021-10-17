import React, { useState } from 'react'

import Navbar from '../components/Navbar'
import UserCard from '../components/userCard'
import RepoCardList from '../components/RepoCardList'

import { Grid } from 'semantic-ui-react'

const Home = () => {
   //GitHub Username
   const [username, setUsername] = useState('malik-idrees')

   const updateSearch = (e) => {
      setUsername(e)
   }

   return (
      <div>
         <Navbar updateSearch={updateSearch} />

         <Grid divided>
            <Grid.Row columns={2}>
               <Grid.Column width={4}>
                  {/* I Have hardcoded the value of username in UserCard :/ Just Go Into UserCard 
                        to change in into Yours! or make it dynamic */}
                  <UserCard login={username} />
               </Grid.Column>

               <Grid.Column width={12}>
                  <div
                     style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridAutoRows: '1fr',
                        gridColumnGap: '20px',
                        gridRowGap: '20px',
                     }}
                  >
                     <RepoCardList login={username} />
                  </div>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </div>
   )
}

export default Home
