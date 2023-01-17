package finder;

import io.ebean.Finder;
import models.ArchiveStat;

public class ArchiveStatFinder extends Finder<Long, ArchiveStat> {

    /**
     * Construct using the default EbeanServer.
     */
    public ArchiveStatFinder() {
        super(ArchiveStat.class);
    }

}
