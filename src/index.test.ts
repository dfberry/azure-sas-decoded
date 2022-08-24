import { allowedNodeEnvironmentFlags } from "process";
import ALL from "./index";

describe ('index', () =>{
    test('import succeeds', () =>{
        ALL();
    })
})