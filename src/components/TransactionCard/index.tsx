import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from "./styles";

type Category = {
  name: string; 
  icon: string;
}

type Data = {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

type Props = {
  data: Data;
}

export function TransactionCard({data}: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount>{data.amount}</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign"/>
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}