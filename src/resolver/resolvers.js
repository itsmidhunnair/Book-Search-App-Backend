const axios = require("axios");
const dotenv = require("dotenv");
const { GraphQLError } = require("graphql");

dotenv.config();

const resolvers = {
  Query: {
    books: async (parent, { input }) => {
      const { search, index, filter } = input;
      try {
        let { data } = await axios.get(
          `${process.env.BASE_URL}?${process.env.API_SEARCH_QUERY}&q=${search}${
            filter ? `&filter=${filter}` : ""
          }&startIndex=${index}&maxResults=10&key=${process.env.API_KEY}`
        );
        return data.items;
      } catch (error) {
        console.log(error);
      }
    },
    book: async (parent, { id }) => {
      try {
        let { data } = await axios.get(`${process.env.BASE_URL}/${id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    bookList: async (parent, { ids = [] }) => {
      try {
        // const result = [];
        // ids.forEach(async (id) => {
        //   const { data } = await axios.get(`${process.env.BASE_URL}/${id}`);
        //   result.push(data);
        // });

        const result = await Promise.all(
          ids.map(async (id) => {
            const { data } = await axios.get(`${process.env.BASE_URL}/${id}`);
            return data;
          })
        );
        return result;
      } catch (error) {
        console.log(
          "🚀 ~ file: resolvers.js:48 ~ bookList: ~ error:",
          error.response.data.message
        );
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            msg: error.response.statusText,
          },
        });
      }
    },
  },
};

module.exports = { resolvers };
