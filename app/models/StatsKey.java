package models;

import io.ebean.Finder;

import java.util.List;
import java.util.Optional;
import java.util.Vector;

public class StatsKey extends BaseModel {

    public String statsType;

    public String statsKey;

    public static Finder<Long, StatsKey> find = new Finder<>(StatsKey.class);

    public static List<String> getKeysByType(String type) {

        List<Aggregation> aggs = Aggregation.getSimpleAggregations();

        Vector<String> result = new Vector<>();
        for (Aggregation agg : aggs) {
            Optional<AggregationParam> ap = AggregationParam.getAggregationParams1ById(agg.id);
            if (ap.isPresent())
                if (ap.get().aggrType.trim().equals(type.toLowerCase().trim())) {
                    String key = ap.get().getFullPath();
                    result.add(key);
                } else if (ap.get().aggrType.trim().equals(AggregationParam.HIERARCHICAL)) {
                    List<ValuelistExt> vlexs = ValuelistExt.findByType(ap.get().getValueList());
                    for (ValuelistExt vlex : vlexs) {
                        String key = ap.get().getFullPath() + "." + vlex.subKey;
                        if (vlex.subKey != null && vlex.subKey.equals("other"))
                            key = ap.get().getFullPath() + "." + vlex.key + "_" + vlex.subKey;
                        else if (vlex.key.equals("other"))
                            key = ap.get().getFullPath() + "." + vlex.key;

                        result.add(key);
                    }
                }
        }

        return result;
    }

}
