import React from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Slack from 'react-native-slack-webhook';
import moment from "moment";
import timer from 'react-native-timer'
import { Button } from "react-native-navitime-button";
import { StackNavigator } from 'react-navigation';

// 子コンポーネントをimport
import CustomButton from './CustomButton';
import Price from './Price';
import List from './List';


const { width, height, scale } = Dimensions.get('window');


const PriceScreen = ({ navigation, screenProps }) => (
  <Price
    navigation={navigation} screenProps={screenProps}
  />
);

const ListScreen = ({ navigation, screenProps }) => (
  <List
    navigation={navigation} screenProps={screenProps}
  />
);

const CoinApp = StackNavigator({
  List: {
    screen: ListScreen,
    navigationOptions: {
      title: '銘柄',
    }
  },
  Price: {
    screen: PriceScreen,
    navigationOptions: {
//      title: '価格',
    }
  }
}, {
  initialRouteName: 'List',
  headerMode: 'screen',
});


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          data: 0
    };
	}

  render() {
    return (
      <CoinApp {...this.state}/>
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
  button: {
    color: "#ffffff"
  },
  rateText: {
    color: "#000000",
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20
  },
  listView: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#ffffff'
  },
  listViewContentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  spotListItemView: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    //height: 170,
    overflow: 'hidden'
  },
  spotListItemViewText: {
    padding: 1,
    paddingTop: 5,
    paddingBottom: 20
  },
  spotListItemViewName: {
    fontWeight: "bold"
  },
  spotListItemViewCategory: {
    fontSize: 10,
    paddingTop: 3,
    paddingBottom: 10
  },
  spotListItemImage: {
    flex: 1,
    borderRadius: 4
  },
});
