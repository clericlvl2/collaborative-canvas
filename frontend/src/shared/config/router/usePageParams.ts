import { useParams } from 'react-router';

export enum PageParams {
    BoardId = 'boardId'
}

export const usePageParams = useParams<{
    [PageParams.BoardId]?: string;
}>;
