package modelHelper.incidentTypes;

import modelHelper.incidentTypes.subtypes.*;

import java.util.List;

/**
 * Fallbetreuung
 * contains everything except:
      - anonymous flag
 */
public class CaseSupport extends NotificationBase {
  public CaseSupportGeneraldata generaldata;
  public FullAffectedPerson affected_person;
  public FullIncidentMetadata metadata;

  // additional data of case support incidents
  public FullProcessBlogPart1 process_blog_part1;
  public List<FullIntervention> interventions;
  public FullCompletion completion;
}
