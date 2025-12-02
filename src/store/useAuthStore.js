import { create } from "zustand";

const API = "https://faq-crud.onrender.com/api/faqs";

const useAuthStore = create((set, get) => ({
  isAuth: false,
  user: null,
  cruds: [],

  login: (userData) => {
    set({ user: userData, isAuth: true });
    localStorage.setItem("access_token", userData.access_token || "");
    localStorage.setItem("refresh_token", userData.refreshToken || "");
  },

  logout: () => {
    set({ user: null, isAuth: false });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  updateUser: (newUserData) => set({ user: newUserData }),

  load: async () => {
    try {
      const res = await fetch(API);
      const json = await res.json();
      set({ cruds: json.data || [] });
    } catch (err) {
      console.error("Load failed:", err);
      set({ cruds: [] });
    }
  },

  add: async (question, answer) => {
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      get().load();
    } catch (err) {
      console.error("Add failed:", err);
    }
  },

  remove: async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      get().load();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  },
}));

export default useAuthStore;
