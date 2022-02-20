import React from 'react'

export default function Notification({ log }) {
	let classType 
	if (log === null || log === undefined) {
	  return null
	} else if (log.style === 'error') {
	  classType = 'error'
	} else {
	  classType = 'success'
	}
	return (
	  <div className={classType}>
		{log.message}
	  </div>
	)
  }