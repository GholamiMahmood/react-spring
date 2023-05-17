export default class User {
    constructor(username, password, isAdmin, name, role, token, id) {
        this.username = username;
        this.password= password;
        this.isAdmin = isAdmin;
        this.name = name;
        this.role = role;
        this.token = token;
        this.id = id;
    }
}
