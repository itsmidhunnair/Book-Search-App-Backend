const typeDefs = `#graphql
  type Books {
    id: ID!
    volumeInfo: volumeInfo!
    saleInfo: saleInfo
  }

  type volumeInfo {
    title: String!
    description: String
    subtitle: String
    publisher: String
    authors: [String!]
    publishedDate: String
    pageCount: Int
    averageRating: Float
    ratingsCount: Int
    imageLinks: imageLinks
  }

  type imageLinks {
    thumbnail: String
    small: String
  }

  type saleInfo{
  listPrice: listPrice 
  }

  type listPrice{
  amount: Float
  currencyCode: String
  }

  type Book{
    Books: Books
  }

  input BooksInput{
    search: String
    index: Int
    filter: String
  }

  type Query {
    books(input: BooksInput): [Books!]
    book(id: ID!): Books
    bookList(ids: [ID]!): [Books]
  }
`;

module.exports = { typeDefs };
