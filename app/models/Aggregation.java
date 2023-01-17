package models;

import com.fasterxml.jackson.databind.JsonNode;
import io.ebean.Model;
import io.ebean.RawSql;
import io.ebean.RawSqlBuilder;
import io.ebean.annotation.Sql;
import play.libs.Json;

import javax.persistence.Entity;
import java.util.List;
import java.util.Optional;

@Entity
@Sql
public class Aggregation extends Model {

    String id;

    String complexity;

    boolean aggregated;

    int order;

    String title;

    String subtitle;

    String description;

    String populationType;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getComplexity() {
        return complexity;
    }

    public void setComplexity(String complexity) {
        this.complexity = complexity;
    }

    public boolean isAggregated() {
        return aggregated;
    }

    public void setAggregated(boolean aggregated) {
        this.aggregated = aggregated;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPopulationType() {
        return populationType;
    }

    public void setPopulationType(String populationType) {
        this.populationType = populationType;
    }

    public static Optional<Aggregation> getAggregationById(String aggrId) {

        String sql = "select " +
                "a.aggr_id, " +
                "if(isnull(a.`param_key2`) || a.`param_key2` = '', 0, 1) as aggregated, " +
                "ap.aggr_type, " +
                "a.order, " +
                "a.title, " +
                "a.sub_title, " +
                "a.description, " +
                "a.population_type " +
                "from " +
                "agg_params as ap, aggs as a " +
                "where ap.`param_key` = a.`param_key1` and a.aggr_id = '" + aggrId + "'" +
                "order by a.order asc";

        RawSql rawSql = RawSqlBuilder.parse(sql)
                .columnMapping("a.aggr_id", "id")
                .columnMapping("ap.aggr_type", "complexity")
                .columnMapping("a.order", "order")
                .columnMapping("a.title", "title")
                .columnMapping("a.sub_title", "subtitle")
                .columnMapping("a.description", "description")
                .columnMapping("a.population_type", "populationType")
                .create();

        return Aggregation.db().find(Aggregation.class)
                .setRawSql(rawSql)
                .findOneOrEmpty();
    }

    public static JsonNode getAggregationsJson() {

        List<Aggregation> simpleAggs = getSimpleAggregations();
        List<Aggregation> complexAggs = getComplexAggregations();
        simpleAggs.addAll(complexAggs);

        return Json.toJson(simpleAggs);
    }

    public static List<Aggregation> getSimpleAggregations() {

        String sql = "select " +
                "a.aggr_id, " +
                "ap.aggr_type, " +
                "0 as aggregated, " +
                "a.order, " +
                "a.title, " +
                "a.sub_title, " +
                "a.description, " +
                "a.population_type " +
                "from " +
                "agg_params as ap, aggs as a " +
                "where ap.`param_key` = a.`param_key1` and (trim(a.`param_key2`)='' or isnull(a.`param_key2`)) and " +
                "ap.aggr_type in ('simple', 'hierarchical', 'string', 'date_year')\n" +
                "order by a.order asc";

        RawSql rawSql = RawSqlBuilder.parse(sql)
                .columnMapping("a.aggr_id", "id")
                .columnMapping("ap.aggr_type", "complexity")
                .columnMapping("a.order", "order")
                .columnMapping("a.title", "title")
                .columnMapping("a.sub_title", "subtitle")
                .columnMapping("a.description", "description")
                .columnMapping("a.population_type", "populationType")
                .create();

        return Aggregation.db().find(Aggregation.class)
                .setRawSql(rawSql)
                .findList();
    }

    public static List<Aggregation> getComplexAggregations() {

        String sql = "select a.aggr_id, 1 as aggregated, ap.aggr_type, a.order, a.title, a.sub_title, a.description, a.population_type " +
                "from agg_params as ap, aggs as a, agg_params as ap2 " +
                "where ap.`param_key` = a.`param_key1` and (ap2.`param_key` = a.`param_key2` or isnull(a.`param_key2`)) and ap.aggr_type in ('simple', 'hierarchical', 'string') " +
                "order by a.order asc";

        RawSql rawSql = RawSqlBuilder.parse(sql)
                .columnMapping("a.aggr_id", "id")
                .columnMapping("ap.aggr_type", "complexity")
                .columnMapping("a.order", "order")
                .columnMapping("a.title", "title")
                .columnMapping("a.sub_title", "subtitle")
                .columnMapping("a.description", "description")
                .columnMapping("a.population_type", "populationType")
                .create();

        return Aggregation.db().find(Aggregation.class)
                .setRawSql(rawSql)
                .findList();
    }
}
