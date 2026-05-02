import runGo from './go'
import testLesson from './lesson1.md' with {type: "text"}
import parseLesson from './lessonParser'

const lesson = parseLesson(testLesson)
document.body.innerHTML = JSON.stringify(lesson)
window.lesson = lesson



// document.write(runGo(`
//     package main
//     import "fmt"

//     func main() {
//         fmt.Println("Hey")
//         fmt.Println("Hey")
//         fmt.Println("Hey")
//     }
// `).output)