export interface NewUserDTO {
    id: string
    name: string | null,
    email: string,
    image:string | null,
    password: string
}

export type UserDTO = Omit<NewUserDTO, 'password'> 