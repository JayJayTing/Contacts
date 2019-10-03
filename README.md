Hello!

Please do the following to run the project:

1. clone the repo
2. npm install
3. on postgres Create a database for this project.
4. run schema.sql and seeds.sql from the db folder on psql
5. create a .env file and fill in your database information:
   DB_HOST = localhost
   DB_USER = [your database username]
   DB_PASS= [your database password]
   DB_NAME = [your database name]
   DB_PORT = 5432

6. there is a helper.js within the src folder. Please change the contents of string to your local ip address.
   example: "http://10.10.10.215"
7. I think thats about it. Please let me know if you run into problems!

Contacts Summary:

This is the project for tilr. The following is made with React, with a backend of node.js, with design features of antd and some css.
