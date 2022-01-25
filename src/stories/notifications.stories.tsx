import {useRef, useEffect, useState, FC} from 'react'
import styled from 'styled-components'

const RANDOM_WORDS = [
  'sunt duis',
  'ut laborum ut et',
  'proident voluptate',
  'quis cillum',
  'et magna',
  'est irure',
  'sit duis sint',
  'enim et aliqua',
]

const randomInRange = (min: number, max: number) => Math.round(Math.random() * (max - min) + min)

const randomWord = () => RANDOM_WORDS[randomInRange(0, RANDOM_WORDS.length - 1)]

const animate = (elementRef: HTMLElement, keyframes: Keyframe[], duration: number) => {
  return new Promise<void>((resolve) => {
    const animation = elementRef.animate(keyframes, duration)

    animation.onfinish = () => resolve()
  })
}

const Notification: FC<{text: string, onClose}> = ({text, onClose}) => {
  const listRef = useRef<HTMLDivElement>()
  const hrRef = useRef<HTMLHRElement>()

  useEffect(() => {
    (async () => {
      await animate(listRef.current, [{ opacity: '100%' }], 250)
      listRef.current.style.opacity = '100%'

      await animate(hrRef.current, [{ width: '100%'}], 2000)
      hrRef.current.style.width = '100%'

      await animate(listRef.current, [{ opacity: 0}], 250)
      onClose()
    })()
  }, [])

  return (
    <StyledListItem ref={listRef}>
      {text}
      <StyledHr ref={hrRef}/>
    </StyledListItem>
  )
}

const Notifications = () => {
  const [events, setEvents] = useState([])

  const addEvent = () => setEvents((events) => [...events, {id: Math.random(), text: randomWord()}])
  const removeEvent = (id) => () => setEvents((events) => events.filter((event) => event.id !== id))

  return (
    <>
      <StyledButton onClick={addEvent}>Add Event</StyledButton>
      <StyledList>
        {events.map((event) => <Notification key={event.id} text={event.text} onClose={removeEvent(event.id)}/>)}
      </StyledList>
    </>
  )
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  padding: 0;
  margin: 0;
  width: 200px;
  position: absolute;
  right: 0;
  bottom: 0;
`

const StyledListItem = styled.li`
  opacity: 0;
  color: #fff;
  background: #40b7d7;
  padding: 10px 20px 10px 20px;
  position: relative;
  flex-grow: 1;
  margin-bottom: 10px;
`

const StyledHr = styled.hr`
  display: block;
  position: absolute;
  width: 0;
  height: 5px;
  background: #282c34;
  bottom: 0;
  left: 0;
  margin: 0;
  border: 0;
`

const StyledButton = styled.button`
  color: #fff;
  background: #61dafb;
  border: 0;
  padding: 5px 10px;
  margin-bottom: 30px;
  border-radius: 5px;
  cursor: pointer;

  &:active {
    background: #42b0ce;
  }
`

export default {
  title: 'Notifications',
  component: Notifications,
}

export const NotificationsStory = Notifications.bind({})
