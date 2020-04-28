import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';
import React, { Component } from 'react';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            percent: 0,
        };
        this.increase = this.increase.bind(this);
    };

    componentDidMount() {
        this.increase();
    };

    increase() {
        const { percent } = this.state;
        const { end } = this.props;
        const newPercent = percent + 1;
        if (newPercent >= end) {
            clearTimeout(this.tm);
            return;
        };
        this.setState({ percent: newPercent });
        this.tm = setTimeout(this.increase, 10);
    };

    render() {
        const { percent } = this.state;
        const {
            strokeWidth, trailWidth,
            strokeColor, trailColor,
            rating, amount
        } = this.props;
        return (
            <div className="progress__item">
                <div className="progress__heading">
                    <span className="progress__rating">
                        {rating}
                        <i className="fas fa-star"></i>
                    </span>
                    <span className="progress__amount">{amount}</span>
                </div>
                <Line
                    strokeWidth={strokeWidth ? strokeWidth : '1'}
                    trailWidth={trailWidth ? strokeWidth : '1'}
                    strokeColor={percent ? strokeColor : trailColor}
                    percent={percent}
                    trailColor={trailColor}
                />
            </div>
        );
    };
};

