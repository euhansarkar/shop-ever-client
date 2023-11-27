export interface IMeta {
    limit: number;
    page: number;
    size: number;
}

export interface ResponseSuccessType {
    data: any;
    meta?: IMeta
}

export interface IGenericErrorResponse {

}

export interface IGenericErrorMessage {
    path: string | number;
    message: string;
};

export interface IGenericErrorResponse {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
}