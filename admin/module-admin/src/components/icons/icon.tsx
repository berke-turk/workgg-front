import Image from 'next/image'

interface IconI {
  id: string,
  mime?: string,
  alt?: string,
  width?: number,
  height?: number,
}

export default function Icon(iconI: IconI) {
  return <Image src={`/icons/${iconI.id}${iconI.mime ? ('.' + iconI.mime) : ''}`}
    alt={iconI.alt ? iconI.alt : ''}
    width={iconI.width ? iconI.width : 64}
    height={iconI.height ? iconI.height : 64}
  />
}