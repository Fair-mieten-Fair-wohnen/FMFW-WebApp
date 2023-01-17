package models;

import io.ebean.Finder;
import play.data.validation.Constraints;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

@Entity
@Table(name = "column_names")
public class ColumnName extends BaseModel {

    @Constraints.Required
    @Column(name = "label")
    public String label;

    @Constraints.Required
    @Column(name = "ref")
    public String ref;

    @Constraints.Required
    @Column(name = "type")
    public String type;

    @Constraints.Required
    @Column(name = "weight")
    public int weight = 100;

    public static Finder<Long, ColumnName> find = new Finder<>(ColumnName.class);

    public static List<ColumnName> findByTableName(String tableName) {
        return find
                .query("where table_name = '" + tableName + "' order by weight asc")
                .findList();
    }

    public static List<String> columnNamesByTableName(String tableName) {
        List<ColumnName> columnNames = findByTableName(tableName);
        Vector<String> cNames = new Vector<>();
        for (ColumnName cn : columnNames) {
            cNames.addElement(cn.ref);
        }
        return cNames;
    }


}
