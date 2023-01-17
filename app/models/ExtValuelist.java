package models;

import io.ebean.Finder;
import play.data.validation.Constraints;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "value_lists_ext")
public class ExtValuelist extends BaseModel {

    @Constraints.Required
    @Column(name = "key")
    public String key;

    @Constraints.Required
    @Column(name = "label")
    public String label;

    @Constraints.Required
    @Column(name = "weight")
    public int weight;

    @Constraints.Required
    @Column(name = "sub_key")
    public String subKey;

    @Constraints.Required
    @Column(name = "sub_label")
    public String subLabel;

    @Constraints.Required
    @Column(name = "sub_weight")
    public int subWeight;

    public static final Finder<Long, ExtValuelist> find = new Finder<>(ExtValuelist.class);

    public static final List<ExtValuelist> findByType(String listType) {
        return find
                .query("where listtype = '" + listType.toLowerCase() + "' order by weight, sub_weight asc")
                .findList();
    }

}
