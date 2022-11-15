import styled from "@emotion/styled"

type ImportantWordProps = {
  color?: string;
};


export const ImportantWord = styled.b<ImportantWordProps>`
  font-family: "Life Savers";
  font-weight: 900;
  color: ${(props) => props.color ? props.color : "var(--white)"};
`

export const emphasizeWords = (text: string, color?: string | Array<string>) => {
  let indexColor = 0
  const splittedText = text.split(/(\*\*[^*]+\*\*)/)

  console.log("splittedText",splittedText);


  const formattedText = splittedText.map((e, i) => {
    const boldWord = e.match(/(?<=\*\*)[^*]+(?=\*\*)/)
    let chosenColor

    if (color) {
      if (typeof color === "string") {
        chosenColor = color
      } else {
        chosenColor = color[indexColor]
      }
    }

    if (boldWord && boldWord.length !== 0) {
      indexColor += 1

      return (
        <ImportantWord
          key={i}
          color={chosenColor}
        >
          {boldWord[0]}
        </ImportantWord>
      )
    }

    return e
  })

  return formattedText
}
