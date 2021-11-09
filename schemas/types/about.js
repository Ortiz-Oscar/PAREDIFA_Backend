const { GraphQLString, GraphQLObjectType, GraphQLList } = require("graphql");

const authorType = new GraphQLObjectType({
  name: "Author",
  description: "Author of the project",
  fields: () => ({
    id: { type: GraphQLString, description: "ID of student" },
    name: { type: GraphQLString, description: "Name of student" },
  }),
});

const teamType = new GraphQLObjectType({
  name: "Team",
  description: "Team info of the project",
  fields: () => ({
    id: { type: GraphQLString, description: "ID of group" },
  }),
});

const courseType = new GraphQLObjectType({
  name: "Course",
  description: "Course info of the project",
  fields: () => ({
    id: { type: GraphQLString },
    crn: { type: GraphQLString },
    name: { type: GraphQLString },
    professor: { type: GraphQLString },
    college: { type: GraphQLString },
  }),
});
const termType = new GraphQLObjectType({
  name: "Term",
  description: "Period when the project was made",
  fields: () => ({
    year: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
});
const versionType = new GraphQLObjectType({
  name: "Version",
  description: "Version of the project",
  fields: () => ({
    id: { type: GraphQLString },
  }),
});
const aboutType = new GraphQLObjectType({
  name: "About",
  description: "General info about the project",
  fields: () => ({
    authors: { type: GraphQLList(authorType) },
    team: { type: teamType },
    course: { type: courseType },
    term: { type: termType },
    version: { type: versionType },
  }),
});

module.exports = { aboutType };
