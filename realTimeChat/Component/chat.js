import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import io from 'socket.io-client'
export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      allChat: []
    }
  }

  componentDidMount() {
    this.socket = io('http://192.168.0.103:3000')
    this.socket.on("Chat Message", msg => {
      this.setState({ allChat: [...this.state.allChat, msg] })
    })
  }

  onSend = () => {
    this.socket.emit("Chat Message", this.state.msg);
    this.setState({ msg: '' })
  }

  render() {
    const { msg, allChat } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {
            allChat.map((eachMsg, index) => (
              <Text key={index} style={{ color: '#800080' }}>
                {eachMsg}
              </Text>
            ))
          }
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', padding: '2%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              value={msg}
              autoCorrect={false}
              style={styles.input}
              onChangeText={msg => { this.setState({ msg }) }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onSend()}
            >
              <Text style={{ color: '#fff' }}> Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 3
  },
  button: { width: '15%', backgroundColor: '#800080', height: 40 }
});
