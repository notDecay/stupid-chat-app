import { 
  Box, 
  Flex, 
  Heading, 
  Tag 
} from "@hope-ui/solid"
import type { IUserMessageProps } from "."

export default function MessageDate(props: IUserMessageProps) {
  const {
    formatedDate,
    formatedDateButShorter,
    hours
  } = formatDate(props.sendTime)

  return (
    <>
      <Box class="date" color="$neutral11" marginRight={hours >= 10 ? 8 : 13}>
        {formatedDateButShorter}
      </Box>
      <Flex fontSize="$xs" gap={15} alignItems="center" marginBottom={5} class="username">
        <Heading size="sm">
          {props.user.name}
        </Heading>
        <Tag as={Flex} size="sm" alignItems="center" color="$neutral11" gap={15}>
          {formatedDate}
          <Box class="date-time date-moon" boxSize={12} />
        </Tag>
      </Flex>
    </>
  )
}

function formatDate(date: Date) {
  const formatedDate = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    dayPeriod: "short"
  }).format(new Date(date))

  const formatedDateButShorter = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date))

  const [hours] = formatedDateButShorter.split(":").map(it => parseInt(it))
  return { formatedDate, formatedDateButShorter, hours }
}