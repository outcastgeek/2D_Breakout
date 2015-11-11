class Ball {

    constructor(context, state, props, ai, player) {
        this.pi = Math.PI;
        this.r = Math.random();
        this.context = context;
        this.state = state;
        this.score = this.context._score;
        this.props = props;
        this.ai = ai;
        this.player = player;
    }

    serve(side) {
        const phi = 0.1 * this.pi * (1 - 2 * this.r);
        this.context.setState({
            ballx: side == 1 ? this.state.playerx + this.props.paddleWidth : this.state.aix - this.props.ballSize,
            bally: (this.props.height - this.props.ballSize) * this.r,
            velx: this.state.ballSpeed * Math.cos(phi) * side,
            vely: this.state.ballSpeed * Math.sin(phi)
        });
    }

    update() {
        const bx = this.state.ballx;
        const by = this.state.bally;
        const vx = this.state.velx;
        const vy = this.state.vely;

        this.context.setState({
            ballx: bx + vx,
            bally: by + vy
        });

        if (0 > by || by + this.props.ballSize > this.props.height) {
            const offset = this.state.vely < 0 ? 0 - this.state.bally : this.props.height - (this.state.bally + this.props.ballSize);
            this.context.setState({
                bally: by + 2 * offset,
                vely: vy * -1
            });
        }

        const pdle = this.state.velx < 0 ? this.player : this.ai;

        const AABBIntersect = (paddleX, paddleY, pWidth, pHeight, bx, by, bw, bh) => {
            return paddleX < bx + bw && paddleY < by + bh && bx < paddleX + pWidth && by < paddleY + pHeight;
        };

        if (AABBIntersect(pdle.position().x, pdle.position().y, this.props.paddleWidth, this.props.paddleHeight,
                                                           this.state.ballx, this.state.bally, this.props.ballSize, this.props.ballSize)) {
            const dir = this.state.velx < 0 ? 1 : -1;
            const n = (this.state.bally + this.props.ballSize - pdle.position().y) / (this.props.paddleHeight + this.props.ballSize);
            const ydir = (n > 0.5 ? -1 : 1) * dir;
            const phi = (0.25 * pi) * (2 * n + dir) + r;
            const smash = Math.abs(phi) > 0.2 * this.pi ? 1.1 : 1;

            this.context.setState({
                ballx: pdle === player ? this.state.playerx + this.props.paddleWidth : this.state.aix - this.props.ballSize,
                velx: smash * -1 * this.state.velx,
                vely: smash * ydir * this.state.velx * Math.sin(phi)
            });
        }

        if (0 > this.state.ballx + this.props.ballSize || this.state.ballx > this.props.width) {
             this.score(pdle.name());
             this.serve(pdle.name() === this.player.name() ? 1 : -1);
        }
    }

    draw() {
        this.context._context.beginPath();
        this.context._context.arc(this.state.ballx, this.state.bally, this.props.ballSize, 0, 2 * Math.PI);
        this.context._context.fill();
        this.context._context.lineWidth = 0;
        this.context._context.strokeStyle = '#fff';
        this.context._context.stroke();
    }
}

export default Ball

