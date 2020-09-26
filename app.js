const inquirer = require('inquirer')

const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }
    ])
};

const promptProject = portfolioData => {

    // If there's no 'projects' array projects, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }




    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is the name of your Project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project(Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter your GitHub link to your project'

        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this Project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData)
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    })

}

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);


// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });













































// const printProfileData = (profileDataArr) => {
//     // This
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }

//     console.log('=============');

//     // Is the same as this
//     profileDataArr.forEach(profileItem => console.log(profileItem));


// };
// printProfileData(profileDataArgs)