import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title, TransactionsList } from "./styles";

import { HighlightCard } from "@components/Loading/HighlightCard";
import { TransactionCard } from "@components/TransactionCard";


export function Dashboard() {
  const data = [{
    title: "Desenvolvimento de sites",
    amount: "R$ 12.000,00",
    category: {
      name: 'Vendas',
      icon: 'dollar-sign'
    },
    date: "13/04/2020"
  }, {
    title: "Desenvolvimento de sites",
    amount: "R$ 12.000,00",
    category: {
      name: 'Vendas',
      icon: 'dollar-sign'
    },
    date: "13/04/2020"
  }]


  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://github.com/rafa7w.png'}}/>
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Rafael</UserName>
            </User>
          </UserInfo>
          <Icon name='power'/>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril"/>
        <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" lastTransaction="Última saída dia 13 de abril"/>
        <HighlightCard type="total" title="Total" amount="R$ 16.141,00" lastTransaction="01 a 16 de abril"/>
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList 
          data={data}
          renderItem={({item}) => (
            <TransactionCard 
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: }}
        />
      </Transactions>
    </Container>
  )
}