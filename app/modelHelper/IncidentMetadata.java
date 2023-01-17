package modelHelper;

import models.Incident;

import java.time.Instant;

public class IncidentMetadata {
    public String incident_number;
    public String creation_date = Instant.now().toString();
    public String lastupdated_date = Instant.now().toString();
    public String consultant = null;
    public String institution = "FMFW-Fachstelle";
    public String responsible_institution = "fmfw_fachstelle";
    public boolean external_incident = false;
}
