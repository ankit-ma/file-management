# file management app

DG : mongoDB
dependencies :
"bcryptjs": For password encryption and decryption
"body-parser": For parsing body from req,
"dotenv": To use env variables,
"express": express js dependecy for fast development in node js,
"express-session": Used for session maintainace,
"jsonwebtoken": JWT for authorization,
"mongoose": For Mongo DB operations,
"multer": For file upload,
"nodemailer": To mail otp and all.

Please find postman collection in directory for api testing.

This backend have following functionality: 1. User authentcation and authorization using JWT token and passowrd encrypt/ decrypt. 2. Basically it store user files and folder metadata into mongoDB and uploaded files in local storage. 3. I am planning to upload the files in GCP bucket but there is some issue in gcp for billing. They are not giving access to bucket. So right now using local storage only. 4. User have following controlls on files and folder:
a. create, delete folder
Note: In one folder 2 folder of files with same name can't be created or uploaded

        b. upload, delete, download files
            Note: In one folder 2 files will not be of same name.
    5. When user login to their account they can vew the filescount, folder count and total filesize utilitised yet as meta info in right section.

Future scope:
Restrict file upload after certian size ask for buying premium service.
Account delete feature
Open files in web app like png, jpeg, pdf.
Make responsive UI
