export interface IGetUserDTO {
    id: string;
}
export interface IGetResponseDTO {
    name: string;
    email: string;
    phones?: { number: string }[];
}
