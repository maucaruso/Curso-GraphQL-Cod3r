const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date 

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Query {
    ola: String!,
    horaCerta: Date!,
    usuarioLogado: Usuario,
    produtoEmDestaque: Produto
  }

  type Produto {
    nome: String!,
    preco: Float!,
    desconto: Float,
    precoComDesconto: Float
  }

`;

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real
    },
  },
  Produto: {
    precoComDesconto(produto) {
      return produto.desconto ? produto.preco - (produto.preco * (produto.desconto / 100))  : null ;
    }
  },
  Query: {
    ola() {
      return 'Olá Mundo'
    },
    horaCerta() {
      return String(new Date())
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: 'gabi',
        email: 'gabi@gmail.com',
        idade: 23,
        salario_real: 1200.00,
        vip: true
      }
    },
    produtoEmDestaque() {
      return {
        nome: 'Secador de cabelos',
        preco: 100.00,
        desconto: 10
      }
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