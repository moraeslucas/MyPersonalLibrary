import React, { Component } from 'react'
import BookDataService from '../service/BookDataService';

const USER = 'myPersonal'

class ListBooksComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            errorMessage: null,
            message: null
        }
        this.deleteBookClicked = this.deleteBookClicked.bind(this)
        this.updateBookClicked = this.updateBookClicked.bind(this)
        this.addBookClicked = this.addBookClicked.bind(this)
        this.refreshBooks = this.refreshBooks.bind(this)
    }

    componentDidMount() {
        //if(this.props.location.search == "?add") {
        
        // eslint-disable-next-line
        if(this.props.location.state != null) {
            // eslint-disable-next-line
            if(this.props.location.state == -1)
                this.setState({ message: `The new book has been added` })
            else
                this.setState({ message: `The book ${BookDataService.formatId(this.props.location.state)} has been updated` })
        }
        
        this.refreshBooks();
    }

    refreshBooks() {
        BookDataService.retrieveAllBooks(USER)
            .then(
                response => {
                    this.setState({ books: response.data })
                }
            )
    }

    deleteBookClicked(id) {
        BookDataService.deleteBook(USER, id)
            .then(
                response => {
                    this.setState({ message: null })
                    this.setState({ errorMessage: `The book ${BookDataService.formatId(id)} has been deleted` })
                    this.props.history.push(`/books`) //This resets this.props.location.state
                    this.refreshBooks()
                }
            )

    }

    addBookClicked() {
        this.props.history.push(`/books/-1`)
    }

    updateBookClicked(id) {
        this.props.history.push(`/books/${id}`)
    }

    render() {
        return (
            <div className="container">
                <h6 className="App-line">
                    {this.state.errorMessage && <div className="alert App-alert-danger">{this.state.errorMessage}</div>}
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                </h6>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Book Identifier</th>
                                <th>Title\Description</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //It loops through every single book
                                this.state.books.map(
                                    //For every book it loops, it creates this 'tr' 
                                    (book) =>
                                        <tr key={book.id}>
                                            <td className="text-center">
                                                {BookDataService.formatId(book.id)}
                                            </td>
                                            <td>{book.description}</td>
                                            <td><button className="btn btn-outline-info" onClick={() => this.updateBookClicked(book.id)}>Update</button></td>
                                            <td>
                                                <button className="btn btn-outline-danger" onClick={() => {if (window.confirm('Could you confirm you wish to delete this Book?')) 
                                                                                                              this.deleteBookClicked(book.id)}}>
                                                Remove
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-primary App-button-wide" onClick={this.addBookClicked}>Include Book</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooksComponent