import {Component} from 'react'
import values from 'object.values'
import {Link} from 'react-router'
import React from "react";
import * as access from "../../access";

export default class Stream extends Component {

    constructor(props) {
        super(props);
        fetch(access.domain + '/g/list')
            .then(response => response.json())
            .then(stream => {
                this.setState(stream)
            })
            .catch(console.error)
    }

    static humans(count) {
        if (count % 10 === 1) {
            return count + ' студент'
        } else if (count % 10 < 5) {
            return count + ' студента'
        } else {
            return count + ' студентов'
        }
    }

    render() {
        console.log(this.state);
        return (
            <div id="stream-page" className="content-wrap"><h1> Группы </h1>
                <ul className="groups">{this.state ? values(this.state).map(group => <li className="group"
                                                                                         key={group[0]}><Link
                    to={'/group/' + group[0]}> {group[0]} - {Stream.humans(group[1])}</Link></li>) : null}</ul>
            </div>)
    }
}
