import { allowedNodeEnvironmentFlags } from "process";
import decoder from "./index";

describe ('index', () =>{
    test('import succeeds', () =>{
        decoder();
    })
})