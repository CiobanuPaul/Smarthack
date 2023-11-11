import OpenAI from "openai";
import * as fs from 'fs';

const openai:OpenAI = new OpenAI({apiKey: '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'})//process.env.OPENAI_API_KEY});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

async function evaluate(code : string){
  const completion = await openai.chat.completions.create({
    messages: [{role: "system", content: "Give me a JSON string containg an array of 4 integers. "
    +"Each integer represents your rating from 1 to 100 by evaluating the following criteria in this code: "
    +"1.Readability&Maintainability, 2.Explanation through comments, 3.Error Handling, 4.Good Practices. Here is the code:\n"
      +code}],
    model: "gpt-3.5-turbo",
  })
  console.log(completion.choices[0])
}


async function characterize(code : string){
  const completion = await openai.chat.completions.create({
    messages: [{role: "system", content: 'Give me a JSON string containg an object of this format: '
    +'{"complexity": 4,"math": 3,"sorting": 5,"dynamic_programming": 2, "graphs": 4, "trees": 3, "ranges": 1, "geometry": 3, "ai": 3, "statistics": 3} '
    +"But replace the numbers with your ratings from 1 to 100 by evaluating how much the following code belongs to the respective category. Here is the code:\n"
      +code}],
    model: "gpt-3.5-turbo",
  })
  console.log(completion.choices[0])
}


// Function to read file content and return it as a string
function readFileToString(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const filePath = '/home/cartofiprajiti/Alte proiecte/template_smarthack/server/probleme/id_10/solutions/23336-100p.cpp14'; 
readFileToString(filePath)
  .then((fileContent) => {
    console.log('File content:', fileContent);
  })
  .catch((error) => {
    console.error('Error reading file:', error);
  });

// main();
characterize('#include <iostream>\nusing namespace std;\nint main(){\n  cout<<"Hello world!";//This prints the message "Hello World!"\n   return 0;\n}');