package com.maven.fullstack.fullstackwithmaven.book;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class BookResource {

	@Autowired
	private BooksService bookManagementService;

	@GetMapping("/users/{username}/books")
	public List<Book> getAllBooks(@PathVariable String username) {
		return bookManagementService.findAll();
	}

	@GetMapping("/users/{username}/books/{id}")
	public Book getBook(@PathVariable String username, @PathVariable long id) {
		return bookManagementService.findById(id);
	}

	@DeleteMapping("/users/{username}/books/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable String username, @PathVariable long id) {

		Book book = bookManagementService.deleteById(id);

		if (book != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping("/users/{username}/books/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable String username, @PathVariable long id,
			@RequestBody Book book) {

		bookManagementService.save(book);

		return new ResponseEntity<Book>(book, HttpStatus.OK);
	}

	@PostMapping("/users/{username}/books")
	public ResponseEntity<Void> createBook(@PathVariable String username, @RequestBody Book book) {

		Book createdBook = bookManagementService.save(book);

		// Location
		// Get current resource url
		/// {id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdBook.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}

}