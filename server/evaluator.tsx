import child_process from "child_process"
import { env } from "process"
import fs from "fs"
import { TIMEOUT } from "dns"
import { Stream } from "stream"
import { getPriority } from "os"

//evaluator problema
const path_to_eval_folder = "./eval/"

type evalret = {
    score: Number
    compiler_err: String
    compiler_stdout: String
    compiler_exit_code: Number
    tests: []
}
function default_evalret(): evalret {
    return {
        score: 0,
        compiler_err: '',
        compiler_stdout: '',
        compiler_exit_code: 0,
        tests: [],
    }
}

const cpp_eval = (problem: string, code: string): evalret => {
    let file = fs.createWriteStream(path_to_eval_folder + 'main.cpp')
    file.write(problem);
    file.end()
    let gpp = child_process.spawn("g++", [path_to_eval_folder + "main.cpp", '-o', 'exec'], { timeout: 5 * 1000 })
    let res = default_evalret()
    gpp.stderr.on('data', (txt) => {
        res.compiler_err += txt
    })
    gpp.stdout.on('data', (txt) => {
        res.compiler_stdout += txt
    })
    gpp.on("exit", (code: Number, signal: String) => {
        res.compiler_exit_code = code
    })
    return res
}