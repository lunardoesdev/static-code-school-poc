import runGo from './go'
import testLesson from './lesson1.md' with {type: "text"}
import parseLesson from './lessonParser'

import * as monaco from 'monaco-editor'
import markdownit from 'markdown-it'
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
})

const lesson = parseLesson(testLesson)

window.lesson = lesson


const editor = monaco.editor.create(document.getElementById("editor")!, {
    value: lesson.template,
    language: "go",
    theme: "vs-dark",
    minimap: { enabled: false },
    automaticLayout: true,
})

function runTest(test: {stdin: string, wantedStdout: string}): {ok: boolean, error?: string, output?: string} {
    const code = lesson.harness.replace("@@@studentcode", editor.getValue())
    
    let result = runGo(code, test.stdin)
    return result
}

function updateTestResults() {
    let testDesc = ""
    for (const test of lesson.tests) {
        const result = runTest(test)
        testDesc += `
    Input: 
    ${test.stdin} 
    Expected output: 
    ${test.wantedStdout} Your output: 
    ${result.output} Success: ${result.output === test.wantedStdout}
    `
    }

    document.getElementById("testDescription")!.innerText = testDesc
}

document.getElementById("checkButton")!.onclick = updateTestResults
updateTestResults()

const tutorial = md.render(testLesson.split("\n##")[0])
document.getElementById("tutorial")!.innerHTML = tutorial

// document.write(runGo(`
//     package main
//     import "fmt"

//     func main() {
//         fmt.Println("Hey")
//         fmt.Println("Hey")
//         fmt.Println("Hey")
//     }
// `).output)