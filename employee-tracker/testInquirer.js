const inquirer = require('inquirer');

async function testPrompt() {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Select an option:',
      choices: ['Option 1', 'Option 2'],
    },
  ]);

  console.log('You selected:', choice);
}

testPrompt();
