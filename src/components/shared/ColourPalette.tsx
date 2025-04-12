import Badge from '@/components/ui/Badge'
import classNames from 'classnames'
import type { ControlProps, OptionProps } from 'react-select'
import Select from '@/components/ui/Select'
import { HiCheck } from 'react-icons/hi'
import { components } from 'react-select'
import { FieldInputProps, FormikProps } from 'formik'
import { ColorList, colorPalette } from '@/constants/colors.constants'

export interface ColourPaletteProps {
    value: string | string[]
    field: FieldInputProps<any>
    form: FormikProps<any>
    placeholder?: string
    isMultiSelect?: boolean
    onChange: (value: string | string[]) => void
}

const { Control } = components

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<ColorList>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <ColorBadge themeColor={data.twColor} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-blue-600 text-xl" />}
        </div>
    )
}

const ColorBadge = ({
    className,
    themeColor,
}: {
    className?: string
    themeColor: string
}) => {
    return (
        <Badge
            className={className}
            innerClass={classNames(`bg-${themeColor}-500`)}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<ColorList>) => {
    const selected = props.getValue()[0]

    return (
        <Control {...props}>
            {selected && (
                <ColorBadge
                    themeColor={selected.twColor}
                    className="ltr:ml-4 rtl:mr-4"
                />
            )}
            {children}
        </Control>
    )
}

const ColourPalette = ({
    value,
    placeholder,
    field,
    form,
    onChange,
    isMultiSelect = false,
}: ColourPaletteProps & { isMultiSelect?: boolean }) => {
    const selectedOptions = isMultiSelect
        ? colorPalette.filter((c) => value.includes(c.value))
        : colorPalette.find((c) => c.value === value) || null

    return (
        <Select<ColorList, typeof isMultiSelect>
            placeholder={placeholder}
            field={field}
            form={form}
            isMulti={isMultiSelect}
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            options={colorPalette}
            value={selectedOptions}
            onChange={(option) => {
                if (isMultiSelect) {
                    const values = (option as ColorList[]).map((c) => c.value)
                    onChange(values)
                } else {
                    onChange((option as ColorList).value)
                }
            }}
        />
    )
}
export default ColourPalette

// const ColourPalette = ({
//     value,
//     placeholder,
//     field,
//     form,
//     onChange,
// }: ColourPaletteProps) => {

//     return (
//         <Select<ColorList>
//             placeholder={placeholder}
//             field={field}
//             form={form}
//             components={{
//                 Option: CustomSelectOption,
//                 Control: CustomControl,
//             }}
//             options={colorPalette}
//             value={colorPalette.filter((c) => c.value === value)}
//             onChange={(c) => onChange(c!.value)}
//         />
//     )
// }

// export default ColourPalette
