const {UserList,MovieList}=require('../FakeData');
//Importing Parent as Lodash (Built-in)
const _=require('lodash');
const resolvers ={
    Query:{
        users:()=>{
            return UserList;
        },
        user:(parent,args)=>{
            const id=args.id;
            const user=_.find(UserList,{id:Number(id)});
            return user;
        },

        movies:()=>{
            return MovieList;
        },
        movie:(parent,args)=>{
            const name=args.name;
            const movie=_.find(MovieList,{name:name});
            return movie;
        }
    },
    User:{
        favoriteMovies:()=>{
            return _.filter(MovieList,(movie)=>movie.yearOfPublication>=2000 && movie.yearOfPublication<=2010);
        }
    },
    Mutation:{
        createUser:(parent,args)=>{
            const user=args.newUser;
            const lastId=UserList[UserList.length-1].id;
            user.id=lastId+1;
            UserList.push(user);
            return user;
        },
        updateUser:(parent,args)=>{
            const {id,newUsername}=args.updatingUser;
            let userUpdated;
            UserList.forEach((user)=>{
                if(user.id===Number(id)){
                    user.username=newUsername;
                    userUpdated=user;
                }
            });
            console.log(userUpdated);
            return userUpdated;
        },
        deleteUser:(parent,args)=>{
            const id=args.id;
            _.remove(UserList,(user)=>user.id===Number(id));
            return null;
        }
    }
};

module.exports={resolvers};