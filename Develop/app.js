const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// function to dynamically write README file
function writeToFile(fileName, employees) {
    // render(employees)
    let fileContent = render(employees);
    fs.writeFile(outputPath, fileContent, (err) => {
        if (err) throw err;
        console.log("team.html created! Success!")
    })
    const userResponse = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">
                    {{ team }}
                </div>
            </div>
        </div>
    </body>
    
    </html>
    
    `
    // writing file on fs using 'userResponse' and logging and console.logging either an error or 'complete'
    fs.writeFile('team.html', userResponse, (err) =>
        err ? console.log(err) : console.log('complete')
    )
}

function init() {

    inquirer
        .prompt([

            {// name
                type: 'input',
                message: 'Enter the name of the employee',
                name: 'name',
            },
            {// id
                type: 'input',
                message: 'Enter the new employee id',
                name: 'id',
            },
            { //email
                type: 'input',
                message: 'Enter the new employee email',
                name: 'email',
            },
            { // role
                type: 'list',
                message: 'Select role for new employee:',
                choices: ["Manager", "Engineer", "Intern"],
                name: 'role',
            },
            {
                type: 'input',
                when: (answers) => answers.role === 'Manager',
                message: 'Enter new manager\'s office number',
                name: 'officeNumber',
            },
            {
                type: 'input',
                when: (answers) => answers.role === 'Engineer',
                message: 'Enter new engineer\'s Github profile name',
                name: 'github',
            },
            {
                type: 'input',
                when: (answers) => answers.role === 'Intern',
                message: 'Enter new interns\'s school',
                name: 'school',
            },
            {// enter new employee?
                type: 'confirm',
                message: 'Would you like to enter another new employee?',
                name: 'newEmployee',
            },
        ])

        .then((data) => {
            const employees = [];
            if (data.role === "Manager") {
                const newEmployee = new Manager(data.name, data.id, data.email, data.officeNumber)
                employees.push(newEmployee);
            } else if (data.role === "Engineer") {
                const newEmployee = new Engineer(data.name, data.id, data.email, data.github)
                employees.push(newEmployee);
            } else {
                const newEmployee = new Intern(data.name, data.id, data.email, data.school)
                employees.push(newEmployee);
            }

            console.log(employees[0].getRole())
            if (data.newEmployee) {
                init()
            } else {
                const fileName = `team.json`;
                writeToFile(fileName, employees);
                ;
            }

        })
}

// function call to initialize program

init();
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
