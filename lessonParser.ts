import runGo from './go'
import { markdown } from 'very-small-parser'

type Section = {
    title: string;
    children: any[];
    codeBlocks: { lang: string, code: string }[];
}

function extractText(node: any) {
    if (typeof node.value === "string") return node.value
    if (Array.isArray(node.children)) {
        return node.children.map(extractText).join("")
    }
    return ""
}


function parseSections(raw: string, depth = 2): Section[] {
    const tree = markdown.block.parse(raw)
    const sections: Section[] = [
        { title: "", children: [], codeBlocks: [] }
    ]

    for (const node of tree) {
        if (node.type ==='heading') {
            const title = extractText(node).trim()
            sections.push({ title, children: [], codeBlocks: [] })
            continue
        }

        const current = sections[sections.length - 1]
        current?.children.push(node)
        if (node.type === "code") {
            current?.codeBlocks.push({
                lang: (node.lang ?? "").trim(),
                code: node.value
            })
        }
    }

    return sections
}

type Lesson = {
    title: string;
    tutorial: string;
    task: string;
    template: string;
    tests: {stdin: string, wantedStdout: string}[]
}

export default function parseLesson(raw: string): Lesson {
    const sections = parseSections(raw)

    var tests: {stdin: string, wantedStdout: string}[] = []

    sections[5]?.codeBlocks.map(
        cb => {
            const s = cb.code.split("\n@@@\n")
            
            tests.push({stdin: s[0]!, wantedStdout: s[1]! + "\n"})
        }
    )

    const lesson: Lesson = {
        title: sections[1]?.title!,
        tutorial: extractText(sections[1]),
        task: extractText(sections[2]),
        template: extractText(sections[3]),
        tests: tests
    }

    return lesson
}