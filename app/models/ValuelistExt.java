package models;

import io.ebean.Finder;
import play.data.validation.Constraints;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.*;

@Entity
@Table(name = "value_lists_ext")
public class ValuelistExt extends BaseModel {

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

    @Constraints.Required
    @Column(name = "sub_label")
    public String subLabel;

    @Constraints.Required
    @Column(name = "sub_key")
    public String subKey;

    @Constraints.Required
    @Column(name = "sub_weight")
    public int subWeight;

    public String fixedSubLabel() {
        if (subLabel == null || subLabel.trim().equals(""))
            return label.trim();
        else
            return subLabel.trim();
    }

    public String fixedSubKey() {
        if (subKey == null || subKey.trim().equals(""))
            return key.trim();
        else
            return key.trim() + "." + subKey.trim();

    }

    public static final Finder<Long, ValuelistExt> find = new Finder<>(ValuelistExt.class);

    public static List<ValuelistExt> findByType(String listType) {
        return find
                .query()
                .where().eq("listtype", listType)
                .order("weight asc, sub_weight asc")
                .findList();
    }

    public static List<ValuelistExt> findBySubKey(String subKey) {
        return find
                .query()
                .where().eq("subKey", subKey)
                .order("weight asc, sub_weight asc")
                .findList();
    }

    public static Map<String, ValuelistExt> findByTypeAsMap(String listType) {
        List<ValuelistExt> list = findByType(listType);

        Iterator<ValuelistExt> itr = list.iterator();

        Map<String, ValuelistExt> result = new HashMap<>();
        while (itr.hasNext()) {
            ValuelistExt vl = itr.next();
            result.put(vl.key, vl);
        }
        return result;
    }

    public static List<Valuelist> getFlatValueList(String listType) {
        List<ValuelistExt> extVls = findByType(listType);
        List<Valuelist> vls = new Vector<>();

        for (ValuelistExt extVl : extVls) {
            Valuelist vl = new Valuelist();
            vl.label = extVl.subLabel;
            vl.key = extVl.subKey;
            vl.listtype = extVl.listtype;
            vl.weight = extVl.subWeight;
            vl.id = extVl.id;
            vls.add(vl);
        }
        return vls;
    }

}
