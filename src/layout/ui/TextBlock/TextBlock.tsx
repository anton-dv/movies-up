import { FC, useEffect, useLayoutEffect, useState } from "react";

import classes from "./text-block.module.scss";

export type TextBlockProps = {
  text?: string;
  padding?: boolean;
  id: string;
};

export const TextBlock: FC<TextBlockProps> = ({ text, padding, id }) => {
  const [content, setContent] = useState("");
  const [height, setHeight] = useState({ block: 0, measure: 0 });

  const textBlockId = `text_block-${id}`;
  const measureBlockId = `${textBlockId}-measure`;

  const setTextHeight = () => {
    const measureBlock = document.getElementById(measureBlockId);
    const textBlock = document.getElementById(textBlockId);
    const measure = measureBlock?.getBoundingClientRect().height;
    const block = textBlock?.getBoundingClientRect().height;

    if (measure && block) setHeight({ measure, block });
  };

  useEffect(() => {
    setTextHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useLayoutEffect(() => {
    window.addEventListener("resize", setTextHeight);
    setTextHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTextContent = () => {
    if (text === "" || !text) return;
    if (height.measure < height.block) return setContent(text);

    const ratio = height.block / height.measure - 0.02;
    const endOfText = Math.floor(text.length * ratio);
    const indexOfEnd = text.lastIndexOf(" ", endOfText);

    setContent(`${text.slice(0, indexOfEnd + 1)}...`);
  };

  useEffect(() => {
    setTextContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

  return (
    <>
      <div
        id={textBlockId}
        className={`${classes["text-block"]} ${padding ? classes["text-block--padding"] : ""}`}
      >
        <p id={measureBlockId} className={classes["text-block__measure"]}>
          {text}
        </p>
        <p>{content}</p>
      </div>
    </>
  );
};
