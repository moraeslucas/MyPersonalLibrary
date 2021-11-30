package com.maven.fullstack.fullstackwithmaven.book;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class BooksService {

	private static List<Book> books = new ArrayList<>();

	static {
		books.add(new Book(100704, "myPersonal", "Catch-22"));
		books.add(new Book(305006, "myPersonal", "Lord of the Flies"));
		books.add(new Book(439427, "myPersonal", "The Catcher in the Rye"));
		books.add(new Book(609001, "myPersonal", "The Great Gatsby"));
		books.add(new Book(905486, "myPersonal", "To Kill a Mockingbird"));
	}

	public List<Book> findAll() {
		return books;
	}

	public Book save(Book book) {
		if (book.getId() == -1 || book.getId() == 0) {
			//It returns a Long between 100000 and 999999
			book.setId(getLongInRange(100000, 999999));
			
			books.add(book);	
		} 
		else {
			deleteById(book.getId());
			books.add(book);
		}
		
		return book;
	}

	public Long getLongInRange(int min, int max){
		Long longInRange;
	    
	    longInRange = (long) (Math.random() * ((max-min)+1)) + min;
	    
	    return longInRange;
	}
	
	public Book deleteById(long id) {
		Book book = findById(id);

		if (book == null)
			return null;

		if (books.remove(book)) {
			return book;
		}

		return null;
	}

	public Book findById(long id) {
		for (Book book : books) {
			if (book.getId() == id) {
				return book;
			}
		}

		return null;
	}
}