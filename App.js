import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import Button from './src/component/button';
import Display from './src/component/display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {
  state = { ...initialState }
  adicionarDigito = (n) => {
    let clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }
    let currentValue = clearDisplay ? '' : this.state.displayValue;
    let displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') {
      let newValue = parseFloat(displayValue)
      let values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({ values })
    }

  }

  clearMemory = () => {
    this.setState({ ...initialState });
  }


  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operacao: operation, current: 1, clearDisplay: true })
    } else {
      const values = [...this.state.values];
      const operacao = this.state.operacao;
      if (operation === '+') {
        values[0] = values[0] + values[1];
      } else if (operation === '-') {
        values[0] = this.state.values[0] - this.state.values[1];
      } else if (operation === '*') {
        values[0] = this.state.values[0] * this.state.values[1];
      } else if (operation === '/') {
        values[0] = this.state.values[0] / this.state.values[1];
      } else {
        if (values[0] && operacao && values[1]) {
          values[0] = eval(`${values[0]} ${operacao} ${values[1]}`);
        } else {
          values[0] = this.state.values[0];
        }
      }
      values[1] = 0
      if (operation !== '=') {
        this.setState({
          displayValue: `${values[0]}`,
          operation: operation,
          current: 1,
          clearDisplay: true,
          values
        })
      } else {
        this.setState({
          displayValue: `${values[0]}`,
          operation: null,
          current: 0,
          clearDisplay: false,
          values
        })
      }
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <SafeAreaView style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory}></Button>
          <Button label="/" operation onClick={this.setOperation}></Button>
          <Button label="7" onClick={this.adicionarDigito}></Button>
          <Button label="8" onClick={this.adicionarDigito}></Button>
          <Button label="9" onClick={this.adicionarDigito}></Button>
          <Button label="*" operation onClick={this.setOperation}></Button>
          <Button label="4" onClick={this.adicionarDigito}></Button>
          <Button label="5" onClick={this.adicionarDigito}></Button>
          <Button label="6" onClick={this.adicionarDigito}></Button>
          <Button label="-" operation onClick={this.setOperation}></Button>
          <Button label="1" onClick={this.adicionarDigito}></Button>
          <Button label="2" onClick={this.adicionarDigito}></Button>
          <Button label="3" onClick={this.adicionarDigito}></Button>
          <Button label="+" operation onClick={this.setOperation}></Button>
          <Button label="0" double onClick={this.adicionarDigito}></Button>
          <Button label="." onClick={this.adicionarDigito}></Button>
          <Button label="=" operation onClick={this.setOperation}></Button>
        </SafeAreaView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
