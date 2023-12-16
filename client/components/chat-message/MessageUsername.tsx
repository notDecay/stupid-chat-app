import { Flex, Heading, Tag } from "@hope-ui/solid"
import type { IUserMessageProps } from "./UserMessage"

export default function MessageUserName(props: IUserMessageProps) {
  const formatedDate = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    dayPeriod: "short"
  }).format(props.sendTime)

  return (
    <Flex fontSize="$xs" gap={15} alignItems="center" marginBottom={5}>
      <Heading size="sm">{props.user.name}</Heading>
      <Tag size="sm">{formatedDate}</Tag>
    </Flex>
  )
}