package stats

import com.fasterxml.jackson.databind.JsonNode
import com.google.inject.Inject
import com.typesafe.config.Config
import models.{Incident, StatsKey}
import org.joda.time.DateTime
import play.libs.Json

import java.util.Calendar
import scala.collection.JavaConverters._
import scala.math.Ordering

object SimpleStatsBuilder extends StatsBuilder {

  @Inject var config: Config = _

  private case class SimpleStats(valuePath: String, valueKey: String) {

    def toCsvString: String = List(fullPath, valuePath, valueKey).mkString(";")

    def fullPath: String = s"${cleanStringKey(valuePath)}:${cleanStringKey(valueKey)}"

    override def toString: String = s"$valuePath: $valueKey"

    override def hashCode(): Int = valuePath.hashCode + valueKey.hashCode
  }

  case class StatsValue(statsPath: String, statsKey: String, statsValue: Integer) {
    override def toString: String = s"$statsPath.$statsKey : $statsValue"

    override def hashCode(): Int = statsPath.hashCode + statsKey.hashCode
  }

  def simpleStatsJava(aggScope: String): java.util.List[StatsValue] = {
    simpleStats(aggScope).asJava
  }

  def simpleStats(aggScope: String): Seq[StatsValue] = {
    val keys1: List[String] = StatsKey.getKeysByType("simple").asScala.toList
    val keys2: List[String] = StatsKey.getKeysByType("string").asScala.toList

    val keys = keys1 ++ keys2

    simpleStatsAggregator(simpleStats(aggScope, keys))
  }

  def simpleStatsAsCsv(aggScope: String): String = {
    val keys: List[String] = StatsKey.getKeysByType("simple").asScala.toList

    //    implicit val ord: Ordering[String] = Ordering.String
    //    simpleStatsAggregator(simpleStats(keys)).sorted.mkString("\n")
    simpleStatsAggregatorCsv(simpleStats(aggScope, keys)).mkString("\n")
  }

  def simpleOtherStatsAsCsv(aggScope: String): String = {
    val keysOther: List[String] = StatsKey.getKeysByType("other").asScala.toList

    //    implicit val ord: Ordering[String] = Ordering.String
    //    simpleStatsAggregator(simpleStats(keysOther)).sorted.mkString("\n")
    simpleStatsAggregatorCsv(simpleStats(aggScope, keysOther)).mkString("\n")
  }

  def yearStats(untilYear: Int): java.util.List[StatsValue] = {
    Incident.find.all().asScala.toList
      .filter(_.getBestIncidentCal().get(Calendar.YEAR) <= untilYear).filterNot(_.incidentType.equals("ALLG_BERATUNG")).map { i =>

      val incidentJson = Json.parse(i.incident)

      incidentJson.findValue("incident_date") match {
        case null =>
          StatsValue("short_description.incident_date", "ohne", 1)
        case d =>
          try {
            val dt = DateTime.parse(d.asText())
            val yearString = dt.year().getAsString
            StatsValue("short_description.incident_date", yearString, 1)
          }
          catch {
            case e: Exception =>
              StatsValue("short_description.incident_date", "ohne", 1)
          }
      }
    }.groupBy(_.statsKey).map { mg =>
      val valSum = mg._2.map(_.statsValue).foldLeft(0)(_ + _)
      StatsValue(mg._2.head.statsPath, mg._2.head.statsKey, valSum)
    }.toList
  }.asJava

  private def simpleStats(aggScope: String, k: List[String]): Seq[SimpleStats] = {
    simpleStatsExtractor(k, Incident.findByScope(aggScope).asScala.toList)
  }

  private def simpleStatsExtractor(k: List[String], incidents: List[Incident]): Seq[SimpleStats] = {
    incidents.flatMap { i =>
      val incidentStr = i.incident
      val incidentJson = Json.parse(incidentStr)
      k.flatMap { k =>
        findWithPath(k, incidentJson).flatMap { jvalue =>
          if (!jvalue.isMissingNode) {

            if (jvalue.isArray) {
              jvalue.iterator().asScala.toList.map {
                case v if v.isObject =>
                  Json.toJson("incidents")
                case v => v
              }
            }
            else if (jvalue.isObject)
              List.empty
            else
              List(jvalue)

          }
          else
            List.empty
        }.map { v =>
          SimpleStats(k, fixValue(v.asText()))
        }
      }
    }.filter(_.valueKey.nonEmpty)
  }

  private def simpleStatsAggregator(stats: Seq[SimpleStats]): Seq[StatsValue] = {
    implicit val ord: Ordering[String] = Ordering.String

    stats.groupBy(_.fullPath).filterNot(_._2.head.valueKey.equals("false")).toSeq.map { m =>
      val stats = m._2.head
      //      s"${stats.key};${stats.id};${stats.value};${m._2.size}"

      if (stats.valueKey.equals("true")) {
        val splitted = stats.valuePath.split("\\.")
        val key = splitted.last
        val path = splitted.toSeq.reverse.tail.reverse.mkString(".")
        StatsValue(
          statsPath = path,
          statsKey = key.trim,
          statsValue = m._2.size
        )
      } else
        StatsValue(
          statsPath = stats.valuePath,
          statsKey = stats.valueKey.trim,
          statsValue = m._2.size
        )
    }
  }

  private def simpleStatsAggregatorCsv(stats: Seq[SimpleStats]): List[String]

  = {
    implicit val ord: Ordering[String] = Ordering.String

    stats.groupBy(_.fullPath).map { m =>
      val stats = m._2.head
      //      s"${stats.key};${stats.id};${stats.value};${m._2.size}"
      s"${stats.toCsvString};${m._2.size}"
    }.toList.sorted
  }

  private def findWithPath(path: String, json: JsonNode): List[JsonNode] = {
    findWithPaths(path.split('.'), json)
  }

  private def findWithPaths(pathElemtens: Array[String], json: JsonNode): List[JsonNode] = {
    if (pathElemtens.length == 1) {
      List(json.findPath(pathElemtens.head))
    }
    else {
      val curNode = json.findPath(pathElemtens.head)
      if (curNode.isArray)
        curNode.iterator().asScala.toList.flatMap { jv =>
          findWithPaths(pathElemtens.tail, jv)
        }
      else
        findWithPaths(pathElemtens.tail, json.findPath(pathElemtens.head))
    }
  }
}
