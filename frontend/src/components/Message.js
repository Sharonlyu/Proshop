import React from 'react'
import { Alert } from 'react-bootstrap'
//children: text inside 
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',//blue color
}

export default Message