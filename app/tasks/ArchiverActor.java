package tasks;

import akka.actor.AbstractActor;
import com.google.inject.Inject;
import com.typesafe.config.Config;
import models.*;
import org.joda.time.DateTime;
import play.Logger;
import stats.ComplexStatsBuilder;
import stats.SimpleStatsBuilder;

import java.util.*;

public class ArchiverActor extends AbstractActor {

    @Inject
    private Config config;

    @Override
    public Receive createReceive() {
        return receiveBuilder()
                .match(
                        String.class,
                        this::apply)
                .build();
    }

    @Override
    public void preStart() throws Exception {
        Logger.debug("ArchiverActor was started");
        super.preStart();

    }

    private boolean
    haveToRun(String aggScope) {

        Optional<ArchiveJob> aj = ArchiveJob.recentJobFinished(aggScope);
        if (aj.isPresent()) {
            DateTime lastrun = aj.get().jobTimestamp;
            DateTime now = DateTime.now();

            return !lastrun.monthOfYear().equals(now.monthOfYear()) || !lastrun.year().equals(now.year());
        } else
            return true;

    }

    private void runSimpleStatsJob(ArchiveJob archiveJob) {
        List<SimpleStatsBuilder.StatsValue> sstats = new Vector<>();
        List<SimpleStatsBuilder.StatsValue> sistats = SimpleStatsBuilder.simpleStatsJava(archiveJob.aggScope);
        sstats.addAll(sistats);

        List<SimpleStatsBuilder.StatsValue> ystats = SimpleStatsBuilder.yearStats(archiveJob.aggYear);
        sstats.addAll(ystats);

        for (SimpleStatsBuilder.StatsValue sstat : sstats) {

            ArchiveStat archiveStat = new ArchiveStat();
            archiveStat.jobId = archiveJob.id;
            archiveStat.statPath = sstat.statsPath();
            archiveStat.statKey = sstat.statsKey();
            archiveStat.statValue = sstat.statsValue();

            try {
                archiveStat.save();
            } catch (Exception e) {
                Logger.error("archiveStat failed:" + archiveStat.statPath + " / " + archiveStat.statKey + " / " + archiveStat.statPath);
            }
        }
    }

    private void runComplexStatsJob(ArchiveJob archiveJob) {
        List<Aggregation> aggs = ComplexStatsBuilder.init();
        java.util.List<ArchiveComplexStat> result = ComplexStatsBuilder.process(archiveJob, aggs);
        Logger.debug("ComplexStatsBuilder result size: " + result.size());
    }

    private void apply(String message) {
        List<String> aggScopes = config.getStringList("adw.aggscopes");
        for (String as : aggScopes) {
            if (haveToRun(as)) {
                ArchiveJob.deleteArchiveJobs(as);

                int currentYear = DateTime.now().getYear();
                Set<Integer> allYears = Incident.getAllCreationYears(currentYear);
                Iterator<Integer> itr = allYears.iterator();

                while (itr.hasNext()) {
                    int pYear = itr.next().intValue();
                    Logger.debug("start archiving stats for: " + as);
                    ArchiveJob.cleanupArchiveJobs();
                    ArchiveJob archiveJob = ArchiveJob.createJob(as, pYear);
                    runSimpleStatsJob(archiveJob);
                    runComplexStatsJob(archiveJob);
                    archiveJob.jobFinished = true;
                    archiveJob.save();
                    Logger.debug("created archive job: " + archiveJob.id);

                }
            }
        }
    }
}
