import React, { ChangeEvent, FC, useRef, useState } from "react";

interface Person {
  firstName: string;
  lastName: string;
}

interface Props {
  title: string;
  ok: boolean;
  person: Person;
  fn: () => void;
}

interface TextNode {
  text: string;
}

const TextField: FC<Props> = ({ title, ok, person, fn }) => {
  const [count, setCount] = useState<TextNode>({ text: "JS" });
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setCount({ text: "Love" });
  };

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(inputRef.current?.value);
  };

  console.log(inputRef);

  return (
    <div ref={divRef}>
      {title} {ok && ` ${person.firstName} ${person.lastName} ------`}
      {fn()}
      <button onClick={handleClick}>{count.text}</button>
      <input type="text" ref={inputRef} onChange={handelChange} />
    </div>
  );
};

export default TextField;
