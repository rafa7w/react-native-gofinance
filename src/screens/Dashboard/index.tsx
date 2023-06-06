import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards, Transactions, Title, TransactionList, LogoutButton, LoadContainer } from "./styles";

import { useTheme } from "styled-components/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from "@components/Loading/HighlightCard";
import { TransactionCard, TransactionCardProps } from "@components/TransactionCard";


export type DataListProps = TransactionCardProps & {
  id: string;
}

type HighlightProps = {
  amount: string;
  lastTransaction: string;
}

type HighlightData = {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const { COLORS } = useTheme()

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    const lastTransactions = new Date(
      Math.max.apply(Math, collection
        .filter((transaction) => transaction.type === type)
        .map((transaction) => new Date(transaction.date).getTime()))
    )

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {
      month: 'long'
    })}`
  }

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

    const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 a ${lastTransactionsExpensives}`

    const total = entriesTotal - expensiveTotal
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionsExpensives}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
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
      {
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            color={COLORS.PRIMARY}
            size='large'
          />
        </LoadContainer> :
        <>
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
              lastTransaction={highlightData.entries.lastTransaction}/>
            <HighlightCard 
              type="down" 
              title="Saídas" 
              amount={highlightData?.expensives?.amount} 
              lastTransaction={highlightData.expensives.lastTransaction}/>
            <HighlightCard 
              type="total" 
              title="Total" 
              amount={highlightData?.total?.amount} 
              lastTransaction={highlightData.total.lastTransaction}/>
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
        </>
      }
    </Container>
  )
}