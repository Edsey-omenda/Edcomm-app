import { theme } from 'twin.macro'
const twColor: Record<string, string> = theme`colors`

export type ColorList = {
    label: string
    value: string
    twColor: string
}

export const colorPalette = [
    { label: 'Green', value: twColor.green['500'], twColor: 'green' },
    { label: 'Lime', value: twColor.lime['500'], twColor: 'lime' },
    { label: 'Emerald', value: twColor.emerald['500'], twColor: 'emerald' },
    { label: 'Teal', value: twColor.teal['500'], twColor: 'teal' },
    { label: 'Cyan', value: twColor.cyan['500'], twColor: 'cyan' },
    { label: 'Sky', value: twColor.sky['500'], twColor: 'sky' },
    { label: 'Blue', value: twColor.blue['500'], twColor: 'blue' },
    { label: 'Indigo', value: twColor.indigo['500'], twColor: 'indigo' },
    { label: 'Purple', value: twColor.purple['500'], twColor: 'purple' },
    { label: 'Fuchsia', value: twColor.fuchsia['500'], twColor: 'fuchsia' },
    { label: 'Pink', value: twColor.pink['500'], twColor: 'pink' },
    { label: 'Rose', value: twColor.rose['500'], twColor: 'rose' },
    { label: 'Red', value: twColor.red['500'], twColor: 'red' },
    { label: 'Orange', value: twColor.orange['500'], twColor: 'orange' },
    { label: 'Amber', value: twColor.amber['500'], twColor: 'amber' },
    { label: 'Yellow', value: twColor.yellow['500'], twColor: 'yellow' },
    { label: 'Black', value: twColor.black, twColor: 'black' },
    { label: 'Gray', value: twColor.gray['500'], twColor: 'gray' },
    { label: 'White', value: twColor.white, twColor: 'white' },
]

export const getTailwindColorByHexCode = (value: string): string => {
    if (value == null) return 'blue'
    switch (value.toUpperCase()) {
        case '#EF4444':
            return 'red'
        case '#F97316':
            return 'orange'
        case '#F59E0B':
            return 'amber'
        case '#EAB308':
            return 'yellow'
        case '#84CC16':
            return 'lime'
        case '#22C55E':
            return 'green'
        case '#10B981':
            return 'emerald'
        case '#14B8A6':
            return 'teal'
        case '#06B6D4':
            return 'cyan'
        case '#0EA5E9':
            return 'sky'
        case '#3B82F6':
            return 'blue'
        case '#6366F1':
            return 'indigo'
        case '#A855F7':
            return 'purple'
        case '#D946EF':
            return 'fuchsia'
        case '#EC4899':
            return 'pink'
        case '#F43F5E':
            return 'rose'
        default:
            return 'blue'
    }
}
