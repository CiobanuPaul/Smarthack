"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function Home() {
    const [win, setWin] = (0, react_1.useState)('Home');
    if (win === 'Home') {
        return (<>
            <button onClick={() => setWin('Jobs')}>Search Jobs</button>
            </>);
    }
    else {
        return (<>
            <button onClick={() => setWin('Home')}>Go Back Home</button>
            </>);
    }
}
exports.default = Home;
