import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.SECONDARY};
  
  padding: 18px;
  border-radius: 5px;
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.COLORS.SHAPE};
`