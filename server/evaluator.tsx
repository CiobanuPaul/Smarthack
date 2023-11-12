import child_process, { ChildProcess } from "child_process"
import dotenv from 'dotenv'
import { env } from "process"
import fs, { read } from "fs"
import { TIMEOUT } from "dns"
import { Stream } from "stream"
import { getPriority } from "os"
import { todo } from "node:test"

dotenv.config()

const path_isolate = '/usr/local/etc/isolate_bin'//process.env.isolate_path
//evaluator problema
const path_to_eval_folder = "./eval/"

type evalret = {
    compiler_err: String
    compiler_stdout: String
    compiler_exit_code: Number
    tests: Number[]
}

function default_evalret(): evalret {
    return {
        compiler_err: '',
        compiler_stdout: '',
        compiler_exit_code: 0,
        tests: [],
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


const cpp_eval = async(problem_id: Number, code: string): Promise<evalret> => {
    let res = default_evalret()
    let file = fs.createWriteStream(path_to_eval_folder + 'main.cpp')//racecondition
    file.write(code);
    file.end()
    await delay(100)
    let restrict = parse_grader(fs.readFileSync("./probleme/id_" + problem_id + '/grader.properties').toString())
    let gpp = child_process.spawnSync('g++', [path_to_eval_folder + "main.cpp", '-o', path_to_eval_folder + 'exec'], {
        timeout: 5 * 1000
    })
    if (gpp.status != null) {
        res.compiler_exit_code = gpp.status
        console.log(gpp.stderr.toString())
        if (gpp.status != 0)
            return res;
    }
    else {
        res.compiler_exit_code = 9999999
        return res;
    }

    res.compiler_stdout = " " + gpp.stdout + '\n' + gpp.stderr
    let cbx = init_box(restrict.memory)
    try {
        console.log("mesaj " + cbx.path)
        fs.copyFileSync(path_to_eval_folder + 'exec', cbx.path + '/exec')
        for (let i of fs.readFileSync("./probleme/id_" + problem_id + '/tests.txt').toString().trim().split('\n')) {
            let elm = i.split(' ');
            fs.copyFileSync("./probleme/id_" + problem_id + '/tests/' + elm[0] + '.in', cbx.path + '/in')
            console.log(child_process.spawnSync(path_isolate.toString(), ['exec', '--box-id=' + cbx.id, '--run', '-m', restrict.memory.toString(), '-t', restrict.time.toString(), '--stdin=in', `--stdout=out`]).stderr.toString())
            res.tests.push(eval_exec(fs.readFileSync(cbx.path + '/out').toString(), fs.readFileSync("./probleme/id_" + problem_id + '/tests/' + elm[0] + '.ok'.toString()).toString(), Number(elm[1])))
        }
    }
    catch (err) {
        delete_box(cbx)
        throw err
    }
    delete_box(cbx)
    return res;
}

const eval_exec = (input: String, output: String, fr: Number): Number => {
    return (input.trim() == output.trim()) ? fr : 0;
}

type box = {
    id: Number,
    log: String,
    memory: Number
    path: String
}

const max_box_number = 1
let c_box_id_counter = 0

const init_box = (memory: Number): box => {//TODO: more error handeling 
    c_box_id_counter %= max_box_number
    let isolate = child_process.spawnSync(path_isolate.toString(), ['--box-id=' + c_box_id_counter, '--init'])
    if (isolate.stdout != null && isolate.stdout.toString().startsWith('Box already exists')) {
        console.log("INFO: resseting box " + c_box_id_counter);
        isolate = child_process.spawnSync(path_isolate.toString(), ['--box-id=' + c_box_id_counter, '--cleanup'])
        return init_box(memory)
    }
    return { id: c_box_id_counter++, log: '', memory: memory, path: isolate.stdout.toString().trim()+'/box' }
}

const delete_box = (b: box) => {
    child_process.spawnSync(path_isolate.toString(), ['--box-id=' + b.id, '--cleanup'])
}

type restrictions = {
    time: Number
    memory: Number
}

const parse_grader = (str: String): restrictions => {
    let res = { time: 0, memory: 0 }
    for (let i in str.split('\n')) {
        let tok = i.split('=')
        if (tok[0] == 'time')
            res.time = Number(tok[1])
        else if (tok[0] == 'memory')
            res.memory = Number(tok[1])
    }
    return res
}

//cpp_eval(10, '/* Stud. Bucă Mihnea-Vicențiu \n   Facultatea de Matematică și Informatică \n   O(nlogV_MAX) \n*/\n  \n#include <bits/stdc++.h> \n  \nusing namespace std; \n#define fin cin\n#define fout cout  \n//ifstream fin(\"pietricele.in\"); \n//fstream fout(\"pietricele.out\"); \n\nint cost[30];\nint c, n, k; \n\nchar s[200005];  \n  \nint main() { \n    fin >> c >> n >> k; \n    fin >> s; \n    for (int i = 0; i < 26; ++i) \n        fin >> cost[i]; \n  \n    /* cerinta 1 */\n    if (c == 1) { \n        assert(c == 1); \n        assert(1 <= n and n <= 200000); \n        assert(1 <= k and k <= n); \n        long long sol = 0, sum = 0; \n        k = n - k + 1; \n        for (int i = 0; i < n; ++i) { \n            sum += cost[s[i] - \'a\']; \n            if (i >= k) sum -= cost[s[i - k] - \'a\']; \n            sol = std::max(sol, sum); \n        } \n        fout << sol; \n        return 0; \n    } \n  \n    assert(c == 2); \n    assert(1 <= n and n <= 200000); \n    assert(1 <= k and k <= n); \n  \n    /* cerinta 2 */\n    long long st = 1, dr = 1e18, sol = -1; \n    while(st <= dr){ \n        long long mij = (st + dr) / 2, sum = 0, ct = 0; \n        for (int i = 0; i < n; i++) { \n            sum += cost[s[i] - \'a\']; \n            if (sum >= mij) { \n                ++ct; \n                sum = 0; \n            } \n        } \n        if (ct >= k) { \n            sol = mij; \n            st = mij + 1; \n        } else { \n            dr = mij - 1; \n        } \n    } \n    fout << sol; \n}').then((v)=>{console.log(v)})
