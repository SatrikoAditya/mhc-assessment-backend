import JWT from 'jsonwebtoken'

export const generateToken = (currentUser: any) =>
  JWT.sign({ currentUser }, process.env.SECRET_KEY || '');

export const verifyToken = (token: string) => JWT.verify(token, process.env.SECRET_KEY || '');