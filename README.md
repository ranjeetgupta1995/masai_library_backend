# masai_library_backend

http://localhost:4000
* This endpoint is home page of masai library.
<img width="500" height="150" alt="homePage" src="/image/homepage.png">

http://localhost:4000/register 
* This endpoint will allow customers to register. Hash the password on store.

http://localhost:4000/login
* This endpoint will allow customers to login. Return a JWT token on login.

http://localhost:4000/books
* This endpoint will return a list of all available books.

http://localhost:4000/books/:id
* This endpoint will return the details of a specific book identified by its ID.

http://localhost:4000/books?category=fiction
* This endpoint will give only those books whose category is fiction. (it will work with all the categories, not just fiction)

http://localhost:4000/books/update/:id
* This endpoint will allow admin to update the details of a specific book identified by its ID.

http://localhost:4000/books/delete/:id
* This endpoint will allow admin to delete a specific book identified by its ID. 

## 🌐 Deployed Link : 
https://tiny-jade-mackerel-coat.cyclic.app/