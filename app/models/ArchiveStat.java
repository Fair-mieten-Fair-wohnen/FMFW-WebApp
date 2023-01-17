package models;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import finder.ArchiveStatFinder;
import io.ebean.Finder;
import io.ebean.annotation.JsonIgnore;
import play.data.validation.Constraints;
import utils.PopulationUtil;

import javax.inject.Inject;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.*;

@Entity
@Table(name = "archive_stat")
public class ArchiveStat extends BaseModel {

    @Constraints.Required
    @Column(name = "job_id")
    @JsonIgnore
    public Long jobId;

    @Constraints.Required
    @Column(name = "stat_path")
    public String statPath;

    @Constraints.Required
    @Column(name = "stat_key")
    public String statKey;

    @Constraints.Required
    @Column(name = "stat_value")
    public Integer statValue;

    public String fullPath() {
        return statPath + "." + statKey;
    }

    public static final Finder<Long, ArchiveStat> find = new ArchiveStatFinder();

    public static List<ArchiveStat> statsForJob(String aggregationTypeID, long jobId) {
        Optional<AggregationParam> ap = AggregationParam.getAggregationParams1ById(aggregationTypeID);
        Optional<Aggregation> ag = Aggregation.getAggregationById(aggregationTypeID);

        ArchiveJob aj = ArchiveJob.find.byId(jobId);
        if (aj != null && ap.isPresent() && ag.isPresent()) {
            String aggrType = ap.get().aggrType;
            String key = ap.get().getFullPath();

            return find.query().where().and()
                    .eq("job_id", jobId)
                    .eq("stat_path", key)
                    .findList();
        } else
            return new Vector<>();
    }

    public static Optional<AggregationCharts> statsForJobAggr(String aggregationTypeID, long jobId) {

        Optional<Aggregation> ag = Aggregation.getAggregationById(aggregationTypeID);

        if (ag.isPresent()) {
            if (ag.get().aggregated)
                return getAggregationComplex(aggregationTypeID, jobId, ag.get());
            else {
                Optional<AggregationParam> ap = AggregationParam.getAggregationParams1ById(aggregationTypeID);
                if (ap.isPresent())
                    return getAggregationSimple(aggregationTypeID, jobId, ag.get(), ap.get());
                else
                    return Optional.empty();
            }
        } else
            return Optional.empty();
    }

    private static Optional<AggregationCharts> getAggregationSimple(String aggregationTypeID, long jobId, Aggregation ag, AggregationParam ap) {
        ArchiveJob aj = ArchiveJob.find.byId(jobId);

        List<ArchiveStat> astats = statsForJob(aggregationTypeID, jobId);
        List<ArchiveStat> pstats = statsForJob(PopulationUtil.STAT_AGTYPE(), jobId);

        if (!astats.isEmpty() && aj != null) {


            AggregationCharts aggs = new AggregationCharts();
            aggs.aggregationTypeId = aggregationTypeID;

            aggs.timeOfDataDumpId = aj.jobTimestamp.toDateTimeISO().toString();

            Map<String, Integer> astatsMap = new HashMap<>();
            for (ArchiveStat astat : astats)
                astatsMap.put(astat.fullPath(), astat.statValue);

            Vector<Integer> data = new Vector<>();
            if (ap.aggrType.equals(AggregationParam.HIERARCHICAL)) {

                List<ValuelistExt> vlxs = ValuelistExt.findByType(ap.valueList);

                for (ValuelistExt vlx : vlxs) {

                    Optional<AggregationParam> curAgp = AggregationParam.getAggregationParams1ById(aggregationTypeID);
                    String curKey;
                    if (curAgp.isPresent()) {
                        curKey = curAgp.get().getFullPath() + "." + vlx.subKey.trim();
                        if (vlx.subKey.equals("other"))
                            curKey = curAgp.get().getFullPath() + "." + vlx.key + "_" + vlx.subKey;
                        else if (vlx.key.equals("other"))
                            curKey = curAgp.get().getFullPath() + "." + vlx.key.trim();

                        if (astatsMap.containsKey(curKey)) {
                            if (vlx.fixedSubLabel().equals("anderes"))
                                aggs.columnLabels.add(vlx.label + "/" + vlx.fixedSubLabel());
                            else if (vlx.label.equals("anderes / Kommentar"))
                                aggs.columnLabels.add(vlx.label);
                            else
                                aggs.columnLabels.add(vlx.fixedSubLabel());
                            Integer curVal = astatsMap.get(curKey);
                            data.add(curVal);
                            aggs.casesCur += curVal;
                        }
//                        else {
//                            aggs.columnLabels.add(vlx.fixedSubLabel());
//                            data.add(0);
//                        }
                    }
                }
            } else {

                List<Valuelist> vls;
                if (!ap.valueList.isEmpty())
                    vls = Valuelist.findByType(ap.valueList);
                else {
                    vls = Valuelist.extractFromList(astats);
                }

                Config config = ConfigFactory.load();
                int limit = config.getInt("adw.valuelistlimit");
                String limitAccumutatedLabel = config.getString("adw.limitAccumutatedLabel");
                Integer limitCummVal = 0;

                for (Valuelist vl : vls) {

                    Optional<AggregationParam> curAgp = AggregationParam.getAggregationParams1ById(aggregationTypeID);
                    String curKey = "";

                    if (curAgp.isPresent())
                        curKey = curAgp.get().getFullPath() + "." + vl.key;

                    if (astatsMap.containsKey(curKey)) {
                        Integer curVal = astatsMap.get(curKey);
                        if (curVal <= limit)
                          limitCummVal += curVal;
                        else {
                          aggs.columnLabels.add(vl.label.trim());
                          data.add(curVal);
                          aggs.casesCur += curVal;
                        }
                    }
//                    else {
//                        aggs.columnLabels.add(vl.label.trim());
//                        data.add(0);
//                    }
                }

                if (limitCummVal > 0) {
                  data.add(limitCummVal);
                  aggs.columnLabels.add(limitAccumutatedLabel);
                }
            }

            aggs.data.add(data);

//            Map<String, Integer> popuMap = Population.getPopulations(jobId);

            aggs.casesAll = PopulationUtil.getPopForType(pstats, ag.populationType);

            aggs.ggstype = ag.populationType;

            return Optional.of(aggs);
        } else
            return Optional.empty();
    }

