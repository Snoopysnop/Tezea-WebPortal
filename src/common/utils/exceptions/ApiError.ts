import { SubErrorDetails } from "../../../api/Model"

class ApiError extends Error {

    status: number
    description: string
    error: String

    constructor(status: number, error: string, description: string) {
        super(description)
        this.status = status
        this.error = error
        this.description = description
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export default ApiError