# Project-Contacts
A simple secure client administrator information log.

Noteworthy pages are:

/ - homepage with links to other pages

/mailer - pages where client log their information in.

/contacts - secured page where administrators can view all client information along with a map with markers on client's address and 
perform CRUD operations on them

/login - for authentication

/logout - self-explanatory



/*------------------------------------------------------*/

Project details:

Users are able to visit /mailer to get a standard HTML form where they can fill out their information.

The form submits(POST) to server, where the contact information will be inserted into the database.  The user then sees a thank you page.

GET Requests to /contacts shows a table of all contact information found in the database.

Format of contact information:

First Name                 (String)

Last Name                 (String)

Street                         (String)

City                         (String)

State                         (String)

Zip                         (String)

Phone                         (String)

Email                         (String)

Mr./Mrs./Ms./Dr.         (String)

Contact By Mail        (Boolean)

Contact By Phone        (Boolean)

Contact BY Email         (Email)


Geocoding is performed on the server and latitude longitude is saved along with contact information in a database.


On the /contacts page administrators are able to:

View all the information that is stored on database.
Perform CRUD operations on them without having to navigate to any other pages.
View a map with all the adresses marked (Note: Map updates when CRUD operations are performed).





