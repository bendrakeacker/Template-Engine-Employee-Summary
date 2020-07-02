// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Engineer = require("./Engineer");

class Intern extends Engineer {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;