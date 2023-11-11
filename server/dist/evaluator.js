"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
let path_isolate = '';
function init_eval_env(isolate_path) {
    path_isolate = isolate_path;
}
//evaluator problema
const path_to_eval_folder = "./eval/";
function default_evalret() {
    return {
        score: 0,
        compiler_err: '',
        compiler_stdout: '',
        compiler_exit_code: 0,
        tests: [],
    };
}
const cpp_eval = (problem, code) => {
    let res = default_evalret();
    let file = fs_1.default.createWriteStream(path_to_eval_folder + 'main.cpp');
    file.write(problem);
    file.end();
    // let gpp = child_process.spawn("g++", [path_to_eval_folder + "main.cpp", '-o', 'exec'], { timeout: 5 * 1000 })
    // gpp.stderr.on('data', (txt) => {
    //     res.compiler_err += txt
    // })
    // gpp.stdout.on('data', (txt) => {
    //     res.compiler_stdout += txt
    // })
    // gpp.on("exit", (code: Number, signal: String) => {
    //     res.compiler_exit_code = code
    // })
    let gpp = child_process_1.default.spawnSync('g++', [path_to_eval_folder + "main.cpp", '-o', path_to_eval_folder + 'exec'], {
        timeout: 5 * 1000
    });
    if (gpp.status != null)
        res.compiler_exit_code = gpp.status;
    else
        res.compiler_exit_code = 9999999;
    res.compiler_stdout = " " + gpp.stdout + '\n' + gpp.stderr;
    return res;
};
const eval_exec = (executeable, b) => {
};
const max_box_number = 10;
let c_box_id_counter = 0;
const init_box = (memory) => {
    c_box_id_counter %= max_box_number;
    let isolate = child_process_1.default.spawnSync(path_isolate.toString(), ["--cfg", '--box-id=' + c_box_id_counter, '--init']);
    if (isolate.output.toString().startsWith('Box already exists')) {
        console.log("INFO: resseting box " + c_box_id_counter);
        isolate = child_process_1.default.spawnSync(path_isolate.toString(), ["--cfg", '--box-id=' + c_box_id_counter, '--cleanup']);
        return init_box(memory);
    }
    return { id: c_box_id_counter++, log: '', memory: memory, path: isolate.output.toString().trim() };
};
