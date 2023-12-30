// authUtils.ts

export interface AuthCredentials {
    username: string;
    password: string;
  }

  export const authenticateUser = ({ username, password }: AuthCredentials): boolean => {
    // Replace this with your actual authentication logic
    // For demonstration purposes, we'll use hardcoded credentials
    return username === process.env.SYSUSER && password === process.env.SYSPASS;
  };
  