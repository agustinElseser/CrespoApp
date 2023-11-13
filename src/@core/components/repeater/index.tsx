// ** Types
import { RepeaterProps } from './types'

const Repeater = (props: RepeaterProps) => {
  // ** Props
  const { count, tag, children } = props

  // ** Custom Tag
  const Tag = tag || 'div'

  // ** Default Items
  const items = []

  // ** Loop passed count times and push it in items Array 
  //Borre algo del core important
 

  return <Tag {...props}>{items}</Tag>
}

export default Repeater
