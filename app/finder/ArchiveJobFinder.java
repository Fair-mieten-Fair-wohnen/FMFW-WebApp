package finder;

import io.ebean.Finder;
import models.ArchiveJob;
import models.Incident;

public class ArchiveJobFinder extends Finder<Long, ArchiveJob> {

    /**
     * Construct using the default EbeanServer.
     */
    public ArchiveJobFinder() {
        super(ArchiveJob.class);
    }

}
