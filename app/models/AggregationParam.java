package models;

import io.ebean.RawSql;
import io.ebean.RawSqlBuilder;
import io.ebean.annotation.Sql;

import javax.persistence.Entity;
import java.util.Optional;

@Entity
@Sql
public class AggregationParam extends BaseModel {

    public static final String SIMPLE = "simple";
    public static final String HIERARCHICAL = "hierarchical";

    public String paramKey;

    public String aggrType;

    public String path;

    public boolean isArray;

    public String dataRef;

    public String valueList;

    public String getParamKey() {
        return paramKey;
    }

    public void setParamKey(String paramKey) {
        this.paramKey = paramKey;
    }

    public String getAggrType() {
        return aggrType;
    }

    public void setAggrType(String aggrType) {
        this.aggrType = aggrType;
    }

    public String getPath() {
        if (path == null)
            return "";
        else
            return path.trim();
    }

    public void setPath(String path) {
        this.path = path;
    }

    public boolean isArray() {
        return isArray;
    }

    public void setArray(boolean array) {
        isArray = array;
    }

    public String getDataRef() {
        return dataRef;
    }

    public void setDataRef(String dataRef) {
        this.dataRef = dataRef;
    }

    public String getValueList() {
        return valueList;
    }

    public void setValueList(String valueList) {
        this.valueList = valueList;
    }

    public String getFullPath() {
        if (path != null && path.length() > 0 && dataRef != null)
            return path + "." + dataRef;
        else if (path != null && path.length() > 0) {
            return path;
        } else
            return dataRef;
    }

    public String getFullJsonPath() {
        String fixedPath = "";
        if (path != null)
            fixedPath = path.replace('.', '/');

        if (fixedPath.length() > 0 && dataRef != null && !isArray)
            return "/" + fixedPath + "/" + dataRef;
        else if (fixedPath.length() > 0) {
            return "/" + fixedPath;
        } else
            return "/" + dataRef;
    }

    public static Optional<AggregationParam> getAggregationParams1ById(String aggrID) {
        return getAggregationParamsById("1", aggrID);
    }

    public static Optional<AggregationParam> getAggregationParams2ById(String aggrID) {
        return getAggregationParamsById("2", aggrID);
    }

    private static Optional<AggregationParam> getAggregationParamsById(String pid, String aggrID) {

        String sql = "select ap.id, ap.param_key, ap.aggr_type, ap.path, ap.is_array, ap.data_ref, ap.value_list " +
                "from aggs as a, agg_params as ap " +
                "where a.param_key" + pid + " = ap.param_key and a.aggr_id = '" + aggrID + "'";

        RawSql rawSql = RawSqlBuilder
                .parse(sql)
                .columnMapping("ap.id", "id")
                .columnMapping("ap.param_key", "paramKey")
                .columnMapping("ap.aggr_type", "aggrType")
                .columnMapping("ap.path", "path")
                .columnMapping("ap.is_array", "isArray")
                .columnMapping("ap.data_ref", "dataRef")
                .columnMapping("ap.value_list", "valueList")
                .create();

        return Aggregation.db().find(AggregationParam.class)
                .setRawSql(rawSql)
                .findOneOrEmpty();
    }
}
