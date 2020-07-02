const Mgmt = require("./lib/Manager");
const Engr = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = [];

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function getManager() {

    console.log("Start your team!");
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of your manager?",
                name: "mgmtName",
                validate: answers => {
                    if (answers !== "") {
                        return true;
                    }
                    return "Please enter a name.";
                }
            },
            {
                type: "input",
                message: "What is the id of your manager?",
                name: "mgmtId",
                validate: answers => {
                    if (parseInt(answers)) {
                        return true;
                    }
                    return "Please enter a number.";
                }
            },
            {
                type: "input",
                message: "What is the email of your manager?",
                name: "mgmtEmail",
                validate: answers => {
                    if (validateEmail(answers)) {
                        return true;
                    }
                    return "Please enter an email address.";
                }
            },
            {
                type: "input",
                message: "What is the office number of your manager?",
                name: "mgmtNumber",
                validate: answers => {
                    if (parseInt(answers)) {
                        return true;
                    }
                    return "Please enter a number.";
                }
            }
        ])
        .then(function (answers) {
            var newMgmt = new Mgmt(answers.mgmtName, answers.mgmtId, answers.mgmtEmail, answers.mgmtNumber);
            employees.push(newMgmt);
            var exit = false;

            moreEmployees();

        })
}


function moreEmployees() {

    const engrQuestions = ([
        {
            type: "input",
            message: "What is your engineer called?",
            name: "engrName",
            validate: answers => {
                if (answers !== "") {
                    return true;
                }
                return "Please enter a name.";
            }
        },
        {
            type: "input",
            message: "What is the id of your engineer?",
            name: "engrId",
            validate: answers => {
                if (parseInt(answers)) {
                    return true;
                }
                return "Please enter a number.";
            }
        },
        {
            type: "input",
            message: "What is the email of your engineer?",
            name: "engrEmail",
            validate: answers => {
                if (validateEmail(answers)) {
                    return true;
                }
                return "Please enter an email address.";
            }
        },
        {
            type: "input",
            message: "What is your engineer's GitHub username?",
            name: "engrGithub",
            validate: answers => {
                if (answers !== "") {
                    return true;
                }
                return "Please enter a username.";
            }
        }
    ])

    const internQuestions = ([
        {
            type: "input",
            message: "What is your intern called?",
            name: "internName",
            validate: answers => {
                if (answers !== "") {
                    return true;
                }
                return "Please enter a name.";
            }
        },
        {
            type: "input",
            message: "What is the id of your intern?",
            name: "internId",
            validate: answers => {
                if (parseInt(answers)) {
                    return true;
                }
                return "Please enter a number.";
            }
        },
        {
            type: "input",
            message: "What is the email of your intern?",
            name: "internEmail",
            validate: answers => {
                if (validateEmail(answers)) {
                    return true;
                }
                return "Please enter an email address.";
            }
        },
        {
            type: "input",
            message: "What school does/did your intern attend?",
            name: "internSchool",
            validate: answers => {
                if (answers !== "") {
                    return true;
                }
                return "Please enter a school.";
            }
        }
    ])

    inquirer
        .prompt([
            {
                type: "list",
                message: "What type of team member would you like to recruit",
                default: "(Use arrow keys)",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"],
                name: "newEmployee"
            }
        ]).then(function (answers) {
            if (answers.newEmployee === "Engineer") {
                inquirer
                    .prompt(engrQuestions).then(function (answers) {
                        var newEngr = new Engr(answers.engrName, answers.engrId, answers.engrEmail, answers.engrGithub);
                        employees.push(newEngr);

                        moreEmployees();
                    });

            } else if (answers.newEmployee === "Intern") {
                inquirer
                    .prompt(internQuestions).then(function (answers) {
                        var newIntern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                        employees.push(newIntern);

                        moreEmployees();
                    });

            } else {
                console.log("Thanks for your selection(s)!")
                const result = render(employees);
                console.log(result);

                fs.writeFile("./team.html", result, err => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Your file was successfully written to team.html!")
                })
            }
        })
}

getManager();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
