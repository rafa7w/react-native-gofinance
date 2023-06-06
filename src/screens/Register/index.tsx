import { Button } from "@components/Forms/Button";
import { Container, Header, Title, Form, Fields } from "./styles";
import { Input } from "@components/Forms/Input";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder="Nome"
          />
          <Input 
            placeholder="Senha"
          />
        </Fields>
        <Button 
          title="Enviar"
        />
      </Form>

      
    </Container>
  )
}