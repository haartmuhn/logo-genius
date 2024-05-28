const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const { Circle, Triangle, Square } = require('./lib/shapes');

const exampleFolderPath = path.join(__dirname, 'examples');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo text:',
    validate: input => input.length <= 3 || 'Text must be three characters or less'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter a color for the text (keyword or hexadecimal):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a color for the shape (keyword or hexadecimal):',
  }
];

function generateSVG(data) {
  let shape;
  switch (data.shape) {
    case 'Circle':
      shape = new Circle();
      break;
    case 'Triangle':
      shape = new Triangle();
      break;
    case 'Square':
      shape = new Square();
      break;
    default:
      throw new Error('Invalid shape');
  }
  shape.setColor(data.shapeColor);

  const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shape.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${data.textColor}">${data.text}</text>
</svg>
  `;

  return svgContent.trim();
}

inquirer.prompt(questions).then(answers => {
  const svg = generateSVG(answers);
  fs.writeFileSync(path.join(exampleFolderPath, 'logo.svg'), svg);
  console.log('Generated logo.svg in examples folder');
}).catch(error => {
  console.error('Error generating logo:', error);
});
