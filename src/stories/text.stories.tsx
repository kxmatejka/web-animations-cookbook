import {FC, useEffect, useRef} from 'react'
import styled from 'styled-components'

const lastElementOfArray = (array: any[]) => array[array.length - 1]

const firstValueOfObject = (object: any) => Object.values(object)[0]

const animate = (elementRef: HTMLElement, keyframes: Keyframe[], duration: number) => {
  return new Promise<void>((resolve) => {
    const animation = elementRef.animate(keyframes, duration)

    animation.onfinish = () => {
      const lastKeyFrame = lastElementOfArray(keyframes)
      elementRef.style.opacity = firstValueOfObject(lastKeyFrame) as string
      resolve()
    }
  })
}

const Container = styled.div`
  & > * {
    opacity: 0;
  }
`

const Text: FC = () => {
  const h1Ref = useRef<HTMLHeadingElement>()
  const h2Ref = useRef<HTMLHeadingElement>()
  const p1Ref = useRef<HTMLParagraphElement>()
  const p2Ref = useRef<HTMLParagraphElement>()

  useEffect(() => {
    (async () => {
      const duration = 500
      await animate(h1Ref.current, [{ opacity: '100%' }], duration)
      await animate(p1Ref.current, [{ opacity: '100%' }], duration)
      await animate(h2Ref.current, [{ opacity: '100%' }], duration)
      await animate(p2Ref.current, [{ opacity: '100%' }], duration)
    })()
  }, [])

  return (
    <Container>
      <h1 ref={h1Ref}>Heading</h1>
      <p ref={p1Ref}>text text text...</p>
      <h2 ref={h2Ref}>Sub heading</h2>
      <p ref={p2Ref}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </Container>
  )
}

export default {
  title: 'Text',
  component: Text,
}

export const TextStory = Text.bind({})
