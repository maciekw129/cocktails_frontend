# Cocktails
## Table of contents
* [General informations](#1-general-informations)
* [Launch](#2-launch)
* [Technologies](#3-technologies)
* [Features](#4-features)

## 1. General informations
  Cocktails is a fullstack application (backend: [repository](https://github.com/maciekw129/cocktails_rest)) where you can find cocktail recipies or create your own.

## 2. Launch
### Starting the project
  App is depolyed here: [live app](https://cocktails-front.vercel.app)
### Guest and authorized user
  The application allows you to create an account thanks to which you can create a recipe for a cocktail. As a guest user you can only browse through already created recipies.

## 3. Technologies:
- **Angular** 15.1.0,
- **RxJS** 7.8.0,
- **Angular Material**,
- **TypeScript** 4.9.4,
- **HTML**, **CSS**,

I also used ***jwt-decode***, and ***ngx-translate***.
## 4. Features
**For all users, both logged and not logged**:
- Authentication, with saving token in localstorage and checking for its expiration date on each refresh,
- Registration,
- Browsing cocktails recipies

**For logged users**:
- Creating cocktail
- My profile page, where you can change account details
