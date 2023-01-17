# ADW Documentation System

This project builds web tool to collect incidents of discrimination from allover several institutions
 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

(Run `ng serve --configuration=de --aot=false` for translation to german strings)

## Generate Language Strings

For adding using german translation strings call:

* Call `ng xi18n --output-path locale --i18n-locale de`

* Call `ng build --prod --i18n-file src/locale/messages.de.xlf --i18n-format xlf --i18n-locale de`

* Copy every string, that has to be translated, from


    src/locale/messages.xlf 

to

    src/locale/messages.de.xlf
    
copy the line with source, rename "source" to "target" and define the translated string:

    
            <source>Dashboard</source>
            <target>Startseite</target>

To define word breaks add "&shy;" at every part of the translation, where the word is allowed to be broken:

    <target>Kon&shy;takt&shy;auf&shy;nah&shy;me durch:</target>

## Definition of tab labels for sidebar navigation (when single item is loaded)

Which items are visible and which labels are used is defined in the config file:

`src/assets/config.json`

For every incident type the tabs are defined here. To change the label, edit the string behind the key `LABEL_DEFAULT`

## Build

Run `ng build` from the ui folder to build the angular ui project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

OR run `sbt dist` from the root folder to build front end (and back end)

*Hint:* If the `node_modules` folder doesn't `npm installed` is called by `spt dist` to install missing node packages

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. 

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Database

## DB Setup

```
    mysqladmin -u root create adwdoc
```

## DB Access

```
    CREATE USER 'adwdoc'@'localhost' IDENTIFIED BY 'adwdoc';
    GRANT ALL PRIVILEGES ON adwdoc.* TO 'adwdoc'@'localhost';
```

## DB table creation

Will be done automatically by playframework evolutions ().
