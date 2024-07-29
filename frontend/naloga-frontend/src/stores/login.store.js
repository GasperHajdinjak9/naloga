import { ref } from "vue";

import axios from "axios";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    user: [],
    books: [],
  }),
  getters: {
    userTokens: (state) => state.user,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post(`http://localhost:3000/login`, {
          username,
          password,
        });
        this.user = response.data.token;
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        console.log("Failed to login", error);
      }
    },
    // setToken(token) {
    //   this.user = token;
    // },
    async getBooks() {
      try {
        const response = await axios.get("http://localhost:3000/books", {
          headers: {
            Authorization: `Bearer ${this.user}`,
          },
        });

        this.books = response.data;
      } catch (error) {
        console.log("Failed to fetch books", error);
      }
    },
  },
});
