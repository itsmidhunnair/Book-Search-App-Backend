const axios = require("axios");
const dotenv = require("dotenv");

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
      const result = await Promise.all(
        ids.map(async (id) => {
          try {
            const { data } = await axios.get(`${process.env.BASE_URL}/${id}`);
            return data;
          } catch (error) {
            console.log(
              "🚀 ~ file: resolvers.js:33 ~ bookList: ~ error:",
              error
            );
          }
        })
      );
      console.log("🚀 ~ file: resolvers.js:44 ~ bookList: ~ result:", result);
      return result;
    },
  },
};

module.exports = { resolvers };
