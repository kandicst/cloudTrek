package Model.Entities;

import java.util.Objects;
import java.util.UUID;

public class User {
    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String organizationName;
    private UserRole role;
    private String image;
    private boolean likesDark;

    private transient Organization organization;

    public User(String email, String password, String firstName, String lastName, String organizationName, UserRole role, Organization organization, boolean dark) {
        this.email = email;
        this.id = UUID.randomUUID()+"";
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.organizationName = organizationName;
        this.role = role;
        this.organization = organization;
        this.likesDark = dark;
    }

    public User() {
        this.email = "";
        this.password = "";
        this.firstName = "";
        this.likesDark = false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(email, user.email);
    }

    public String getId() { return id; }

    public void setId(UUID id) {
        this.id = id+"";
    }

    public boolean isAdmin() {
        return role.equals(UserRole.Admin);
    }

    public boolean isSuperAdmin() {
        return role.equals(UserRole.SuperAdmin);
    }

    public boolean isUser() {
        return role.equals(UserRole.User);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public boolean getLikesDark() {
        return likesDark;
    }

    public void setLikesDark(boolean likesDark) {
        this.likesDark = likesDark;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
