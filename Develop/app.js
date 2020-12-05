const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const fs = require('fs');
const inquirer = require('inquirer');

// array of questions for user
const questions = ['What is the name of your project or repo?',
    'What is your motivation behind this app?',
    'How do you use this app?',
    'How is this app installed?',
    'Enter link or path to image or gif of app.',
    'Enter alt text for that image or gif.',
    'What is your GitHub Repo URL?',
    'What is the live URL?',
    'How can a user report issues?',
    'How can a user make contributions?',
];


// function to dynamically write README file
function writeToFile(fileName, data) {
    const userResponse = `

    `
    // writing file on fs using 'userResponse' and logging and console.logging either an error or 'complete'
    fs.writeFile('team.html', userResponse, (err) =>
        err ? console.log(err) : console.log('complete')
    )
}

function init() {
    // constructor functions for Inquirer prompts to run in command-line
    function Prompts(type, message, name) {
        this.type = type;
        this.message = message;
        this.name = name;
    }
    // new prompts
    const question1 = new Prompts('input', questions[0], 'repoName')
    const question2 = new Prompts('input', questions[1], 'motivation')
    const question3 = new Prompts('input', questions[2], 'howToUse')
    const question4 = new Prompts('input', questions[3], 'installation')
    const question5 = new Prompts('input', questions[4], 'imageLink')
    const question6 = new Prompts('input', questions[5], 'imageAlt')
    const question7 = new Prompts('input', questions[6], 'gitHubURL')
    const question8 = new Prompts('input', questions[7], 'liveURL')
    const question9 = new Prompts('input', questions[8], 'reportIssues')
    const question10 = new Prompts('input', questions[9], 'contribute')


    inquirer
        .prompt([
            {
                type: question1.type,
                message: question1.message,
                name: question1.name,
            },
            {
                type: question2.type,
                message: question2.message,
                name: question2.name,
            },
            {
                type: question3.type,
                message: question3.message,
                name: question3.name,
            },
            {
                type: question4.type,
                message: question4.message,
                name: question4.name,
            },
            {
                type: question5.type,
                message: question5.message,
                name: question5.name,
            },
            {
                type: question6.type,
                message: question6.message,
                name: question6.name,
            },
            {
                type: question7.type,
                message: question7.message,
                name: question7.name,
            },
            {
                type: question8.type,
                message: question8.message,
                name: question8.name,
            },
            {
                type: question9.type,
                message: question9.message,
                name: question9.name,
            },
            {
                type: question10.type,
                message: question10.message,
                name: question10.name,
            },

        ])
        // returned data is then used to write to json file and READMe Markdown
        .then((data) => {
            const fileName = `${data.repoName.toLowerCase().split(" ").join("-")}.json`;
            writeToFile(fileName, data);
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
