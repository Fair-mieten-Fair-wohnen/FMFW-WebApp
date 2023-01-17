package modelHelper;

import models.UserContext;
import org.joda.time.Instant;

public class IncidentStub {
    public long id;
    public String type;
    public IncidentMetadata metadata = new IncidentMetadata();

    public static IncidentStub createInitialIncident(String type, long incidentNumber, Instant created, UserContext userContext) {
        IncidentStub incidentStub = new IncidentStub();
        incidentStub.id = incidentNumber;
        incidentStub.type = type.toUpperCase();
        incidentStub.metadata.incident_number = String.valueOf(incidentNumber);
        incidentStub.metadata.creation_date = created.toString();
        incidentStub.metadata.lastupdated_date = created.toString();
        incidentStub.metadata.institution = userContext.getInstitution();
        incidentStub.metadata.responsible_institution = userContext.getInstitutionKey();
        incidentStub.metadata.external_incident = false;
        incidentStub.metadata.consultant = userContext.getName();
        return incidentStub;
    }
}
