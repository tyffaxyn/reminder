import 'server-only'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from '@/db/db'

const SECRET = 'use_an_ENV_VAR'

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET)
  return token
}

export const getUserFromToken = async (token: {
  name: string
  value: string
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id: string }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id
    }
  })

  return user
}

export const signin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) throw new Error('invalid user')

  const correctPW = await comparePW(password, user.password)

  if (!correctPW) {
    throw new Error('invalid user')
  }

  const token = createTokenForUser(user.id)

  return { user, token }
}

export const signup = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const hashedPW = await hashPW(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPW
    }
  });

  const token = createTokenForUser(user.id)

  return { user, token };
}

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW)
}
