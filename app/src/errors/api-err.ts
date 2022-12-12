import IApiError from '../interfaces/api-err';

class ApiError extends Error {

    statusCode

    constructor({statusCode,error}: IApiError){
        super();
        this.statusCode = statusCode;
        this.message = error;
    }

}

export default ApiError