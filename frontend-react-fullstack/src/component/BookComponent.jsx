import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BookDataService from '../service/BookDataService';

const USER = 'myPersonal'

class BookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.goBackClicked = this.goBackClicked.bind(this)

    }

    componentDidMount() {
        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        BookDataService.retrieveBook(USER, this.state.id)
            .then(response => this.setState({
                description: response.data.description
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Write a Title\\Description'
        } else if (values.description.toString().trim().length < 2) {
            errors.description = 'Write a Title\\Description with at least 2 characters'
        }

        return errors

    }

    onSubmit(values) {
        let username = USER

        let book = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        // eslint-disable-next-line
        if (this.state.id == -1) {
            BookDataService.createBook(username, book)
                .then(() => this.props.history.push({
                                pathname: '/books',
                                //search: '?add',
                                state: -1
                            })
                )
        } 
        else {
            BookDataService.updateBook(username, this.state.id, book)
                .then(() => this.props.history.push({
                                pathname: '/books',
                                state: this.state.id
                            })
                )
        }
    }

    goBackClicked() {
        this.props.history.push('/books')
    }

    render() {

        let { description, id } = this.state

        return (
            <div>
                <p className="App-line"/>
                <div className="container">
                    <Formik
                        initialValues={{ id, description }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                        <ErrorMessage  name="description" component="div" className="alert alert-danger" style={{width: "700px"}} />
                                        <fieldset className="form-group">
                                            <label className="font-weight-bold">Book Identifier</label>
                                            <Field className="form-control" type="text" name="id" style={{width: "350px"}} value={BookDataService.formatId(id)} disabled />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="font-weight-bold">Title\Description</label>
                                            <Field className="form-control" type="text" name="description" style={{width: "700px"}} />
                                        </fieldset>
                                        <p className="App-line-min"/>
                                        <button className="btn btn-primary App-button mr-4" type="submit">Save Book</button>
                                        <button className="btn btn-primary App-button" type="button" onClick={this.goBackClicked}>Go Back</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default BookComponent