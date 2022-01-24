import React, {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  
  padding: 0;
  margin: 0;
  
  width: 200px;
`

const StyledListItem = styled.li`
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
  width: 100%;

  height: 5px;
  background: #282c34;

  bottom: 0;
  left: 0;
  margin: 0;
  border: 0;
`

const Notification = ({onClose}) => {
  const ref = useRef()

  useEffect(() => {
    const animation = ref.current.animate([
      {
        width: '0%'
      },
      {
        width: '100%'
      }
    ], 1000)

    animation.onfinish = () => onClose()
  }, [])

  return (
    <StyledListItem>
      Lorem ipsum
      <StyledHr ref={ref}/>
    </StyledListItem>
  )
}

const Comp = () => {
  const [events, setEvents] = useState([])

  const addEvent = () => setEvents((events) => [...events, {id: Math.random()}])
  const removeEvent = (id) => () => setEvents((events) => events.filter((event) => event.id !== id))


  return (
    <div>
      <button onClick={addEvent}>Add Event</button>
      <br/>
      <br/>
      <StyledList>
        {events.map((event) => <Notification key={event.id} onClose={removeEvent(event.id)}/>)}
      </StyledList>
    </div>
  )
}

export default {
  title: 'Basics',
  component: Comp,
}

export const CompStory = Comp.bind({})
