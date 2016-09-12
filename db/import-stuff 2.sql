load data local infile 'C:/Users/nik/Documents/book/db/book trimmed again unicode 2.txt' into
table book CHARACTER SET UTF8 fields terminated by ';'
lines terminated by '\n'
(author,title,subtitle,isbn,publisher,genre,number_of_pages,language,annotation,illustrator,translator,original_title,original_language,year_of_publishing)