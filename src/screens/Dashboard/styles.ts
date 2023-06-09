import { FlatList } from 'react-native';
import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';
import { DataListProps } from ".";

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  
  background-color: ${({theme}) => theme.COLORS.PRIMARY};
  
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`
export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${RFValue(44)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`

export const User = styled.View`
  margin-left: 17px;
`

export const UserGreeting = styled.Text`
  color: ${({theme}) => theme.COLORS.SHAPE};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.FONTS.REGULAR};
  `

export const UserName = styled.Text`
  color: ${({theme}) => theme.COLORS.SHAPE};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.FONTS.BOLD};
`

export const LogoutButton = styled.TouchableOpacity`

`

export const Icon = styled(Feather)`
  color: ${({theme}) => theme.COLORS.SECONDARY};
  font-size: ${RFValue(24)}px;  
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingLeft: 24}
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.FONTS.REGULAR};
  margin-bottom: 16px;
`

export const TransactionList = styled(
  FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {paddingBottom: 24}
})``

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`