import React, { Component } from 'react';
import Fetch from 'react-fetch';

import './App.css';

export default class App extends Component{
    render() {
        return (
            <Fetch url="/api/rates">
                <MulticcyBox/>
            </Fetch>
        )
    }
}

// Structure for page

// - MulticcyBox
//   - MulticcyForm
//   - MulticcyResult
//   - MulticcyHistory
//     - MulticcyRow

class MulticcyBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        };
    }

    handleMulticcySubmit(request) {
        // Called from MulticcyForm when a multiccy request is submitted
        var result = doConversion(this.props.rates, request.entry);
        this.setState({error: ''});

        var history = this.state.history;
        history.unshift(result);
        this.setState({history: history});

    }

    render() {
        return (
            <div>
                <h1>Multiccy</h1>
                <MulticcyForm
                    onMulticcySubmit={(request) =>
                        this.handleMulticcySubmit(request)}
                />
                <MulticcyResult error={this.state.error} result={this.state.history[0]} />
                <hr/>
                <MulticcyHistory history={this.state.history} />
            </div>
        );
    }
}

class MulticcyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: ''
        };
    }

    handleEntryChange(e) {
        this.setState({entry: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();     // prevent default submit form
        // Clean up results
        var entry = this.state.entry.trim();
        if (!entry) {
            return;
        }
        this.props.onMulticcySubmit({entry: entry});
        // Remove results from form
        this.setState({entry: ''});
    }

    render() {
        return (
            <form
                className="multiccyForm"
                onSubmit={(entry) => this.handleSubmit(entry)}>
                <input
                    type="text"
                    size="50"
                    placeholder="Enter a conversion, eg 100 GBP to USD"
                    value={this.state.entry}
                    onChange={(entry) => this.handleEntryChange(entry)}
                />
                <input type="submit" value="Go" />
            </form>
        );
    }
}

class MulticcyResult extends Component {
    render() {
        return (
            <div>
                <p className="multiccyResult">
                    {renderConversion(this.props.result)}
                </p>
            </div>
        );
    }
}

class MulticcyHistory extends Component {
    render() {
        var nodes = this.props.history.map(function(node) {
            return (
                <MulticcyRow data={node} />
            );
        });
        return (
            <div>
                <h2>History</h2>
                {nodes}
            </div>
        );
    }
}

class MulticcyRow extends Component {
    render() {
        return <p>{renderConversion(this.props.data)}</p>;
    }
}

function renderConversion(data) {
    return data ?
           ( data.fromAmount + " " + data.fromCcy + " = " +
             data.toAmount + " " + data.toCcy ) : "";
}

function doConversion(rates, text) {
    console.log('The rates are: ', rates);

    const words = text.split(' ');
    const fromAmount = words[0];
    const fromCcy = words[1].toUpperCase();
    const toCcy = words[3].toUpperCase();

    const fromUsd = (fromCcy === 'USD') ?
                    fromAmount : fromAmount / rates[fromCcy];
    const toAmount = (toCcy === 'USD') ?
                     fromUsd : fromUsd * rates[toCcy];

    return {fromAmount: fromAmount, fromCcy: fromCcy,
            toAmount: toAmount, toCcy: toCcy};
}
