
## The Quiz App is a simple web-based application designed to test users' general knowledge through a series of multiple-choice questions. It’s built using React, a popular JavaScript library for building user interfaces, and it includes basic functionality for managing state and handling user interactions.


## Key Features

1.	Multiple-Choice Questions:
o	The quiz consists of ten multiple-choice questions, each with four options. Users select their answers by clicking on radio buttons.
2.	Interactive Quiz:
o	Users can answer each question by selecting the radio button corresponding to their choice.
o	After answering all the questions, users can click the “Submit” button to get their score.
3.	Score Calculation:
o	Upon submission, the app calculates the user’s score based on the number of correct answers and displays it.
4.	User Interface:
o	The app includes a clean, responsive design with easy navigation. It uses simple CSS for styling the questions, options, and buttons.
How It Works
1.	Data Handling:
o	The quiz questions and options are stored in a JavaScript array. Each question object contains the question text, options, and the correct answer.
2.	State Management:
o	The app uses React’s useState hook to manage the state of user responses (currentAns), whether the quiz has been submitted (submitted), and the user’s score (score).
3.	User Interaction:
o	When a user selects an option, the handleChangeOption function updates the state with the selected answer for the respective question.
o	On clicking “Submit,” the handleSubmit function evaluates the answers, calculates the score, and updates the UI to show the result.
4.	Rendering:
o	The app dynamically renders each question and its options using React’s JSX syntax. It maps over the questions array and generates the appropriate HTML elements.
