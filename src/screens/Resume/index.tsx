import { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, Month, Icon, LoadContainer } from "./styles";
import { useTheme } from 'styled-components/native';

import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from 'victory-native';

import { HistoryCard } from "@components/HistoryCard";
import { categories } from "@utils/categories";


type TransactionData = {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

type CategoryData = {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const { COLORS } = useTheme()

  function handleDateChange(action: 'next' | 'prev') {
    setIsLoading(true)

    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'negative' && 
    new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
    new Date(expensive.date).getFullYear() === selectedDate.getFullYear())  

    const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
      return acumullator + Number(expensive.amount)
    }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      // pegando apenas as categorias que de fato têm gasto
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [selectedDate])

  useFocusEffect(useCallback(() => {
    loadData()
  }, []))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator 
            color={COLORS.PRIMARY}
            size='large'
          />
        </LoadContainer> :
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <Icon name='chevron-left'/>
            </MonthSelectButton>

            <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <Icon name='chevron-right'/>
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: COLORS.SHAPE
                }
              }}
              labelRadius={50}
              x='percent'
              y='total'
            />
          </ChartContainer>
          {
            totalByCategories.map(item => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))
          }
        </Content>
      }

    </Container>
  )
}