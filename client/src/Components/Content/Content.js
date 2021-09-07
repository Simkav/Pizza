import React from 'react'
import cl from './Content.module.css'
import { useSelector } from 'react-redux'

export default function Content (props) {
  const hamburgerMenuState = useSelector(state => state)
  let mainContentContainerClasses
  if (props.header_aside_disabled) {
    mainContentContainerClasses = [cl.content_container, cl.content_fullscreen]
  } else {
    mainContentContainerClasses = [cl.content_container]
  }

  if (hamburgerMenuState) {
    mainContentContainerClasses.push(cl.content_with_aside)
  }
  return (
    <div className={mainContentContainerClasses.join(' ')}>
      {props.children}
    </div>
  )
}
