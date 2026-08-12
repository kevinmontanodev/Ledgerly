import { IUserRepository } from "../interfaces/repositories"
import { NewUserDTO, UserDTO } from "../types/user.types"

export class UserService {
    constructor(private readonly repository: IUserRepository){}

    async getUser(email: string){
        return await this.repository.findByEmail(email)
    }

    async saveUser(userData: UserDTO | NewUserDTO){
        return await this.repository.save(userData)
    }
}