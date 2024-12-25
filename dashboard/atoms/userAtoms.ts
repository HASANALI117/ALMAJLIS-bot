import { atom } from "jotai";
import axios from "axios";

export type User = {
  userID: string;
  username: string;
  avatar: string;
};

export type Guild = {
  id: string;
  name: string;
  icon: string;
};

export const userAtom = atom<User | null>(null);

export const fetchUserAtom = atom(null, async (get, set) => {
  try {
    const response = await axios.get("http://localhost:3002/dashboard", {
      withCredentials: true,
    });

    set(userAtom, response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

export const guildsAtom = atom<Guild[]>([]);

export const fetchGuildsAtom = atom(null, async (get, set) => {
  try {
    const response = await axios.get("http://localhost:3002/dashboard/guilds", {
      withCredentials: true,
    });

    set(guildsAtom, response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});
