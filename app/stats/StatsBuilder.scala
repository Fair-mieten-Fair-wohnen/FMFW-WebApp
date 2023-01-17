package stats

import scala.io.{Codec, Source}

trait StatsBuilder {

  private val mappingFile = "./conf/FMFW-Mapping.csv"

  private val mappings: Map[String, String] = initMappings

  private[stats] def fixValue(value: String): String

  = {
    val fixedValue = cleanValue(value)
    val fixedKey = cleanStringKey(value)

    mappings.getOrElse(fixedKey, fixedValue)
  }

  private[stats] def cleanStringKey(key: String): String

  = key
    .trim
    .toLowerCase
    .replace(" ", "")
    .replace(",", "")
    .replace(";", "")
    .replace("/", "")
    .replace("-", "")

  private[stats] def cleanValue(key: String): String

  = key
    .trim
    .replaceAll("  +", " ")
    .replaceAll(" ,", ",")
    .replaceAll(" ;", ";")
    .replaceAll(" \\.", ".")


  private[stats] def initMappings: Map[String, String]

  = {
    val source = Source.fromFile(mappingFile, Codec.UTF8.name)
    source.getLines.toList.map { line =>
      val splitted = line.split(';')
      splitted.head -> splitted.last
    }.toMap.map { m =>
      cleanStringKey(m._1) -> cleanValue(m._2)
    }
  }
}
