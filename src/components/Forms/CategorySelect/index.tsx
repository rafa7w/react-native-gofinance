import { Container, Category, Icon } from "./styles";

type Props = {
  title: string;
}

export function CategorySelect({title}: Props) {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name='chevron-down'/>

    </Container>
  )
}