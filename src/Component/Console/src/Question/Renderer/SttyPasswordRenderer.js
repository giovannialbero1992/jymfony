const AbstractRenderer = Jymfony.Component.Console.Question.Renderer.AbstractRenderer;

const child_process = require("child_process");
const shell_exec = (command) => {
    let obj = child_process.spawnSync(command, [], {
        shell: true,
        stdio: [
            0,
            'pipe',
            'pipe',
        ],
    });

    return obj.stdout.toString();
};

/**
 * Renders a PasswordQuestion prompt using stty to hide
 * password or echo.
 * This class is internal and should be considered private
 * DO NOT USE this directly.
 *
 * @internal
 * @memberOf Jymfony.Component.Console.Question.Renderer
 */
class SttyPasswordRenderer extends AbstractRenderer {
    /**
     * @inheritDoc
     */
    doAsk() {
        const sttyMode = shell_exec('stty -g');

        return new Promise((resolve) => {
            shell_exec('stty -echo');

            this._output.write('[<info>?</info>] ' + this._question._question + ' ');
            let cb;
            this._input.on('data', cb = (line) => {
                line = __jymfony.rtrim(line.toString(), '\r\n');

                shell_exec('stty ' + sttyMode);
                this._input.removeListener('data', cb);
                this._input.pause();
                this._output.write("\n");

                resolve(line);
            });
        });
    }
}

module.exports = SttyPasswordRenderer;
