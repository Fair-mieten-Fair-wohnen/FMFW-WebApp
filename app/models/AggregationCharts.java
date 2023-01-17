package models;

import java.util.List;
import java.util.Vector;

public class AggregationCharts {
    public String aggregationTypeId;
    public String timeOfDataDumpId;
    public List<String> columnLabels = new Vector<>();
    public List<String> rowLabels = new Vector<>();
    public List<List<Integer>> data = new Vector<>();
    public Integer casesCur = 0;
    public Integer casesAll = 0;
    public String ggstype;

}
