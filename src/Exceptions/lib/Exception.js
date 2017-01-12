class Exception extends Error {
    constructor(message, previous = undefined) {
        super(message);

        this.name = this.constructor.name;
        this.previous = previous;
        this.message = message;
        if ('function' === typeof Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

global.Exception = Exception;
