# NearMe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
# NearMe




# START

before you start, after clone the project do 
- npm i
# Common comands for angular
 - create a new components without test file
   ng g c components/name of components --skip-tests
 - create a new service  
   ng g s services/name of service 


# Work with Git

We push everything to the develop branch /git push/
- check is your current branch now (it should be your branch)
- run the following commands:
 - - git add .
 - - git commit -m "text comment"
 - - git push 
When you done your task - go to git hub and create a pull-request to main branch use UI make a pull request to develop and merge it.

Pull changes from develop branch
- check is your current branch now (it should develop branch)
- run the following commands:
 - - git pull origin develop
Then we switch to our development branch. Now to sync with the develop branch
 - - git merge develop



# deploy
Our project now is deploying on firebase hosting.
The working link of our project - https://nearme-b6f9d.web.app/
The new deploying version you can do from main 
(but you should be sure that all last changes on the main branch and you chek that "ng serve"  working in correct way),
than following next commands:
- ng build
- firebase deploy
 
if you want to chek how project is working before deployng new version do also you can do it on "develop" bracn:
  -firebase emulators:start
 
# firebase

# tests
