export class UniqueFeatureError extends Error {
    constructor() {
        super();
        this.name = "UniqueFeatureError";
        Object.setPrototypeOf(this, UniqueFeatureError.prototype);
    }
}