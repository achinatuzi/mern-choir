import { useState } from 'react'
import { Button } from 'react-bootstrap';

interface ChildrenProps {
  children: any;
  maxChats: number;
}

const Expandable = ({children, maxChats=200}: ChildrenProps) => {

    const [expanded, setExpanded] = useState(true)

    if (children?.length <= maxChats) return <p>{children}</p>
    const text = expanded ? children?.substring(0, maxChats) : children
  return (
    <>
      <p>{text} ... </p>
      <Button className='mb-5' onClick={() => setExpanded(!expanded)}>{expanded ? 'Read more' : 'Read less'}</Button>
    </>
  );
}

export default Expandable