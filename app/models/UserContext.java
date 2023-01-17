package models;

import java.util.Set;
import java.util.TreeSet;
import java.util.Vector;

public class UserContext {

    public static final String READ = "READ";
    public static final String WRITE = "WRITE";
    public static final String DELETE = "DELETE";
    public static final String LIMITED = "LIMITED";

    private String name = null;

    private String userName = null;

    private String institution = null;

    private Vector<String> groups = new Vector<>();

    private Vector<String> roles = new Vector<>();

    public String getInstitution() {
        return institution == null ? "" : institution;
    }

    public String getInstitutionKey() {
        return getInstitution()
                .replace(" ", "_")
                .replace("-", "_")
                .toLowerCase();
    }

    public String getName() {
        return name == null ? "" : name;
    }

    public String getUserName() {
        return userName == null ? "" : userName;
    }

    public Vector<String> getGroups() {
        return groups;
    }

    public Vector<String> getRoles() {
        return roles;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void addGroup(String group) {
        this.groups.add(group);
        this.institution = this.groups.firstElement().replace("/", "");
    }

    public void addRole(String role) {
        this.roles.add(role);
    }

    public boolean isSuperUser() {
        return roles.contains("fmfw-superuser");
    }

    public Set<String> getAccessRights(Incident incident) {
        Set<String> accessRights = new TreeSet<>();
        if (incident.institution.equals(this.institution) || isSuperUser())
            accessRights.add(READ);

        if (!incident.institution.equals(this.institution) || isSuperUser()) {
            accessRights.add(READ);
        }

        if (!incident.institution.equals(this.institution) && !isSuperUser()) {
            accessRights.add(LIMITED);
        }

        if (incident.owner.equals(this.userName) || isSuperUser())
            accessRights.add(WRITE);

//        if (isSuperUser())
//            accessRights.add("DELETE");

        return accessRights;
    }

    @Override
    public String toString() {
        return getUserName() + "/" + getInstitution() + " ( groups: " + getGroups().toString() + " / roles: " + getRoles().toString() + ")";
    }
}
