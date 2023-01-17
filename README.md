# Dokumentationssystem der berliner Fachstelle Fair mieten - Fair wohnen  

Die Berliner Fachstelle gegen Diskriminierung auf dem Wohnungsmarkt, Fair mieten – Fair wohnen, wird getragen von der UP19 Stadtforschung + Beratung GmbH und dem Türkischen Bund in Berlin-Brandenburg. Die beiden Träger arbeiten eigenverantwortlich und ohne gemeinsame Rechtsform. Die Koordination der Zusammenarbeit leistet UP19.

![](resources/fmfw-app_screenshot01.png)

## Used Versions

* [Play Framework: 2.6.20](https://www.playframework.com/documentation/2.6.x/Home)
* [Angular: 6.0.0](https://angular.io/)
* [Angular CLI: 1.6.6](https://cli.angular.io/)

## How to use it?

### Prerequisites

* [Node.js](https://nodejs.org/)
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

### Let's get started,

* Fork or clone this repository.

* Used any of the following [SBT](http://www.scala-sbt.org/) commands which will intern trigger frontend associated npm scripts.

```
    sbt clean           # Clean existing build artifacts

    sbt stage           # Build your application from your project’s source directory

    sbt run             # Run both backend and frontend builds in watch mode

    sbt dist            # Build both backend and frontend sources into a single distribution artifact

    sbt test            # Run both backend and frontend unit tests
```

## DB setup

```
    CREATE USER 'adwdoc'@'localhost' IDENTIFIED BY 'adwdoc';
    CREATE DATABASE adwdoc CHARACTER SET utf8 COLLATE utf8_unicode_ci;
    GRANT ALL PRIVILEGES ON adwdoc.* TO 'adwdoc'@'localhost';

    CREATE USER 'keycloak'@'%' IDENTIFIED BY 'keycloak';
    CREATE DATABASE keycloak CHARACTER SET utf8 COLLATE utf8_unicode_ci;
    GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak'@'%';
    
     flush privileges;
```

## Keycloak DB Setup

[Keycloak MySQL Setup](https://github.com/Codingpedia/codingmarks-api/wiki/Keycloak-MySQL-Setup)