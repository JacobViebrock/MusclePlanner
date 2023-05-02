/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('musclePlanner');

// Insert a few documents into the sales collection.
db.getCollection('members').insertMany([
  {'firstName': 'DJ',
  'lastName': 'Drew',
  'phoneNumber': '9194401559',
  'email': 'ddrew1@gmail.com',
  'password':'password',
  'fitnessGoal':'muscleGain',
  'calorieGoal':'3000'},

  {'firstName': 'John',
  'lastName': 'Jones',
  'phoneNumber': '9191234567',
  'email': 'jjones1@gmail.com',
  'password':'password',
  'fitnessGoal':'loseWeight',
  'calorieGoal':'3000'},

  {'firstName': 'Jill',
  'lastName': 'Jackson',
  'phoneNumber': '9197654321',
  'email': 'jjackson1@gmail.com',
  'password':'password',
  'fitnessGoal':'tone',
  'calorieGoal':'3000'}
])
 