import { VisualizerOption } from "./VisualizerOptions";

interface VisualizationMode {
    name: string
    options: VisualizerOption[]
}

const OPTIONS : VisualizationMode[] = [
    {
        name: "2D",
        options: [
            {
                name: "Face",
                slug: "face"
            },
            {
                name: "Front",
                slug: "front"
            },
            {
                name: "Front Full",
                slug: "frontfull"
            }
        ]
    },
    {
        name: "3D",
        options: [
            {
                name: "Head",
                slug: "head"
            },
            {
                name: "Bust",
                slug: "bust"
            },
            {
                name: "Full",
                slug: "full"
            }
        ]
    },
    {
        name: "Skin",
        options: [
            {
                name: "Raw Skin",
                slug: "skin"
            },
            {
                name: "Processed Skin",
                slug: "processedskin"
            },
        ]
    }
]

export default OPTIONS;