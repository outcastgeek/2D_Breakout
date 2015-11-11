class Player {

    constructor(context, state, props, keystate) {
        this.context = context;
        this.state = state;
        this.props = props;
        this.keystate = keystate;
        this.py = undefined;
    }


    update() {
        this.py = this.state.playery;
        if (this.keystate[this.props.upArrow]) {
            this.py = this.state.playery + this.props.paddleSpeed;
            this.context.setState({ playery: this.py });
        }
        if (this.keystate[this.props.downArrow]) {
            this.py = this.state.playery + this.props.paddleSpeed;
            this.context.setState({ playery: this.py });
        }
        // keep the paddle inside of the canvas
        this.py = Math.max(Math.min(this.py, this.props.height - this.props.paddleHeight), 0);
        this.context.setState({ playery: this.py });
    }

    draw() {
        this.context._context.fillRect(this.state.playerx, this.state.playery, this.props.paddleWidth, this.props.paddleHeight);
    }

    name() {
        return 'player';
    }

    position(y) {
        if (y) {
            this.context.setState({ playery: this.py });
        }
        return {
            x: this.state.playerx,
            y: this.state.playery
        }
    }
}

export default Player

