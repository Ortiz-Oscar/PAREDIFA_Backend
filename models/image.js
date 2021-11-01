const { GraphQLInputObjectType, GraphQLString } = require("graphql");

const image = new GraphQLInputObjectType({
    name:'Image',
    description: 'Image input type to recieve an image from client',
    fields:()=>({
        name:({type:GraphQLString})
    })  
})

module.exports = image;