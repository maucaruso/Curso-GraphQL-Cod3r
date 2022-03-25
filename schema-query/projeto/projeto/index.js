const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  # Pontos de entrada da sua API!
  type Query {
    ola: String,
    horaCerta: String
  }

`;

const resolvers = {
  Query: {
    ola() {
      return 'Olá Mundo'
    },
    horaCerta() {
      return String(new Date())
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});