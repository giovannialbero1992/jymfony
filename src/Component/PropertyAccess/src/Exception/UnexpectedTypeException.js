const RuntimeException = Jymfony.Component.PropertyAccess.Exception.RuntimeException;

/**
 * @namespace Jymfony.Component.PropertyAccess
 * @type {Jymfony.Component.PropertyAccess.Exception.UnexpectedTypeException}
 */
module.exports = class UnexpectedTypeException extends RuntimeException {
    constructor(value, propertyPath, index) {
        super();

        this.message = 'PropertyAccessor requires a graph of objects or arrays to operate on, ' +
            'but it found type "' + (typeof value) + '" while trying to traverse path "' +
            propertyPath.toString() + '" at property "' + propertyPath.getElement(index) + '".';
    }
};
