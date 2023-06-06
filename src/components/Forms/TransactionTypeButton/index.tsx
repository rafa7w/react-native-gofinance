import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from "./styles";

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

type Props = TouchableOpacityProps & {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export function TransactionTypeButton({type, title, isActive, ...rest}: Props) {
  return (
    <Container 
      type={type}
      isActive={isActive}
      {...rest} 
    >
      <Icon 
        name={icons[type]}
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  )
}