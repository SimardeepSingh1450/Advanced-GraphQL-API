import React, { useState } from 'react'
import { useQuery,gql,useLazyQuery, useMutation } from '@apollo/client'

//Making GraohQL Queries :
const QUERY_ALL_USERS = gql`
query getAllUsers{
users{
    id
    name
    age
    username
    nationality
}
}
`;

const QUERY_ALL_MOVIES=gql`
query GetAllMovies{
movies{
name
}
}
`;

const GET_MOVIE_BY_NAME=gql`
query SearchMovie($name:String!){
    movie(name:$name){
    name
    yearOfPublication
    }
}
`;

const CREATE_USER_MUTATION=gql`
mutation createUser($newUser:createUserInput){
createUser(newUser:$newUser){
name
id
}
}
`

const DisplayData = () => {
    const {data,loading,error,refetch}=useQuery(QUERY_ALL_USERS);
    const {data:movieData}=useQuery(QUERY_ALL_MOVIES);
    const [movieSearched,setMovieSearched]=useState();
    const [fetchMovie,{data:movieSearchedData,error:movieError}]=useLazyQuery(GET_MOVIE_BY_NAME)

    //Create User STates:
    const [name,setName]=useState('');
    const [username,setUsername]=useState('');
    const [age,setAge]=useState(0);
    const [nationality,setNationality]=useState('');

    const [createUserFn]=useMutation(CREATE_USER_MUTATION);


    if(loading){
        return <><h1>Loading...</h1></>
    }
    if(data){
        console.log(data);
    }
    if(error){
        console.log(error);
    }

    if(movieData){
        console.log(movieData);
    }

    if(movieSearchedData){
        console.log(movieSearchedData)
    }
  return (
    <div>

      {/* <h1>List Of Users</h1> */}
        {/* {data.users && data.users.map((item)=>(
            <div>
                <h1>Name:{item.name}</h1>
                <h1>Username: {item.username}</h1>
                <h1>Age: {item.age}</h1>
                <h1>Nationality: {item.nationality}</h1>
                <br/>
                <br/>
                <br/>
            </div>
        ))}

        <h1>Movies List :</h1><br/>
        {movieData.movies && movieData.movies.map((movie)=>(
            <h1>Movie Name: {movie.name}</h1>
        ))} */}

        {/* <div>
            <input onChange={(e)=>{setMovieSearched(e.target.value)}} type="text" placeholder='Interstellar'/>
            <button onClick={()=>{fetchMovie({variables:{name:movieSearched}})}}>Fetch Data</button>
            <div>
                {movieSearchedData && 
                <div>
                 <h1>MovieName: {movieSearchedData.movie.name}</h1>
            <h1>Year of Publication: {movieSearchedData.movie.yearOfPublication}</h1> 
            </div>
                }
           
            </div>
        </div> */}

        <div>
            <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Name...'/>
            <input onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder='Username...'/>
            <input onChange={(e)=>{setAge(Number(e.target.value))}} type="text" placeholder='Age...'/>
            <input onChange={(e)=>{setNationality(e.target.value.toUpperCase())}} type="text" placeholder='Nationality...'/>

            <button onClick={()=>{createUserFn({variables:{newUser:{name,username,age,nationality}}});
            refetch();
        }}>Create User</button>
        </div>
        {data && data.users.map((user)=>{
            return (
                <div>
                    <h1>Name: {user.name}</h1>
                    <h1>UserName: {user.username}</h1>
                    <h1>Age: {user.age}</h1>
                    <h1>Nationality: {user.nationality}</h1>
                    <br/>
                    <br/><br/>
                    </div>
            )
        })}


    </div>
  )
}
 
export default DisplayData