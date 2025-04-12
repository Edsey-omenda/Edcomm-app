import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'
import LightLogo from '@/assets/logos/edcomm-logo-light.svg'
import DarkLogo from '@/assets/logos/edcomm-logo-dark.svg'

interface EDCommLogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}


const EDCommLogo = (props: EDCommLogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
    } = props

    const logoSrc = mode === 'dark' ? DarkLogo : LightLogo

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                className={imgClass}
                src={logoSrc}
                alt={"EDCOMM Logo"}
            />
        </div>
    )
}

export default EDCommLogo

