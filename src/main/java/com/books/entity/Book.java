package com.books.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Book{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String title;

	private String author;

	@Size(max = 4, min = 4)
	private String yearOfPublishing;
	
	private String language;

	private String cover;

	private String publisher;

	private String annotation;

	private int numberOfPages;

	private String style;

	
	/*--- set get ID  ---*/
	public long getId(){
		return id;
	}
	
	public void setId(long id){
		this.id = id;
	}

	/*--- get set title ---*/
	public String getTitle(){
		return title;
	}
	
	public void setTitle(String title){
		this.title = title;
	}

	/*--- get set author ---*/
	public String getAuthor(){
		return author;
	}
	
	public void setAuthor(String author){
		this.author = author;
	}

	/*--- get set yearOfPublishing ---*/
	public String getYearOfPublishing(){
		return yearOfPublishing;
	}
	
	public void setYearOfPublishing(String yearOfPublishing){
		this.yearOfPublishing = yearOfPublishing;
	}
		
	/*--- get set language ---*/
	public String getLanguage(){
		return language;
	}
	
	public void setLanguage(String language){
		this.language = language;
	}

	/*--- get set cover ---*/
	public String getCover(){
		return cover;
	}
	
	public void setCover(String cover){
		this.cover = cover;
	}

	/*--- get set publisher ---*/
	public String getPublisher(){
		return publisher;
	}
	
	public void setPublisher(String publisher){
		this.publisher = publisher;
	}

	/*--- get set annotation ---*/
	public String getAnnotation(){
		return annotation;
	}
	
	public void setAnnotation(String annotation){
		this.annotation = annotation;
	}

	/*--- get set numberOfPages ---*/
	public int getNumberOfPages(){
		return numberOfPages;
	}
	
	public void setNumberOfPages(int numberOfPages){
		this.numberOfPages = numberOfPages;
	}

	/*--- get set style ---*/
	public String getStyle(){
		return style;
	}
	
	public void setStyle(String style){
		this.style = style;
	}
}