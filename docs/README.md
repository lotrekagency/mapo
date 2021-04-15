# Mapo

## Build Setup

### install dependencies
$ yarn install

### install dependencies of example project
$ cd example
$ yarn install

### serve with hot reload at localhost:3000
$ yarn dev

### to install this module in a nuxt project
$ yarn add git@github.com:lotrekagency/mapo.git

## Working on the project

### How to contribute
Feel free to contribute to the project by making a [Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
Here's an example for a branch naming:

`feature/<branch name>`

Once you're done with your work and are ready to make a Pull Request, set the reviewers to 
Gabriele Baldi (bnznamco) and Andrea Morosi (andreamorosi).


### Documenting components
Always write some documentation regarding the components you're developing.
We are working on a StorybookJS implementation, which is going to help in this regard.


### How to edit and add configurations and settings
Our library doesn't have a standard nuxt.config.js file, so in order to add the stuff 
which usually goes there you're going to either work on the defaults.js file, for configurations 
and such, or on the module.js file for modules and plugins. Both files are located in the root 
of the project.


### URLs and accessing resources
We are using an alias (mapo) to access resources and files.
Here's an example featuring a SCSS import in a component file:

`@import "~mapomodule/assets/custom-style.scss";`


### Styling
Import the variables, mixins and other scss files 
in your components and templates when needed.


## External resources

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request
