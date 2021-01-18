# Imagify - A simple image storage repository

This project was a part of Shopify's Summer 2021 Backend Developer Intern technical challenge.

## Tech stack

**Frontend**
React, using reactstrap components to save time on CSS

**Backend**
Express
Node.js
AWS S3 for image storage

**Security**
API is secured with JWT stored in cookies
User credentials stored in MongoDB, with encrypted passwords

**Deployment**
Frontend is currently deployed to Vercel for easy, automatic redeployment on commits to the master branch
Backend is currently deployed to Heroku

## Future upgrades/fixes

> Currently, the app doesn't work properly if the user has blocked third-party cookies, as the domains of the client and server are different. This is priority to fix

> Fix the hamburger menu response when the page's width is adjusted
>
> Further protect the API to prevent CSRF attacks

## Credits

Thank you to @vchiuu for providing the app's favicon and the social preview image. You can find her coding away here: https://github.com/vchiuu
