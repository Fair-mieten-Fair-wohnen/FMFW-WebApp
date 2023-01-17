package stats

import com.fasterxml.jackson.core.JsonPointer
import com.fasterxml.jackson.databind.JsonNode
import com.google.inject.Inject
import com.typesafe.config.Config
import models.{Aggregation, AggregationParam, ArchiveComplexStat, ArchiveJob, Incident}
import play.libs.Json

import java.util.Calendar
import scala.collection.JavaConverters._

object ComplexStatsBuilder extends StatsBuilder {

  @Inject var config: Config = _

  def init: java.util.List[Aggregation] = {
    Aggregation.getComplexAggregations
  }

  def process(archiveJob: ArchiveJob, aggs: java.util.List[Aggregation]): java.util.List[ArchiveComplexStat] = {
    val jobId = archiveJob.id
    val untilYear = archiveJob.aggYear

    val r = aggs.asScala.toList.flatMap { agg =>

      // add year filter here
      Incident.find.all().asScala.toList
        .filter(_.getBestIncidentCal().get(Calendar.YEAR) <= untilYear).filterNot(_.incidentType.equals("ALLG_BERATUNG")).flatMap { incident =>

        val incidentJson = Json.parse(incident.incident)

        AggregationParam.getAggregationParams1ById(agg.getId) match {
          case aggp1 if aggp1.isPresent =>
            AggregationParam.getAggregationParams2ById(agg.getId) match {
              case aggp2 if aggp2.isPresent =>

                val jp1 = JsonPointer.compile(aggp1.get().getFullJsonPath)
                val val1Json = incidentJson.at(jp1)
                val jp2 = JsonPointer.compile(aggp2.get().getFullJsonPath)
                val val2Json = incidentJson.at(jp2)

                if (!val1Json.isMissingNode) {
                  if (val1Json.isArray) {
                    val1Json.elements().asScala.map { element =>
                      if (element.isObject) {
                        if (val2Json.isTextual)
                          processAggLevel2(jobId = jobId, aggrId = agg.getId, path1 = aggp1.get().getPath, key1 = aggp1.get().dataRef, val1 = element.get(aggp1.get().dataRef).asText(), aggp2 = aggp2.get(), val2Json = val2Json)
                        else if (val2Json.isArray) {
                          val2Json.asScala.flatMap { v =>
                            processAggLevel2(jobId = jobId, aggrId = agg.getId, path1 = aggp1.get().getPath, key1 = aggp1.get().dataRef, val1 = element.get(aggp1.get().dataRef).asText(), aggp2 = aggp2.get(), val2Json = v)
                          }
                        }
                        else
                          processAggLevel2(jobId = jobId, aggrId = agg.getId, path1 = aggp1.get().getPath, key1 = aggp1.get().dataRef, val1 = element.get(aggp1.get().dataRef).asText(), aggp2 = aggp2.get(), val2Json = val2Json.get(aggp2.get().dataRef))

                      }
                      else
                        processAggLevel2(jobId, agg.getId, aggp1.get().getPath, aggp1.get().dataRef, element.asText().trim, aggp2.get(), val2Json)
                    }
                  }
                  else
                    List(processAggLevel2(jobId, agg.getId, aggp1.get().getPath, aggp1.get().dataRef, val1Json.asText().trim, aggp2.get(), val2Json))
                }
                else
                  List.empty
              case _ =>
                List.empty
            }
          case _ =>
            List.empty
        }
      }
    }.flatten

    r.groupBy(e => e.statsValue1 + e.statsValue2).map { grouped =>
      val acs = grouped._2.head
      acs.statsCount = grouped._2.size
      acs.save()
      acs
    }.toList
  }.asJava

  private def processAggLevel2(jobId: Long, aggrId: String, path1: String, key1: String, val1: String, aggp2: AggregationParam, val2Json: JsonNode): List[ArchiveComplexStat] = {

    if (val2Json != null && !val2Json.isMissingNode) {
      if (val2Json.isArray) {
        val2Json.elements().asScala.map { element =>
          if (element.isObject) {
            val acj = ArchiveComplexStat.create(jobId, aggrId,
              path1, key1, val1,
              aggp2.getPath, aggp2.dataRef, element.get(aggp2.dataRef).asText(), 1)
            acj
          }
          else {
            val acj = ArchiveComplexStat.create(jobId, aggrId,
              path1, key1, val1,
              aggp2.getPath, aggp2.dataRef, element.asText(), 1)
            acj
          }
        }
      }.toList
      else if (val2Json.isObject) {
        val2Json.fieldNames().asScala.flatMap { fieldname =>
          if (val2Json.get(fieldname).isBoolean) {
            if (val2Json.get(fieldname).asBoolean()) {
              val acj = ArchiveComplexStat.create(jobId, aggrId,
                path1, key1, val1,
                aggp2.getPath, aggp2.dataRef, fieldname, 1)
              List(acj)
            }
            else
              List.empty
          }
          else {
            val acj = ArchiveComplexStat.create(jobId, aggrId,
              path1, key1, val1,
              aggp2.getPath, aggp2.dataRef, fieldname, 1)
            List(acj)
          }
        }
      }.toList
      else
        List(ArchiveComplexStat.create(jobId, aggrId,
          path1, key1, val1,
          aggp2.getPath, aggp2.dataRef, val2Json.asText, 1))
    }
    else
      List.empty
  }
}
