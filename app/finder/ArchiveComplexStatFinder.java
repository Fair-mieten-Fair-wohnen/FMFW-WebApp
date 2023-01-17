package finder;

import io.ebean.Finder;
import models.ArchiveComplexStat;

public class ArchiveComplexStatFinder extends Finder<Long, ArchiveComplexStat> {

    /**
     * Construct using the default EbeanServer.
     */
    public ArchiveComplexStatFinder() {
        super(ArchiveComplexStat.class);
    }

}
