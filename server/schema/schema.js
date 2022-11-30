const Project = require("../models/Project");
const Client = require("../models/Client");
const Review = require("../models/Review")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt
} = require("graphql");

let NotNull = new GraphQLNonNull(GraphQLString);

const ProjectT = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLString },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    client: {
      type: ClientT,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const ClientT = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});


const ReviewT = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    suggestion: { type: GraphQLString },
    rating: { type: GraphQLInt },
  })
});

// Root Query is a object data type like project and client which has various queries as fields
const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // grab single project using id will return data in form of project type
    project: {
      type: ProjectT,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    client: {
      type: ClientT,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    // grab all projects will return data in form of list of project type
    projects: {
      type: new GraphQLList(ProjectT),
      resolve(parent, args) {
        return Project.find();
      },
    },
    clients: {
      type: new GraphQLList(ClientT),
      resolve(parent, args) {
        return Client.find();
      },
    },
  },
});

//mutation is used to add, update and delete data

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientT,
      args: {
        name: { type: NotNull },
        email: { type:  NotNull },
        phone: { type:  NotNull }
      },
      resolve(parent, args) {
        const newClient = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return newClient.save();
      },
    },
    addProject: {
      type: ProjectT,
      args: {
        name: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "Status",
            values: {
              New: { value: "Not Started" },
              InProgress: { value: "In Progress" },
              Done: { value: "Completed" }
            }
          }),
          defaultValue: "Not Started"
        },
        description: { type: GraphQLString },
        clientId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const newProject = new Project({
          name: args.name,
          status: args.status,
          description: args.description,
          clientId: args.clientId,
        });
        return newProject.save();
      }
      },
      deleteProject: {
        type: ProjectT,
        args: {
          id: { type: GraphQLID },
        },
        resolve(parent, args) {
          
          return Project.findByIdAndRemove(args.id);
        }
      },
      deleteClient: {
        type: ClientT,
        args: {
          id: { type: GraphQLID },
        },
        resolve(parent, args) {
          Project.deleteMany({clientId: args.id}, function(err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          }
          );
          return Client.findByIdAndRemove(args.id);
        }
      },
      updateProject: {
        type: ProjectT,
        args: {
          id: { type: GraphQLID },
          name: { type: GraphQLString },
          status: {
            type: new GraphQLEnumType({
              name: "StatusUpdate",
              values: {
                new: { value: "Not Started" },
                progress: { value: "In Progress" },
                done: { value: "Completed" }
              }
            })
          },
          description: { type: GraphQLString }
        },
        resolve(parent, args) {
          const updatedProject = new Project({
            id: args.id,
            name: args.name,
            status: args.status,
            description: args.description,
          });
          return Project.findByIdAndUpdate(args.id, updatedProject, { new: true });
        }
        },
        addReview: {
          type: ReviewT,
          args: {
            email:{type:GraphQLString},
            suggestion:{type:GraphQLString},
            rating:{type:GraphQLInt}
          },
          resolve(parent,args) {
            const review = new Review({
              email:args.email,
              suggestion:args.suggestion,
              rating:args.rating
            })
            return review.save();
          }
        }
      }
    
  });


module.exports = new GraphQLSchema({
  query,
  mutation,
});
