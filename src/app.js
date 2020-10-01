const { writeFile, copyFile } = require("./utils/generate-site.js");

const generatePage = require("./page-template.js");

const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your Github username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        "Would you like to add information about yourself for an About section?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  // If there's no 'projects' array projects, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your Project?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the name of your project!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of your project(Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a description of your project!");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter your GitHub link to your project",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter link for your project!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this Project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });

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

// const pageHTML = generatePage(portfolioData);

// fs.writeFile("./dist/index.html", pageHTML, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(
//     "Page created! Check out index.html in this directory to see it!"
//   );

//   fs.copyFile("./style.css", "./dist/style.css", (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Style sheet copied successfully!");
//   });
// });
