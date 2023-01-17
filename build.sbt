name := """ADW Documentation System"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, PlayEbean).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

maintainer := "kontakt@indarium.de"

scalaVersion := "2.12.17"

scalacOptions += "-target:jvm-1.8"

javacOptions ++= Seq("-source", "1.8", "-target", "1.8")

libraryDependencies += guice
libraryDependencies += javaJdbc
libraryDependencies += filters
libraryDependencies += evolutions
libraryDependencies += ws
libraryDependencies += ehcache

// https://mvnrepository.com/artifact/com.typesafe.play/play-json-joda
//libraryDependencies += "com.typesafe.play" %% "play-json-joda" % "2.8.1"

// https://mvnrepository.com/artifact/org.joda/joda-convert
//libraryDependencies += "org.joda" % "joda-convert" % "2.2.1"

// https://mvnrepository.com/artifact/com.fasterxml.jackson.datatype/jackson-datatype-joda
libraryDependencies += "com.fasterxml.jackson.datatype" % "jackson-datatype-joda" % "2.10.2"

// https://mvnrepository.com/artifact/com.fasterxml.jackson.datatype/jackson-datatype-jsr310
libraryDependencies += "com.fasterxml.jackson.datatype" % "jackson-datatype-jsr310" % "2.10.2"


// Test Database
libraryDependencies += "com.h2database" % "h2" % "1.4.194"

// Prod Database
libraryDependencies += "mysql" % "mysql-connector-java" % "8.0.12"
libraryDependencies += "org.mariadb.jdbc" % "mariadb-java-client" % "2.3.0"

// XML Binding
// https://mvnrepository.com/artifact/javax.xml.bind/jaxb-api
libraryDependencies += "javax.xml.bind" % "jaxb-api" % "2.3.1"
// https://mvnrepository.com/artifact/com.sun.xml.bind/jaxb-impl
libraryDependencies += "com.sun.xml.bind" % "jaxb-core" % "2.3.0.1"
// https://mvnrepository.com/artifact/com.sun.xml.bind/jaxb-impl
libraryDependencies += "com.sun.xml.bind" % "jaxb-impl" % "2.3.2"

// https://mvnrepository.com/artifact/jakarta.xml.bind/jakarta.xml.bind-api
//libraryDependencies += "jakarta.xml.bind" % "jakarta.xml.bind-api" % "4.0.0"


// Testing libraries for dealing with CompletionStage...
libraryDependencies += "org.assertj" % "assertj-core" % "3.11.1" % Test
libraryDependencies += "org.awaitility" % "awaitility" % "3.1.2" % Test
libraryDependencies += "org.mockito" % "mockito-core" % "2.1.0" % Test

// Make verbose tests
testOptions in Test := Seq(Tests.Argument(TestFrameworks.JUnit, "-a", "-v"))
