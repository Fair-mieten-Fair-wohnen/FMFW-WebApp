package models;

import io.ebean.Finder;
import play.data.validation.Constraints;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.*;

@Entity
@Table(name = "value_lists")
public class Valuelist extends BaseModel {

    @Constraints.Required
    @Column(name = "key")
    public String key;

    @Constraints.Required
    @Column(name = "listtype")
    public String listtype;

    @Constraints.Required
    @Column(name = "label")
    public String label;

    @Constraints.Required
    @Column(name = "weight")
    public int weight;

    public static final Finder<Long, Valuelist> find = new Finder<>(Valuelist.class);

    public static List<Valuelist> findByType(String listType) {
        return find
                .query().where().eq("listtype", listType).orderBy("weight")
                .findList();
    }

    public static List<Valuelist> findByKey(String key) {
        return find
                .query().where().eq("key", key).orderBy("weight")
                .findList();
    }

    public static Map<String, Valuelist> findByTypeAsMap(String listType) {
        List<Valuelist> list = findByType(listType);

        Iterator<Valuelist> itr = list.iterator();

        Map<String, Valuelist> result = new HashMap<>();
        while (itr.hasNext()) {
            Valuelist vl = itr.next();
            result.put(vl.key, vl);
        }
        return result;
    }

    public static List<Valuelist> extractFromList(List<ArchiveStat> stats) {

        List<Valuelist> result = new Vector<>();
        Iterator<ArchiveStat> itr = stats.iterator();
        int weight = 10;
        while (itr.hasNext()) {
            ArchiveStat as = itr.next();
            Valuelist vl = new Valuelist();
            vl.key = as.statKey;
            vl.label = as.statKey;
            vl.weight = weight;
            vl.listtype = "unknown";
            weight += 10;
            result.add(vl);
        }
        return result;
    }

}
