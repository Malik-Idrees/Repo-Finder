import React from 'react'
import { gql, useQuery } from '@apollo/client'

import RepoCard from './RepoCard'

const GET_USER_REPOS = gql`
   query ($login: String!) {
      user(login: $login) {
         id
         topRepositories(first: 6, orderBy: { direction: DESC, field: NAME }) {
            ... on RepositoryConnection {
               nodes {
                  ... on Repository {
                     id
                     name
                     description
                     nameWithOwner
                     url
                     sshUrl
                     forkCount
                     homepageUrl
                     openGraphImageUrl
                     stargazers {
                        totalCount
                     }
                  }
               }
            }
         }
      }
   }
`

const RepoCards = ({ login }) => {
   //Important ! You must use a variable named login for "GET_USER_REPOS" Query #Required By Schema i guess!
   // const login = 'GITHUB_USERNAME'    //Incase You want to hardCode it!! Bad!
   const { loading, error, data } = useQuery(GET_USER_REPOS, {
      variables: { login },
   })

   if (loading) return <p>Loading...</p>
   if (error)
      return (
         <div
            style={{
               textAlign: 'center',
            }}
         >
            <h2
               style={{
                  color: 'red',
                  textAlign: 'center',
               }}
            >
               User Not Found ...
               <br /> Try different username
            </h2>
            <img
               style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
               }}
               src='/images/error.png'
               alt=''
            />
         </div>
      )

   const { topRepositories } = data.user
   const repos = topRepositories.nodes

   return (
      <>
         {repos.map((object) => {
            // For Some reasons,with Few Users the query gives first object as null(Out of 6 we queried),
            //either remove the one with null property,or conditions! as below returns new object!
            //(Not Array, U cannot iterate) with no null attributes
            // let UnusedRepoVar = Object.keys(repos)
            //    .filter((k) => repos[k] != null)
            //    .reduce((a, k) => ({ ...a, [k]: repos[k] }), {}) //But it return an Object not Array!

            if (object && object !== 'null' && object !== 'undefined') {
               return (
                  <div style={{ display: 'flex' }}>
                     <RepoCard
                        key={object.id}
                        name={object.name}
                        nameWithOwner={object.nameWithOwner}
                        description={object.description}
                        url={object.url}
                        forkCount={object.forkCount}
                        homepageUrl={object.homepageUrl}
                        openGraphImageUrl={object.openGraphImageUrl}
                        stargazers={object.stargazers.totalCount}
                     />
                  </div>
               )
            }
            return <> </>
         })}
      </>
   )
}
export default RepoCards
