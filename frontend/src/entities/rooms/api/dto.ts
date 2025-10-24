export interface IRoomDTO {
    _id: string;
    name: string;
    owner: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
}

export type IGetRoomsResponseDTO = IRoomDTO[];
