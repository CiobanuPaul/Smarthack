"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({ apiKey: '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' }); //process.env.OPENAI_API_KEY});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0]);
    });
}
function evaluate(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            messages: [{ role: "system", content: "Give me a JSON string containg an array of 4 integers. "
                        + "Each integer represents your rating from 1 to 100 by evaluating the following criteria in this code: "
                        + "1.Readability&Maintainability, 2.Explanation through comments, 3.Error Handling, 4.Good Practices. Here is the code:\n"
                        + code }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0]);
    });
}
function characterize(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            messages: [{ role: "system", content: 'Give me a JSON string containg an object of this format: '
                        + '{"complexity": 4,"math": 3,"sorting": 5,"dynamic_programming": 2, "graphs": 4, "trees": 3, "ranges": 1, "geometry": 3, "ai": 3, "statistics": 3} '
                        + "But replace the numbers with your ratings from 1 to 100 by evaluating how much the following code belongs to the respective category. Here is the code:\n"
                        + code }],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0]);
    });
}
// main();
characterize('#include <iostream>\nusing namespace std;\nint main(){\n  cout<<"Hello world!";//This prints the message "Hello World!"\n   return 0;\n}');
