package modelHelper.incidentTypes;

import modelHelper.incidentTypes.subtypes.*;

import java.util.List;

public class NotificationBase extends IncidentBase {
  public FullIncidentTypology incident_typology;
  public List<FullSupporter> supporter_list;
  public List<FullCauser> causer_list;
  public FullShortDescription short_description;
  public List<FullInvolved> involved_list;
  public List<FullEvidence> evidence_list;
}
