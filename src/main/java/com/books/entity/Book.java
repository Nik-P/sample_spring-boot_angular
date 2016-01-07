package com.books.entity;

import com.books.entity.helpers.StartEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.Pattern;

@Entity
public class Book extends StartEntity{

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY ,mappedBy = "book")
    private Set<BookOfUser> userbook = new HashSet<>();
    
    private String author;

    private String title;
    
    private String subtitle;
    
    @Size(max = 13)
    @Column(unique=true, nullable=false)
    @Pattern(regexp="(97[89][0-9]{10}|[0-9]{9}[0-9Xx]{1})",
             message="Not a valid input")
    private String isbn;

    private String publisher;
    
    private String genre;
    
    private int numberOfPages;
    
    private String language;

    private String annotation;
    
    private String illustrator;
        
    private String translator;

    private String originalTitle;
    
    private String originalLanguage;
    
    @Size(max = 4, min = 4)
    private String yearOfPublishing;

    private String cover;

    protected Book(){
        
    }
    
    /*--- get set title ---*/
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    /*--- get set author ---*/
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    /*--- get set yearOfPublishing ---*/
    public String getYearOfPublishing() {
        return yearOfPublishing;
    }

    public void setYearOfPublishing(String yearOfPublishing) {
        this.yearOfPublishing = yearOfPublishing;
    }

    /*--- get set language ---*/
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    /*--- get set cover ---*/
    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    /*--- get set publisher ---*/
    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    /*--- get set annotation ---*/
    public String getAnnotation() {
        return annotation;
    }

    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }

    /*--- get set numberOfPages ---*/
    public int getNumberOfPages() {
        return numberOfPages;
    }

    public void setNumberOfPages(int numberOfPages) {
        this.numberOfPages = numberOfPages;
    }

    /*--- get set genre ---*/
    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    /**
     * @return the subtitle
     */
    public String getSubtitle() {
        return subtitle;
    }

    /**
     * @param subtitle the subtitle to set
     */
    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    /**
     * @return the isbn
     */
    public String getIsbn() {
        return isbn;
    }

    /**
     * @param isbn the isbn to set
     */
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    /**
     * @return the illustrator
     */
    public String getIllustrator() {
        return illustrator;
    }

    /**
     * @param illustrator the illustrator to set
     */
    public void setIllustrator(String illustrator) {
        this.illustrator = illustrator;
    }

    /**
     * @return the translator
     */
    public String getTranslator() {
        return translator;
    }

    /**
     * @param translator the translator to set
     */
    public void setTranslator(String translator) {
        this.translator = translator;
    }

    /**
     * @return the originalTitle
     */
    public String getOriginalTitle() {
        return originalTitle;
    }

    /**
     * @param originalTitle the originalTitle to set
     */
    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    /**
     * @return the originalLanguage
     */
    public String getOriginalLanguage() {
        return originalLanguage;
    }

    /**
     * @param originalLanguage the originalLanguage to set
     */
    public void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    /**
     * @return the userbook
     */
    public Set<BookOfUser> getUserbook() {
        return userbook;
    }

    /**
     * @param userbook the userbook to set
     */
    public void setUserbook(Set<BookOfUser> userbook) {
        this.userbook = userbook;
    }
}