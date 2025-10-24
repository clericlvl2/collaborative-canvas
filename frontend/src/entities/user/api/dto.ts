export interface IUserDTO {
    _id: string;
    name: string;
    email: string;
}

export interface ILoginResponseDTO {
    user: IUserDTO;
    token: string;
}
