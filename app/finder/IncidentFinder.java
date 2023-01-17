package finder;

import io.ebean.Finder;
import models.Incident;

public class IncidentFinder extends Finder<Long, Incident> {

    /**
     * Construct using the default EbeanServer.
     */
    public IncidentFinder() {
        super(Incident.class);
    }

}
