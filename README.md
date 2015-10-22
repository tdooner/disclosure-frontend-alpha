[![Build Status](https://travis-ci.org/opencalifornia/disclosure-frontend-alpha.svg)](https://travis-ci.org/opencalifornia/disclosure-frontend-alpha)

# Open Disclosure California

Don't forget to run the tests.

    $ npm test


--

##Unofficial Fork of the [AngularJS-Gulp-Browserify Starter App](https://github.com/goodbomb/angular-gulp-browserify-starter) written by [@goodbomb](https://github.com/goodbomb)

This Angular starter app is built with best practices in mind. The folder structure is intended to be different than the standard official AngularJS application. The application architecture follows modern design conventions from the proposal outlined here:

https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub

Files are grouped structurally (each section of the app being self contained with its own styles, views, controllers, and directives) instead of functionally (all views in one folder, all styles in one folder, etc). In practice, the basic file structure should look something like this:

```
/app
--- app.js
--- app.less
--- appConfig.js (main config file - no routes are defined here)
--- appRoutes.js
--- index.html
--- /components
------ components.js (require component modules)
------ MainController.js
------ MainController.spec.js (controller unit tests)
------ /common (common components repeated throughout the application)
--------- /styles
--------- /appHeader
--------- common.less
------ /module1 (ex: home)
--------- homePage.js (module definition)
--------- homePage.html (view)
--------- homePage.less (styles)
--------- HomePageController.js (Controller inherits from MainController)
--------- HomePageController.spec.js
--------- homePageDirective.js (Directive definition)
------ /module2
--------- /sub-module1
--------- /sub-module2
--------- module2.js (module definition - sub-modules are required in here)
--------- module2.html
--------- module2.less
--------- Module2Controller.js
--------- Module2Controller.spec.js
--------- module2Directive.js
--- /assets
------ /images
------ /icons
/dist (this is the gulp pipeline file output destination)
/node_modules (npm installations go here)
```

Each Module is self-contained and the js files are exported, combined, and minified through Browserify. Every LESS file from each module should be imported into the master ```app.less``` file in the root app directory. The main app.less file is then processed by Gulp and a css file with a source map is pushed to the ```dist``` folder.

### Setup Instructions

_*NOTE:* This starter kit assumes that you already have gulp (http://gulpjs.com/)
installed locally. If you don't, then run the following command first: ```npm
install -g gulp```_

1) Node Modules and Bower Components are not included in this repository to keep it light weight. After cloning or pulling changes from this repository, make sure to run the following command in terminal: ```npm install```

2) Once everything is installed all you have to do is run ```gulp build``` and your new server will be running at ```http://localhost:5000``` (you can edit the port in the gulpFile). To speed up gulp times, the standard ```gulp``` task does not include copying over static files. Using the standard ```gulp``` task will be useful for most cases, but if you need to rebuild the whole ```dist``` folder, use ```gulp build```.


### Working with this application structure
1. All pipeline, automation, and testing dependencies are in the
   ```node_modules``` folder (installed using npm), while all third party
   application libraries are located in the ```thirdparty``` folder.

2. Any additional third party modules and plugins should always be installed
   automatically whenever possible using ```npm install module_name``` with the
   ```--save``` or ```--save-dev``` suffixes to save the dependencies in the
   ```package.json``` file.

3. All development takes place in the ```app``` folder. Production files are
   generated with gulp automatically and pushed to the ```dist``` folder (it
   will automatically be created the first time the ```gulp``` task is run in
   terminal post-installation).

4. The ```gulpfile.js``` is clearly commented, defining each task that takes
   place during pipeline automation. Every file change is watched and new files
   are automatically pushed to the ```dist``` folder. All files are concatenated
   into individual files for use on production servers.

Install the project dependencies, including gulp.

    $ npm install


### Routes, Controllers and TemplateURLs
NOTE: When creating controllers and services/factories, always follow the proper naming convention of starting with an uppercase letter. Everything else can use camelCase.

1) Default AngularJS applications tend to use the ```angular-route``` plugin that makes use of a main ```ng-view``` directive in the index.html file and standard ```href``` tags for links. This application is using the ```angular-ui-router``` plugin for better route nesting and greater customizability. It makes use of a main ```ui-view``` directive instead of ```ng-view``` and uses an ```sref``` tag for links instead of the normal ```href``` tag. Check out the official documentation for more details: https://github.com/angular-ui/ui-router

2) Due to the modularity of this application structure, standard routing parameters aren't being used. In most examples, routes make use of ```TemplateURL``` and ```controller``` like so:

```
$stateProvider
    .state('home', {
      url: '/',
      templateUrl: './modules/home/home.html',
      controller: './modules/home/HomeController.js'
    })
...
```
In this application, each module is set up as an injectible directive with its own controller. So instead of the above example, the home module has a directive called ```homeView``` that can be injected into the HTML like this:  
```<div home-view></div>``` (camelcased directives always have to be changed to dashed names when in the HTML). As such, our route config makes use of the ```template``` parameter instead of ```templateURL```. So the routes look like this instead:

```
$stateProvider
    .state('home', {
      url: '/',
      template: '<div home-view></div>'
    });
```
As you can see, it's simpler and cleaner, calling only an HTML ```<div></div>``` tag as a template and leaving everything else contained within the module. This way, if anything changes in the file structure, the routes won't need to be updated.

As we add more options and configuration to each state, further changes to the $stateProvider function becomes necessary, so the current configuration looks like this:

```
var home = {
    name: 'home',
    url: '/',
    template: '<div home-view></div>'
};
var module2 = {
    name: 'module2',
    url: '/module2',
    template: '<div module2-view></div>'
};

$stateProvider.state(home);
$stateProvider.state(module2);
```

With this approach, it's very easy to keep every state object clean and easy to understand.

You can see an example of nested views and sub-modules in this application's file architecture:
https://github.com/goodbomb/angular-gulp-browserify-starter/blob/master/app/modules/pages/pagesRoutes.js


### Adding Sub-Modules
1) Create a new folder in the ```app/modules/``` directory with the following files:

