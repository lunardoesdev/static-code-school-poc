import runGo from './go'
import testLesson from './lesson1.md' with {type: "text"}
import parseLesson from './lessonParser'

import * as monaco from 'monaco-editor'

const lesson = parseLesson(testLesson)

window.lesson = lesson


const editor = monaco.editor.create(document.getElementById("editor")!, {
    value: lesson.template,
    language: "go",
    theme: "vs-dark",
    minimap: { enabled: false },
    automaticLayout: true,
})

// document.write(runGo(`
//     package main
//     import "fmt"

//     func main() {
//         fmt.Println("Hey")
//         fmt.Println("Hey")
//         fmt.Println("Hey")
//     }
// `).output)