import * as React from "react";

interface Props {
  title: string;
}

export default function Button(props: Props) {
  const { title, ...restProps } = props;
  return <button {...restProps}>{title}</button>;
}
