import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import Button from '../components/Button'
import Display from '../components/Display'

type State = {
  displayValue: string
  clearDisplay: boolean
  operation: null | string
  values: number[]
  current: number
}

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default function HomeScreen() {
  const [state, setState] = useState<State>(initialState)

  function addDigit(n: any) {
    if (n === '.' && state.displayValue.includes('.')) {
      return
    }

    const clearDisplay = state.displayValue === '0'
      || state.clearDisplay
    const currentValue = clearDisplay ? '' : state.displayValue
    const displayValue = currentValue + n
    setState(state => ({ ...state, displayValue, clearDisplay: false }))

    if (n !== '.') {
      const i = state.current
      const newValue = parseFloat(displayValue)
      const values = [...state.values]
      values[i] = newValue
      setState(state => ({ ...state, values }))
      console.log(values)
    }
  }

  function clearMemory() {
    setState({ ...initialState })
  }

  function setOperation(operation: any) {
    if (state.current === 0) {
      setState(state => ({ ...state, operation, current: 1, clearDisplay: true }))
    } else {
      const equals = operation === '='
      const currentOperation = state.operation

      const values = [...state.values]
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
      } catch (e) {
        values[0] = state.values[0]
      }

      values[1] = 0

      setState(state => ({
        ...state,
        displayValue: String(values[0]),
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      }))
    }
  }

  return (
    <View style={styles.container}>
      <Display value={state.displayValue} />
      <View style={styles.buttons}>
        <Button label='AC' triple click={clearMemory} />
        <Button label='/' operation click={setOperation} />
        <Button label='7' click={addDigit} />
        <Button label='8' click={addDigit} />
        <Button label='9' click={addDigit} />
        <Button label='*' operation click={setOperation} />
        <Button label='4' click={addDigit} />
        <Button label='5' click={addDigit} />
        <Button label='6' click={addDigit} />
        <Button label='-' operation click={setOperation} />
        <Button label='1' click={addDigit} />
        <Button label='2' click={addDigit} />
        <Button label='3' click={addDigit} />
        <Button label='+' operation click={setOperation} />
        <Button label='0' double click={addDigit} />
        <Button label='.' click={addDigit} />
        <Button label='=' operation click={setOperation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
