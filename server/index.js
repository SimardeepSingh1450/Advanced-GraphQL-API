const {ApolloServer}=require('apollo-server');
const {typeDefs}=require('./schema/typeDefs');
const {resolvers}=require('./schema/resolvers');

const server=new ApolloServer({typeDefs,resolvers,context:()=>{
    return {name:"Simar"}
}});

server.listen().then(({url})=>{
    console.log(`Your api is running : ${url}`);
})
