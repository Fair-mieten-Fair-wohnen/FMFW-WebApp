package utils

import models.ArchiveStat

import scala.collection.JavaConverters._

object PopulationUtil {

  val A_KEY = "ALLG_BERATUNG"
  val M_KEY = "MELDUNG"
  val F_KEY = "FALLBETREUUNG"
  val STAT_TYPE = "type"
  val STAT_AGTYPE = "agg_type"

  def getPopForType(stats: java.util.List[ArchiveStat], populationType: String): Integer = {

    populationType match {
      case "AMF" =>
        getFPop(stats, A_KEY) +
          getFPop(stats, M_KEY) +
          getFPop(stats, F_KEY)
      case "MF" =>
        getFPop(stats, M_KEY) +
          getFPop(stats, F_KEY)
      case "F" =>
        getFPop(stats, F_KEY)
      case _ =>
        0
    }
  }

  private def getFPop(stats: java.util.List[ArchiveStat], currentKey: String): Integer = {
    stats.asScala.filter(_.statPath.equals(STAT_TYPE)).filter(_.statKey.equals(currentKey)).map(_.statValue).headOption.getOrElse[Integer](0)
  }
}
