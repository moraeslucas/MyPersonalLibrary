import axios from 'axios'

const USER = 'myPersonal'
const BOOK_API_URL = 'http://localhost:8080'
const USER_API_URL = `${BOOK_API_URL}/users/${USER}`

class BookDataService {

    formatId(id){
        let idFormatted;

        if(id === '-1')
            idFormatted = 'XXX-X-XX';
        else {
            idFormatted = id.toString().substring(0, 3).concat('-');
            idFormatted = idFormatted.concat(id.toString().substring(3, 4)).concat('-');
            idFormatted = idFormatted.concat(id.toString().substring(4, 6));
        }
        
        return idFormatted;
    }
    
    retrieveAllBooks(name) {
        return axios.get(`${USER_API_URL}/books`);
    }

    retrieveBook(name, id) {
        return axios.get(`${USER_API_URL}/books/${id}`);
    }

    deleteBook(name, id) {
        return axios.delete(`${USER_API_URL}/books/${id}`);
    }

    updateBook(name, id, book) {
        return axios.put(`${USER_API_URL}/books/${id}`, book);
    }

    createBook(name, book) {
        return axios.post(`${USER_API_URL}/books/`, book);
    }
}

export default new BookDataService()