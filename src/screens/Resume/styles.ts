import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`

export const Header = styled.View`
  background-color: ${({theme}) => theme.COLORS.PRIMARY};

  width: 100%;
  height: ${RFValue(113)}px;
  
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  color: ${({theme}) => theme.COLORS.SHAPE};
  font-family: ${({theme}) => theme.FONTS.REGULAR};
  font-size: ${RFValue(18)}px;
`

export const Content = styled.ScrollView``

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`

export const MonthSelectButton = styled.TouchableOpacity``

export const Month = styled.Text`
  font-family: ${({theme}) => theme.FONTS.REGULAR};
  font-size: ${RFValue(20)}px;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`
export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`