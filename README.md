# Test Assignment for Lionwood.software

## Description

Firstly we need an estimation from you, how many hours you think this assignment can take.
After your estimate, we will approve it with the client, and you will be able to start working on it.
This is a small task, but in this way, the client can evaluate estimation skills as long as coding at once

The task is:
Create a simple login application coded in Symfony (PHP) and a Javascript frontend could be Vue, React, Vanilla Js or others.

The applications requirements are as follows:

1. Needs a login to access the pages.

2. token or cookie needs to be saved so the user doesn’t have to log in at every reload.

3. token or cookie needs to be validated by the backend on every reload.

4. user should be redirected away from pages if the token or cookie has expired.

Make the application appearance as simple as possible design-wise (don’t waste time making it look nice),
and focus on the backend code and the interaction between the js and the PHP backend.

Please provide us with an estimation of the hours. And after approval with the client, we will notify you when you can start completing the assignment

## Solution
The authentication system has been built on JWT token with the help of php library [lexik/jwt-authentication-bundle](https://github.com/lexik/LexikJWTAuthenticationBundle). React is used for login and registration forms.
The project has only one private page accessible by authenticated users -- Dashboard. Also, the application is stateless so no session is created after login.

I used docker to comfortably deploy the project on local machine.

## Installation

1. Install php and js dependencies
```
composer install
npm install
```
3. Build front-end assets (the version of NodeJS >= 18)
```
npm run build
```
4. Run docker
```
docker-compose up --build
```
5. Run database migrations
```
docker-compose run --rm web php bin/console doctrine:migrations:migrate
```
6. Visit [http://localhost:8080/](http://localhost:8080/)
