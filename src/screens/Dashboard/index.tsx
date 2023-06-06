import { useCallback, useEffect, useState } from "react";
import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title, TransactionList, LogoutButton } from "./styles";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from "@components/Loading/HighlightCard";
import { TransactionCard, TransactionCardProps } from "@components/TransactionCard";


export type DataListProps = TransactionCardProps & {
  id: string;
}

type HighlightProps = {
  amount: string;
}

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)

    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount)
      } else {
        expensiveTotal += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }

    })

    setTransactions(transactionsFormatted)

    const total = entriesTotal - expensiveTotal
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
  }

  useEffect(() => { 
    loadTransactions()

    // const dataKey = '@gofinances:transactions'
    // AsyncStorage.removeItem(dataKey)
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

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
          <LogoutButton onPress={() => {}}>
            <Icon name='power'/>
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          type="up" 
          title="Entradas" 
          amount={highlightData?.entries?.amount} 
          lastTransaction="Última entrada dia 13 de abril"/>
        <HighlightCard 
          type="down" 
          title="Saídas" 
          amount={highlightData?.expensives?.amount} 
          lastTransaction="Última saída dia 13 de abril"/>
        <HighlightCard 
          type="total" 
          title="Total" 
          amount={highlightData?.total?.amount} 
          lastTransaction="01 a 16 de abril"/>
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList 
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TransactionCard 
              data={item}
            />
          )}
        />
      </Transactions>
    </Container>
  )
}