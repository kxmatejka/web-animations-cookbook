import {FC, useEffect, useState, useRef, Children, cloneElement, ReactElement} from 'react';
import styled from 'styled-components'

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

const AnimatedImage: FC<{srcPath: string, onComplete?: () => void}> = ({srcPath, onComplete}) => {
  const [src, setSrc] = useState<string|undefined>()
  const imgRef = useRef<HTMLImageElement>()

  useEffect(() => {
    const image = new Image()
    image.src = srcPath

    image.onload = async () => {
      await wait(300)
      setSrc(image.src)

      const a = imgRef.current.animate([
        {
          scale: 0.95
        },
        {
          scale: 1.2
        },
        {
          scale: 1
        },
      ], 200)

      a.onfinish = () => onComplete()
    }
  }, [])

  return <img src={src} width='300' ref={imgRef} />
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  
  & > img {
    margin-bottom: 20px;
  }
`

const ImageLoader: FC = ({children}) => {
  const [allowedChildren, setAllowedChildren] = useState<number[]>([0])

  return (
    <>
      {Children.map(children, (child, index) => {
        return allowedChildren.includes(index)
          ? cloneElement(child as ReactElement, {
            onComplete: () => setAllowedChildren((ps) => [...ps, index + 1])
          })
          : null
      })}
    </>
  )
}

const ImagesColum: FC = () => {
  return (
    <Container>
      <ImageLoader>
        <AnimatedImage srcPath='/bear-1.jpg'/>
        <AnimatedImage srcPath='/bear-2.jpg'/>
        <AnimatedImage srcPath='/bear-3.jpg'/>
      </ImageLoader>
    </Container>
  )
}

export default {
  title: 'Images/Column',
  component: ImagesColum,
}

export const ImagesColumStory = ImagesColum.bind({})
