package modelHelper;

import models.Incident;

import java.util.List;

public class IncidentResult {

    private List<Incident> incidents;

    private int totalItemsCount;

    public IncidentResult(List<Incident> incidents, int totalItemsCount) {
        this.incidents = incidents;
        this.totalItemsCount = totalItemsCount;
    }

    public List<Incident> getIncidents() {
        return incidents;
    }

    public int getTotalItemsCount() {
        return totalItemsCount;
    }

}
