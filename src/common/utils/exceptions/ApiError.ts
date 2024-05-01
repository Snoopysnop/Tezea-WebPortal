import { SubErrorDetails } from "../../../api/Model"

class ApiError extends Error {

    status: number
    type: string
    errors?: SubErrorDetails[]

    constructor(status: number, type: string, message: string, errors?: SubErrorDetails[]) {
        super(message)
        this.status = status
        this.type = type
        this.errors = errors
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export default ApiError