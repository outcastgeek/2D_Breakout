class AI {

    constructor(context, state, props) {
        this.context = context;
        this.state = state;
        this.props = props;
        this.py = undefined;
    }

    update() {
        this.py = this.state.aiy
        const desty = this.state.bally - (this.props.paddleHeight - this.props.ballSize) * 0.5;
        this.py = this.py + (desty - this.py) * 0.1;
        this.context.setState({ aiy: this.py })
    }

    draw() {
        this.context._context.fillRect(
            this.state.aix,
            this.state.aiy,
            this.props.paddleWidth,
            this.props.paddleHeight
        );
    }

    name() {
        return 'ai';
    }

    position() {
        return {
            x: this.state.aix,
            y: this.state.aiy
        }
    }
}

export default AI

