# Imagify - A simple image storage repository

This project was a part of Shopify's Summer 2021 Backend Developer Intern technical challenge.

## Usage

1. Go to https://imagify2021.vercel.app
2. Sign up if you don't already have an account, then log in once redirected
3. Check out all the photos.
4. Upload your photos!
5. Check them out, and click on the photo to view a larger size
6. Logout once done!

## Tech stack

**Frontend**

- React, using reactstrap components to save time on CSS

**Backend**

- The API is served by an Express server. The following routes are supported:
  - Authentication
    - POST /api/login
    - POST /api/signup
    - DELETE /api/logout
  - Images
    - GET /api/images
    - GET /api/image/:id
    - POST /api/uploadImage
    - DELETE /api/image/:id
- Node.js
  - The workhorse for connecting to AWS S3
- AWS S3 for image storage, just because I wanted to try it out

**Security**

- API is secured with JWT stored in cookies.
- User credentials stored in MongoDB, with encrypted passwords

**Deployment**

- Frontend is currently deployed to Vercel for easy, automatic re-deployment on commits to the master branch
- Backend is currently deployed to Heroku

## Future upgrades/fixes

> Currently, the app doesn't work properly if the user has blocked third-party cookies, as the domains of the client and server are different. This is priority to fix. Turns out I need to put my API and my client on the same domain to avoid being blocked by browers that block third party APIs

> Fix the hamburger menu response when the page's width is adjusted
>
> Further protect the API to prevent CSRF attacks

## Credits

Thank you to @vchiuu for providing the app's favicon and the social preview image. You can find her coding away here: https://github.com/vchiuu
