1. Mention two parts of Express that you learned about this week

Convenience Helper: expressadds many helpers that provide out of the box functionality to make writing web applications and api servers easier.

Routing: A way to select which request handler function is executed based on the URL visited and the HTTP method used. Provides a way to break an application into smaller parts based on the route.

2. Describe Middleware?

Functions that get the request and response objects and can operate on them and either return the response or call the next middleware in the pipeline. Examples are logging or security.

3. Describe a Resource?

A resource would represent the data being called and managed by our web api backend.

4. What can the API return to help clients know if a request was successful?

Depending on the CRUD API can return a status  code 200 (OK - good for get), 201 (Created - good for post), 202 (Accepted - good for delete), or an obj that was created. In addition, the API can return a JSON obj with the message that explains the user the result of the request (status code). 

5. How can we partition our application into sub-applications?

It is possible to break an application into sub-applications by using Express's built-in router to modularize end points or use export.modules = function() to section off middleware.