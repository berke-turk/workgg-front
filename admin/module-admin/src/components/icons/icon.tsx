import Image from 'next/image'

interface IconI {
  id: string,
  className?: string,
  style?: React.CSSProperties,
  mime?: string,
  alt?: string,
  width?: number,
  height?: number,
}

export default function Icon(icon: IconI) {
  return <Image src={`/icons/${icon.id}${icon.mime ? ('.' + icon.mime) : ''}`}
    alt={icon.alt ? icon.alt : ''}
    width={icon.width ? icon.width : 64}
    height={icon.height ? icon.height : 64}
    style={icon.style}
    className={icon.className}
  />
}