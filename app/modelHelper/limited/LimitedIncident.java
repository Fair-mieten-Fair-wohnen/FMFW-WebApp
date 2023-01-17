package modelHelper.limited;

import modelHelper.limited.subtypes.*;

import java.util.List;

public class LimitedIncident {
    public Integer id;
    public String type;
    public LimitedMetadata metadata;
    public LimitedGeneraldata generaldata;
    public LimitedShortDescription short_description;
    public LimitedProcessBlogPart1 process_blog_part1;
    public LimitedIncidentTypology incident_typology;
    public List<LimitedIntervention> interventions;
    public List<LimitedCauser> causer_list;
    public LimitedCompletion completion;
}
