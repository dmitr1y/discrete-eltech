import {Component} from 'react'
import ReactDOM from 'react-dom'
import Table from '../Table'
import Toolbar from '../Toolbar'
import React from "react";

export default class FastDegreeTrainer extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.refreshExample()
    }

    refreshExample() {
        fetch('https://edu.konstantinov.com.ru/app/evklid/solve/fastDegree')
            .then(response => response.json())
            .then(example => {
                let inputs = ReactDOM.findDOMNode(this).querySelectorAll('input[type="number"]'); // Fuck JavaScript
                [].forEach.call(inputs, input => {
                    input.value = '';
                    input.classList.remove('ok');
                    input.classList.remove('wrong')
                });
                this.setState(example)
            })
            .catch(console.error)
    }

    check(event) {
        if (event.currentTarget.value != '') {
            if (event.currentTarget.value === event.currentTarget.dataset.original) {
                event.currentTarget.classList.remove('wrong');
                event.currentTarget.classList.add('ok')
            } else {
                event.currentTarget.classList.remove('ok');
                event.currentTarget.classList.add('wrong')
            }
        }
    }

    render() {
        return (
            <div className="content-wrap"><Toolbar/>
                <h1> Быстрое возведение в степень </h1>
                <h2> Тренажёр </h2>{this.state.input ?
                    <div><p> Возвести{this.state.input[0]}в{this.state.input[1]}</p><Table
                        data={this.state.table.map(row => row.map(col => col !== '' ? (
                            <div className="input-number-wrap"><input type="number" data-original={col}
                                                                      onBlur={e => this.check(e)}/> <i
                                className="checker"></i></div>) : null))}/> <code
                        className="answer-area"> Ответ : & nbsp; <div className="input-number-wrap"><input type="number"
                                                                                                           data-original={this.state.output}
                                                                                                           onBlur={e => this.check(e)}/>
                        <i
                            className="checker"> </i>
                    </div></code>
                        <div className="button-wrap">
                            <button onClick={e => this.refreshExample()}> Обновить</button>
                        </div>
                    </div> : null}
            </div>)
    }
};
