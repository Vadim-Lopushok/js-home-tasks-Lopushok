'use strict'

function interviewQuestion(profession) {
 
  return function(person) {
   
      if (profession === 'designer') {
          console.log(person + ' can you please explain what UX design is?');   
      } else if (profession === 'teacher') {
          console.log('What subject do you teach ' + person + '?');   
      } else {
        console.log('Hello ' + person + ' , what do you do?');
      }
  }
  
}

interviewQuestion('designer')('John');
interviewQuestion('teacher')('John');
interviewQuestion('master')('Mike');