```
index.js
moduleName.html
moduleName.less
moduleNameController.js
moduleNameController.spec.js
moduleNameDirective.js
moduleNameRoutes.js (you can also include a separate config file if you need more configuration options)
```

2) Change the file contents accordingly. Follow the ```app/modules/home``` files as reference. Make sure to change the naming convention in each file.

3) Add a new state to the ```moduleNameRoutes``` file. For example:

```
var home = {
    name: 'home',
    url: '/',
    template: '<div home-view></div>'
};
var moduleName = {
    name: 'moduleName',
    url: '/moduleName',
    template: '<div moduleName-view></div>'
};

$stateProvider.state(home);
$stateProvider.state(moduleName);
```

4) Open the parent ```index.js``` file (such as the ```modules/index.js``` file) and add a requirement for the new module. Make sure to require the entire module folder (browserify will look for the index.js file and use that file as the entry point for all other module dependencies). 

```
require('./modules/moduleName').name
```

Your end result should look something like this:
```
'use strict';

require('angular');

module.exports = angular.module('modules',
	[
		require('./home').name,
		require('./moduleName').name
	])
	.controller(require('./MainController'));
```

After those steps are complete, you should be able to see the contents of your new module at the URL you specified in step 3.

NOTE: This same process applies to sub-modules, except you will treat the module directory as the root path, create a ```moduleRoutes.js``` file where you will define module-specific states and options, and then require the sub-module in the module's ```index.js``` file. You could actually do this with the main ```modules``` directory, and use it to "require" all of your modules instead of app.js and simply call ```require('./modules').name``` instead of ```require('./modules/moduleName').name```. It's all up to you and how deep you want to go with the modularity.

### Adding Third Party Vendor JS and CSS files to your app

Instead of bloating the index.html file with a list of scripts and link tags,
all CSS and Javascript files from Vendors are bundled and concatenated into
single `vendor.css` and `vendor.js` files using the Gulp pipeline. To
add vendor files to your workflow, all you have to do is access the
`gulpfile.js` file and add the relative path to the vendor file (found in
the `thirdparty` or `node_modules` directories) to the appropriate
location in the *"File Paths"* section.

#### Third-party CSS

Add the path to the *VendorCSS* workflow in the `gulpfile.js`


#### Third-party Javascript

Require the file from `thirdparty/index.js`.

The `vendor.js` contains uses browserify to bundle all of the third party
libraries installed via `npm install` into a single javascript file that is
separate from the main `bundle.js` file. The `bundle.js` file is only for your
application code. You aren't necessarily required to use the `vendor.js` file
and you can bundle everything into a single `bundle.js` file, but by doing so
you will miss out on the significant speed improvements that a separated
`vendor.js` file provides.

While the `bundle.js` file is your continuously evolving application, the
`vendor.js` file is largely static and unchanging (except when you update
third party modules or add new ones). As such, your bundle.js file can remain
signficiantly smaller in file size, and thus improves the speed of your
browserify bundling.


### Contributing
This project is open source so collaboration is welcome. If you see a way to improve something in this project, please feel free to open a Pull Request to the *develop* branch so we can discuss your code.

### Learning Resouces
- https://github.com/curran/screencasts/tree/gh-pages/introToAngular
- https://www.codeschool.com/courses/shaping-up-with-angular-js
- http://egghead.io
- http://thinkster.io
