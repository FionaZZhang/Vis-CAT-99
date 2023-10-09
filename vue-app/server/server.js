const express = require('express');
const cors = require('cors');  // Import the cors middleware
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(cors());  // Use the cors middleware

app.use(bodyParser.json());

const usersFilePath = 'server/data/users.json';
const resultsFilePath = 'server/data/results.json';


// Get classes from the JSON file
app.get('/api/classes', (req, res) => {
  const className = req.query.className;
  const data = JSON.parse(fs.readFileSync(usersFilePath));
  if (className) {
    const selectedClass = data.classes.find(cls => cls.className === className);

    if (selectedClass) {
      const students = selectedClass.students;
      res.json({students});
    } else {
      res.status(404).json({ error: 'Class not found' });
    }
  } else {
    // If className is not provided, return all classes
      res.status(404).json({ error: 'No class name' });
  }
});

// Get users from the JSON file
app.get('/api/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync(usersFilePath));

  if (data && data.classes) {
    const allStudents = data.classes.flatMap(cls => cls.students);
    res.json({ students: allStudents });
    console.log(allStudents)
  } else {
    res.status(500).json({ error: 'Error reading users data' });
  }
});

// Get results from the JSON file
app.get('/api/results', (req, res) => {

  try {
    const data = JSON.parse(fs.readFileSync("server/data/results.json"));

    res.json({data});
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new class to the JSON file
app.post('/api/classes', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const newClassName = req.body.className;
    const students = req.body.students || [];

    // Function to generate a random integer between 1 and 10 with 5 digits
    const generateRandomId = () => Math.floor(Math.random() * 10 ** 4) + 10000;

    // Check if the class name is available
    const existingClassIndex = data.classes.findIndex(cls => cls.className === newClassName);

    if (existingClassIndex === -1) {
      // If the class does not exist, add a new class with students
      const newClass = {
        className: newClassName,
        students: students.map(student => ({
          ...student,
          id: generateRandomId(),
        })),
      };

      data.classes.push(newClass);
    } else {
      // If the class exists, add the new students to the existing class
      const existingStudents = data.classes[existingClassIndex].students;
      const newStudents = students.map(student => ({
        ...student,
        id: generateRandomId(),
      }));

      data.classes[existingClassIndex].students = existingStudents.concat(newStudents);
    }

    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
    res.json(data); // Return the entire updated data
  } catch (error) {
    console.error('Error reading or writing file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/send-total', (req, res) => {
  try {
    const resultData = JSON.parse(fs.readFileSync(resultsFilePath, 'utf-8')) || [];
    const newResult = {
      id: req.body.id,
      score: req.body.score
    };
    resultData.push(newResult);
    fs.writeFileSync(resultsFilePath, JSON.stringify(resultData, null, 2));
    res.json({ message: 'Result stored successfully' });
  } catch (error) {
    console.error('Error reading or writing file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
