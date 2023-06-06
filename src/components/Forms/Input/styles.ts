import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { TextInput } from "react-native";


export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.FONTS.REGULAR};
  color: ${({theme}) => theme.COLORS.TEXT_DARK};

  background-color: ${({theme}) => theme.COLORS.SHAPE};

  border-radius: 5px;
  margin-bottom: 8px;
`