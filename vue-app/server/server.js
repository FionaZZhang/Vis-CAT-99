const express = require('express');
const cors = require('cors');  // Import the cors middleware
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());  // Use the cors middleware

app.use(bodyParser.json());

const usersFilePath = 'server/data/users.json';

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


// Add a new class to the JSON file
app.post('/api/classes', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const newClassName = req.body.className;
    const students = req.body.students || []; // Extract students from the request

    // Check if the class name is available
    const isDuplicate = data.classes.some(cls => cls.className === newClassName);

    if (!isDuplicate) {
      const newClass = {
        className: newClassName,
        students: students, // Add students to the class
      };

      data.classes.push(newClass);

      fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
      res.json(data); // Return the entire updated data
    } else {
      res.status(400).json({ error: 'Invalid or duplicate class name' });
    }
  } catch (error) {
    console.error('Error reading or writing file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
