import {prisma} from "@/lib/prisma"
import { IUserRepository } from "../interfaces/repositories"
import { NewUserDTO, UserDTO } from "../types/user.types"
import { userSelect } from "./records/payload.records"

export class UserRepository implements IUserRepository {
    async save(userData: UserDTO | NewUserDTO){
        const {email, name, image} = userData

        // get user by email if exist
        const existEmail = await prisma.user.findUnique({
            where: {email}
        })

        // if password exist is a new user
        if ('password' in userData){
            // check if email already exists
            if (existEmail){
                throw new Error('Email already exists')
            }

            const {password} = userData
            
            return prisma.user.create({
                data: {name, email, password, image},
                select: userSelect
            })
        } 

        const {id} = userData

        // if email already exist, throw the exception
        if (existEmail && existEmail.id !== id) {
            throw new Error('Email already exists')   
        }

        // check if the user exists
        const existUser = await prisma.user.findUnique({
            where: {id}
        })

        if (!existUser){
            throw new Error('User not found')
        }

        // update user Data
        return prisma.user.update({
            where: {id},
            data: {name, email, image},
            select: userSelect
        })
    }

    async findByEmail(email: string){
        return prisma.user.findUnique({
            where: { email },
            select: userSelect
        })
    }
}