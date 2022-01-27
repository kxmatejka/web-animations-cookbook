import {FC, useEffect, useState, useRef, Children, cloneElement} from 'react'
import styled from 'styled-components'

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

const AnimatedImage: FC<{srcPath: string, onComplete: () => void}> = ({srcPath, onComplete}) => {
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

const ImageLoader: FC<{allowedChildren: number[]}> = ({allowedChildren, children}) => {
  return (
    <>
      {Children.map(children, (child, index) => {
        console.log({allowedChildren, index, cond: allowedChildren.includes(index)})
        return allowedChildren.includes(index) ? child : null
      })}
    </>
  )
}

const ImagesColum: FC = () => {
  const [allowedChildren, setAllowedChildren] = useState<number[]>([0])

  return (
    <Container>
      <ImageLoader allowedChildren={allowedChildren}>
        <AnimatedImage
          srcPath='/bear-1.jpg'
          onComplete={() => setAllowedChildren((ps) => [...ps, 1])}
        />
        <AnimatedImage
          srcPath='/bear-2.jpg'
          onComplete={() => setAllowedChildren((ps) => [...ps, 2])}
        />
        <AnimatedImage
          srcPath='/bear-3.jpg'
          onComplete={() => setAllowedChildren((ps) => ps)}
        />
      </ImageLoader>
    </Container>
  )
}

export default {
  title: 'Images/Column',
  component: ImagesColum,
}

export const ImagesColumStory = ImagesColum.bind({})
