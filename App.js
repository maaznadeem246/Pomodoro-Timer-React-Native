import React from 'react';
import { StyleSheet, Text, View, TextInput,Alert, TouchableOpacity, } from 'react-native';
import { vibrate } from './utils'
import KeyboardShift from './keyboardshif';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      statustime:'',
      switchStatus:true,
      contimer:true,
      text:'',
      wtm:25,
      wts:0,
      btm:5,
      bts:0,
      wm:0,
      ws:0,
      count:0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.stopTimmer = this.stopTimmer.bind(this)
    this.startTimmer = this.startTimmer.bind(this)
    this.timer = this.timer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.settm = this.settm.bind(this)
  }


stopTimmer(){
    this.setState({
      contimer:true
    })
    clearInterval(this.ji)
}

resetTimer(){

    this.settm()
}

startTimmer(){
    if(this.state.contimer){
      this.timer()
      this.setState({
        contimer:false
      })
    }
}

componentWillUnmount(){
  clearInterval(this.ji)
}

settm(){
    if (this.state.switchStatus) {
 //     console.log(this.state.wtm)
      this.setState({
        statustime: 'Work Time',
        wm: this.state.wtm,
        ws: this.state.wts,
      })
    } else {
      this.setState({
        statustime: 'Break Time',
        wm: this.state.btm,
        ws: this.state.bts,
      })

    }
}

componentDidMount(){
  this.settm()

}

timer(){
 
    this.ji = setInterval(() => {
      if(this.state.wm == 0 && this.state.ws ==0){
      
        this.setState({
          switchStatus:!this.state.switchStatus
        })
        vibrate()
        this.settm()
      }else{
        if (this.state.ws != 0) {

          this.setState({
            ws: this.state.ws - 1
          })

        } else {
          this.setState({
            wm: this.state.wm - 1,
            ws: 60
          })
        } 
      }


      


    }, 1000);
}

handleChange(event,name){
  const {eventCount,target,text}  = event.nativeEvent;
  
//  console.log(text)
//  console.log(name)
//  console.log(target)
//  console.log(eventCount)
 if(!isNaN(text)){
  this.setState({
    [name]:Number(text)
  },this.settm)
 }else{
   Alert.alert('Alert',
   "Only Numbers are Required",
     [{ text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
     { cancelable: false },
   )
 }
}


  render() {
    return (
      <KeyboardShift>
        {() => (
      <View style={styles.container}>
        <View style={{flex:2}}></View>
          <View style={{flex:5}}>
          <View>
            <Text style={styles.heading}>Pomodoro Timer</Text>
          </View>
          <View >
            <Text style={styles.statusStyle}>{this.state.statustime}</Text>
          </View>
            <View >
                <Text style={{ textAlign: 'center', fontSize: 30 }} >{this.state.wm.toString().length == 1 ? 0 + this.state.wm.toString() : this.state.wm.toString()}
                  : {this.state.ws.toString().length == 1 ? 0 + this.state.ws.toString() : this.state.ws.toString()}</Text>
            </View>
            <View style={{flex:1 , flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
              <TouchableOpacity onPress={this.startTimmer}>
                <View style={styles.button}>
                <Text style={styles.buttonText}>Start</Text>
                </View>
            </TouchableOpacity>
              <TouchableOpacity onPress={this.stopTimmer}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Stop</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.resetTimer}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Reset</Text>
                </View>
              </TouchableOpacity>
            
            </View>
            <View style={{ flex: 1}}>
                <View style={{flexDirection:'row'}}> 
                  <View style={{ alignItems: 'center', padding: 10,justifyContent:'center'}} ><Text >Work</Text></View>
                  <View style={[styles.texanin]}>
                    <Text>  Min </Text>
                    <TextInput
                      
                      keyboardType='numeric'
                      value={this.state.wtm.toString()}
                      onChange={(e) => this.handleChange(e,'wtm')}
                      style={[styles.textInput]}
                    />
                  </View>
                  <View>
                    <Text> Sec </Text>
                    <TextInput
                      keyboardType='numeric'
                      value={this.state.wts.toString()}
                      onChange={(e) => this.handleChange(e, 'wts')}
                      style={[styles.textInput]}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ alignItems: 'center', padding: 10, justifyContent: 'center' }}><Text>Break</Text></View>
                  <View style={[styles.texanin]}>
                    <Text>Min</Text>
                    <TextInput
                      keyboardType='numeric'
                      value={this.state.btm.toString()}
                      onChange={(e) => this.handleChange(e, 'btm')}
                      style={[styles.textInput]}
                    />
                    </View>
                  <View>
                    <Text>Sec</Text>
                    <TextInput
                      keyboardType='numeric'
                      value={this.state.bts.toString()}
                      onChange={(e) => this.handleChange(e, 'bts')}
                      style={[styles.textInput]}
                    />
                    </View>
                  </View>
                </View>
            </View>
        <View style={{ flex: 2 }}></View>
      </View>
        )}
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading:{
    fontSize:30,
    textAlign:'center',
    justifyContent:'center'
  },statusStyle:{
    textAlign: 'center',
    fontSize:35
  },
   button: {
    marginRight:5,
    marginLeft:5,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 10,
    paddingLeft:15,
    paddingRight:15,
    color: 'white'
  },
  textInput:{
    borderColor: 'black',
     width: 70,
     paddingLeft:10,
     paddingRight:10,
     justifyContent:'center',
     alignContent:'center',
      borderWidth: 2,
  }, texanin:{
    alignContent:'center',
    marginLeft:20,
    marginRight:20,
  }
});
