import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

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