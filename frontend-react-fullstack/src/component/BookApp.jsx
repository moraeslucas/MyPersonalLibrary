import React, { Component } from 'react';
import ListBooksComponent from './ListBooksComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BookComponent from './BookComponent';

class BookApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>My Personal Library</h1>
                    <Switch>
                        <Route path="/" exact component={ListBooksComponent} />
                        <Route path="/books" exact component={ListBooksComponent} />
                        <Route path="/books/:id" component={BookComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default BookApp