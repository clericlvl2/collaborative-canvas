export type IDialogResult = boolean;

export interface IRoomDialogProps {
    onError?: (error: unknown, fallbackMessage: string) => void;
}
