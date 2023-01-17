package models;

import finder.ArchiveComplexStatFinder;
import io.ebean.Finder;
import io.ebean.annotation.JsonIgnore;
import play.data.validation.Constraints;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "archive_comp_stat")
public class ArchiveComplexStat extends BaseModel {

    @Constraints.Required
    @Column(name = "job_id")
    @JsonIgnore
    public Long jobId;

    @Constraints.Required
    @Column(name = "aggr_id")
    public String aggrId;

    @Column(name = "stats_path1")
    public String statsPath1;

    @Constraints.Required
    @Column(name = "stats_key1")
    public String statsKey1;

    @Constraints.Required
    @Column(name = "stats_value1")
    public String statsValue1;

    @Column(name = "stats_path2")
    public String statsPath2;

    @Constraints.Required
    @Column(name = "stats_key2")
    public String statsKey2;

    @Constraints.Required
    @Column(name = "stats_value2")
    public String statsValue2;

    @Constraints.Required
    @Column(name = "stats_count")
    public int statsCount;

    public static final Finder<Long, ArchiveComplexStat> find = new ArchiveComplexStatFinder();

    @Override
    public int hashCode() {
        return statsPath1.hashCode() + statsKey1.hashCode() + statsValue1.hashCode() + statsPath2.hashCode() + statsKey2.hashCode() + statsValue2.hashCode();
    }

    @Override
    public String toString() {
        return statsPath1 + "." + statsKey1 + " . " + statsValue1 + " / " + statsPath2 + "." + statsKey2 + "." + statsValue2 + ": " + statsCount;
    }

    public static List<ArchiveComplexStat> statsForJob(String aggregationTypeID, long jobId) {

        return find.query().where().and()
                .eq("job_id", jobId)
                .eq("aggr_id", aggregationTypeID)
                .findList();

    }

    public static void cleanJobStatsForJob(long jobId) {
        List<ArchiveComplexStat> archiveStats = find.query()
                .where().eq("job_id", jobId).findList();
        if (!archiveStats.isEmpty()) {
            for (ArchiveComplexStat astat : archiveStats) {
                astat.deletePermanent();
                astat.save();
            }
        }
    }

    public static ArchiveComplexStat create(Long jobId, String aggrId, String statsPath1, String statsKey1, String statsValue1, String statsPath2, String statsKey2, String statsValue2, int statsCount) {
        ArchiveComplexStat acs = new ArchiveComplexStat();
        acs.jobId = jobId;
        acs.aggrId = aggrId;
        acs.statsPath1 = statsPath1;
        acs.statsKey1 = statsKey1;
        acs.statsValue1 = statsValue1;
        acs.statsPath2 = statsPath2;
        acs.statsKey2 = statsKey2;
        acs.statsValue2 = statsValue2;
        acs.statsCount = statsCount;
        return acs;

    }

}
