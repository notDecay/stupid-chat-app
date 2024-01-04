import { Tag } from "@hope-ui/solid"

interface IPackageDataProps {
  name: string
  version: string
  link?: string
}

export default function Info(props: IPackageDataProps) {
  return (
    <div>
      {props.name} <Tag>v{props.version}</Tag>
    </div>
  )
}