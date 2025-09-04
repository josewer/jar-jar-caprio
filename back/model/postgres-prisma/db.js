import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

/** @type {import('@prisma/client').Prisma.ExerciseDelegate} */
export const exerciseModel = prisma.exercise