    public static void cleanJobStatsForJob(long jobId) {
        List<ArchiveStat> archiveStats = find.query()
                .where().eq("job_id", jobId).findList();
        if (!archiveStats.isEmpty()) {
            for (ArchiveStat astat : archiveStats) {
                astat.deletePermanent();
                astat.save();
            }
        }
    }

    private static Optional<AggregationCharts> getAggregationComplex(String aggregationTypeID, long jobId, Aggregation ag) {
        List<ArchiveComplexStat> acs = ArchiveComplexStat.statsForJob(aggregationTypeID, jobId);
        ArchiveJob aj = ArchiveJob.find.byId(jobId);


        if (!acs.isEmpty() && aj != null) {
            Vector<String> cols = new Vector<>();
            Vector<String> rows = new Vector<>();
            List<List<Integer>> vals = new Vector<>();

            String key1 = acs.get(0).statsKey1;
            String key2 = acs.get(0).statsKey2;
            Optional<AggregationParam> ap1 = AggregationParam.getAggregationParams1ById(ag.id);
            Optional<AggregationParam> ap2 = AggregationParam.getAggregationParams2ById(ag.id);
            if (ap1.isPresent() && ap2.isPresent()) {

                List<Valuelist> vl1 = Valuelist.findByType(ap1.get().valueList);

                List<Valuelist> vl2;
                if (ap2.get().aggrType.equals("simple"))
                    vl2 = Valuelist.findByType(ap2.get().valueList);
                else
                    vl2 = ValuelistExt.getFlatValueList(ap2.get().valueList);

                if (!vl1.isEmpty() && !vl2.isEmpty()) {
                    for (Valuelist vall2 : vl2) {
                        rows.add(vall2.label);
                        List<Integer> vs = new Vector<>();
                        for (Valuelist vall1 : vl1) {
                            int curVal = 0;
                            for (ArchiveComplexStat ac : acs) {
                                if (
                                        ac.statsValue1.toLowerCase().trim().equals(vall1.key.toLowerCase().trim()) &&
                                                ac.statsValue2.toLowerCase().trim().equals(vall2.key.toLowerCase().trim())
                                )
                                    curVal = ac.statsCount;
                            }
                            vs.add(curVal);
                        }
                        vals.add(vs);
                    }

                    for (Valuelist vall1 : vl1)
                        cols.add(vall1.label);

                    List<ArchiveStat> pstats = statsForJob(PopulationUtil.STAT_AGTYPE(), jobId);

                    AggregationCharts aggc = new AggregationCharts();
                    aggc.aggregationTypeId = aggregationTypeID;
                    aggc.timeOfDataDumpId = aj.jobTimestamp.toDateTimeISO().toString();
                    aggc.columnLabels = cols;
                    aggc.rowLabels = rows;
                    aggc.data = vals;

                    for (List<Integer> vl : vals) {
                        for (Integer v : vl)
                            aggc.casesCur += v;
                    }

                    Map<String, Integer> popuMap = Population.getPopulations(jobId);
                    aggc.casesAll = PopulationUtil.getPopForType(pstats, ag.populationType);
                    aggc.ggstype = ag.populationType;

                    return Optional.of(aggc);
                } else
                    return Optional.empty();
            } else
                return Optional.empty();
        } else
            return Optional.empty();
    }
}
