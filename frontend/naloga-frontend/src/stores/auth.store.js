// import { ref, computed } from 'vue'

import axios from 'axios'
import { defineStore } from 'pinia'



export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: [],
  }),
  actions: {
    async register(username, password) {
      try {
        const response = await axios.post(`http://localhost:3000/register`, {
          username,
          password,
        });
        this.user = response;
        console.log("success");

        
      } catch (error) {
        console.log("Failed to authenticate", error);
      }
    },
  },
});
