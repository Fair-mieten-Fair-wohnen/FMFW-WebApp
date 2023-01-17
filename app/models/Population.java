package models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Population {

    public static Map<String, Integer> getPopulations(long jobId) {

        List<ArchiveStat> arsts = ArchiveStat.statsForJob("agg_type", jobId);

//        Integer allSum = 0;
        Map<String, Integer> popMap = new HashMap<>();
        for (ArchiveStat arst : arsts) {
            popMap.put(arst.statKey, arst.statValue);
//            allSum += arst.statValue;
        }
//        popMap.put("ALL", allSum);

        return popMap;
    }
}
