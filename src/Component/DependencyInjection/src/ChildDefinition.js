const Definition = Jymfony.Component.DependencyInjection.Definition;

/**
 * @memberOf Jymfony.Component.DependencyInjection
 */
class ChildDefinition extends Definition {
    /**
     * Constructor.
     *
     * @param {Jymfony.Component.DependencyInjection.Definition} parent
     */
    __construct(parent) {
        super.__construct();

        this._parent = parent;
        this._replacedArguments = {};
    }

    /**
     * Gets the extended definition.
     *
     * @returns {Jymfony.Component.DependencyInjection.Definition}
     */
    getParent() {
        return this._parent;
    }

    /**
     * @inheritDoc
     */
    getArguments() {
        let args = [ ...this._arguments ];
        for (let [ k, v ] of this._replacedArguments) {
            if (k >= args.length) {
                continue;
            }

            args[k] = v;
        }

        return __jymfony.deepClone(args);
    }

    /**
     * @inheritDoc
     */
    getArgument(index) {
        if (this._replacedArguments.hasOwnProperty(index)) {
            return this._replacedArguments(index);
        }

        return super.getArgument(index);
    }

    /**
     * @inheritDoc
     */
    replaceArgument(index, argument) {
        this._replacedArguments[index] = argument;

        return this;
    }
}

module.exports = ChildDefinition;
