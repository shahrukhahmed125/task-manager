import type { AuthOptions } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
} satisfies AuthOptions;