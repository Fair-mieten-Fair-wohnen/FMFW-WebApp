package models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import finder.ArchiveJobFinder;
import io.ebean.Finder;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import play.data.validation.Constraints;
import play.libs.Json;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;
import java.util.Vector;

@Entity
@Table(name = "archive_job")
public class ArchiveJob extends BaseModel {

    public static final String DEFAULT_JOB_KEY = "all";

    @Constraints.Required
    @Column(name = "job_timestamp")
    public DateTime jobTimestamp = new DateTime();

    @Constraints.Required
    @Column(name = "job_finished")
    public boolean jobFinished = false;

    @Constraints.Required
    @Column(name = "agg_scope")
    public String aggScope = "all";

    @Constraints.Required
    @Column(name = "agg_year")
    public int aggYear;

    public static final Finder<Long, ArchiveJob> find = new ArchiveJobFinder();

    public static Optional<ArchiveJob> recentJob(String aggScope) {
        return recentJob(0, aggScope);
    }

    public static Optional<ArchiveJob> recentJobFinished(String aggScope) {
        return recentJob(1, aggScope);
    }

    private static Optional<ArchiveJob> recentJob(int jobFinished, String aggScope) {
        return find
                .query()
                .orderBy("job_timestamp desc")
                .setMaxRows(1)
                .where().eq("job_finished", jobFinished)
                .eq("agg_scope", aggScope)
                .findOneOrEmpty();
    }

    public static ArchiveJob createJob(String aggScope, int aggYear) {
        ArchiveJob archiveJob = new ArchiveJob();
        archiveJob.aggScope = aggScope;
        archiveJob.aggYear = aggYear;
        if (DateTime.now().year().get() == aggYear) {
            archiveJob.jobTimestamp = DateTime.now();
        } else {
            archiveJob.jobTimestamp = new DateTime(aggYear, 12, 31, 12, 00, 00, 000);
        }
        archiveJob.save();
        return archiveJob;
    }

    public static void cleanupArchiveJobs() {
        List<ArchiveJob> nfArchiveJobs = ArchiveJob.allNotFinishedJobs();
        if (!nfArchiveJobs.isEmpty()) {
            for (ArchiveJob ajob : nfArchiveJobs) {
                ArchiveStat.cleanJobStatsForJob(ajob.id);
                ArchiveComplexStat.cleanJobStatsForJob(ajob.id);
                ajob.deletePermanent();
                ajob.save();
            }
        }
    }

    public static void deleteArchiveJobs(String scope) {
        List<ArchiveJob> archiveJobs = find.query("where agg_scope = '" + scope.trim().toLowerCase() + "'").findList();
        ListIterator<ArchiveJob> itr = archiveJobs.listIterator();
        while (itr.hasNext()) {
            ArchiveJob aj = itr.next();

            ArchiveStat.cleanJobStatsForJob(aj.id);
            ArchiveComplexStat.cleanJobStatsForJob(aj.id);

            aj.deletePermanent();
            aj.save();
        }
    }

    public static List<JsonNode> finishedJobsJson(String aggScope) {

        List<ArchiveJob> jobs = finishedJobs(aggScope);
        List<JsonNode> jobsJson = new Vector<>();

        DateTimeFormatter fmt = DateTimeFormat
                .forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                .withZoneUTC();

        for (ArchiveJob job : jobs) {
            ObjectNode json = Json.newObject();
            json.put("id", job.id);
            json.put("timestamp", fmt.print(job.jobTimestamp));
            json.put("aggYear", job.aggYear);
            jobsJson.add(json);
        }
        return jobsJson;
    }

    public static List<ArchiveJob> finishedJobs(String aggScope) {
        return jobs(1, aggScope);
    }

    private static List<ArchiveJob> jobs(int jobFinished, String aggScope) {
        return find
                .query()
                .where()
                .eq("job_finished", jobFinished)
                .eq("agg_scope", aggScope)
                .findList();
    }

    private static List<ArchiveJob> allNotFinishedJobs() {
        return find
                .query()
                .where()
                .eq("job_finished", 0)
                .findList();
    }
}
