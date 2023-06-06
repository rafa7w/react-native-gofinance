import { useState } from 'react';
import { Modal, StatusBar } from 'react-native';
import { Container, Header, Title, Form, Fields, TransactionsType } from "./styles";
import { useForm } from 'react-hook-form';

import { InputForm } from '@components/Forms/InputForm';
import { Button } from "@components/Forms/Button";
import { TransactionTypeButton } from "@components/Forms/TransactionTypeButton";
import { CategorySelectButton } from '@components/Forms/CategorySelectButton';

import { CategorySelect } from '@screens/CategorySelect';

type FormData = {
  name: string;
  amount: string;
}

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {control, handleSubmit} = useForm()

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data)
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='#5636D3'
        translucent
      />
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name='name'
            control={control}
            placeholder="Nome"
          />
          <InputForm
            name='amount'
            control={control}
            placeholder="Preço"
          />
          <TransactionsType>
            <TransactionTypeButton 
              type="up"
              title="Income"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton 
              type="down"
              title="Outcome"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsType>

          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button 
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}