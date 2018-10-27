import React, {Component} from 'react'
import values from 'object.values'
import {Link} from 'react-router'

export default class Group extends Component {

    constructor(props) {
        super(props);
        fetch('http://evklid.edu.konstantinov.com.ru/getGroup/' + parseInt(this.props.params.groupID))
            .then(response = > response.json()
    )
    .
        then(group = > {
            this.setState(group)
    })
    .
        catch(console.error)
    }

    render() {
        return (
            < div
        id = "groups-pagлe"
        className = "content-wrap" >
            < h1 > Группа
        {
            this.props.params.groupID
        }
    <
        /h1>
        < ul
        className = "students" >
        {this.state ? values(this.state).map(student = > {
            return( < li className = "student"
        key = {student._id
    }>
    <
        Link
        to = {'/student/' +student._id} >
            < img
        src = {student.photo
    }
        className = "photo" / >
            < span
        className = "name" > {student.first_name
    }
        {
            student.last_name
        }
    <
        /span>
        < /Link>
        < /li>)
    }) :
        null
    }
    <
        /ul>
        < /div>
    )
    }
}
