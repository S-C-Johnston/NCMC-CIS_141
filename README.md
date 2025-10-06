2025-10-06 Project plan

Per the directed study, I need to accomplish the following objectives.
 
 - CIS 141 CLO-1: Create web applications from static web pages.
 - CIS 141 CLO-2: Implement variables, control statements and data structures in web designs.
 - CIS 141 CLO-3: Build web pages utilizing jQuery.
 - CIS 141 CLO-4: Analyze unfamiliar code using third-party libraries and frameworks.
 - CIS 141 CLO-5: Use web API's to populate content into a website.
 - CIS 141 CLO-6: Support the program server side JavaScript with Nodejs.

Of those, by discussion with the instructor, I will substitute the backend of server-side javascript/Nodejs with a different backend. In this case, I'll use a backend .net service I wrote for a previous class. jQuery is not really in vogue anymore, but I'll at least call some of its methods.

---

The outline of the project I'm thinking about is a book manager frontend. It will perform CRUD operations against a .net backend API in order to manage book objects with a webUI.

I'll use typescript + react for the majority of the frontend. CLO-1 seems to indicate that the front-end should use raw HTML at some point, so templates will be useful. CLO-2 is kind of inherent to building anything stateful, which this will be. CLO-4 is inherent to using typescript and react. CLO-5 is inherent to talking to a backend API.

For now, I'll not plan on anything beyond getting the frontend to talk to the backend and Create, Read, Update, and Delete values, which should all be implemented currently.

If I have extra time, I may try to expand the backend to support containing books in shelves, or as it is relevant to my life right now as I'm moving, boxes.

Ideally, this will be written such that a single docker compose command will bring containers for both the web-server and the backend API up.

As a bonus goal, I'd like to handle the build system with multi-stage containers.
