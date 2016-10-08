import React, { Component } from 'react';

import './App.css';
import Converter from './Converter';

export default class App extends Component{
    render() {
        return (
            <MulticcyBox url={this.props.url}/>
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

    componentDidMount() {
        if (this.props.url) {
            this.fetchRates(this.props.url);
        } else {
            this.setState({error: "No rates URL was provided"});
        }
    }

    fetchRates(url) {
        fetch(url, {})
            .then(res => {
                return res.json()
            })
            .then(json => {
                this.setState({converter: new Converter(json.rates)});
            })
            .catch(error => {
                console.error(error);
                this.setState({error: "There was an error loading rates"});
            })
    }

    handleMulticcySubmit(request) {
        // Called from MulticcyForm when a multiccy request is submitted
        var result = this.state.converter.convert(request.entry);
        if (result.error) {
            this.setState({error: result.error});
        } else {
            var history = this.state.history;
            history.unshift(result);
            this.setState({history: history, error: ''});
        }
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
        if (this.props.error) {
            return (<p className="multiccyError">Error: {this.props.error}</p>);
        } else {
            return (
                <div>
                    <p className="multiccyResult">
                        {renderConversion(this.props.result)}
                    </p>
                </div>
            );
        }
    }
}

class MulticcyHistory extends Component {
    render() {
        let key = 0;
        var nodes = this.props.history.map(function(node) {
            return (
                <MulticcyRow key={key++} data={node} />
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
