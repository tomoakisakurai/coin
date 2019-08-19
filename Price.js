import React from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Slack from 'react-native-slack-webhook';
import moment from "moment";
import timer from 'react-native-timer'
import { Button } from "react-native-navitime-button";
import { StackNavigator } from 'react-navigation';

// 子コンポーネントをimport
import CustomButton from './CustomButton';
const { width, height, scale } = Dimensions.get('window');



export default class Price extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: `価格`,
	});

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.item,
      priceData: 0
    };
	}

  async componentDidMount(){
    console.log(this.state.data.item)
    const pairKey = this.state.data.item.currency_pair;
    await this.getRate(pairKey);
    //console.log(articleData);
    // this.setState({ article: articleData.article, relatedSpots: ds.cloneWithRows(articleData.spots) });
  }

  componentWillMount(){
    timer.setInterval('testInterval', () => {
      this.getRate(this.state.data.item.currency_pair);
    }, 10000);
  }

  componentWillUnmount(){
    timer.clearInterval(this.timer)
  }

    /**
   * 
   * key
   *
   */
  keyExtractor = (item, index) => item.currency_pair;

  render() {
    if(this.state.data !== null){
      const data = this.state.data;
      return (
        <View style={styles.container}>
          <Text>{data.item.item_japanese}</Text>
          <Text>{data.item.aux_japanese}</Text>
          <Text style={styles.rateText}>{this.state.priceData.last_price}</Text>
          <Button onPress={ () => this.getRate(data.item.currency_pair) }/>
        </View>
      );  
    }else{
      return(
        <View></View>
      )
    }
  }

  getRate = (pKey) => {
    const time = moment().format('YYYY年MM月DD日 HH:mm:ss dddd');
    const url = `https://api.zaif.jp/api/1/last_price/${pKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ priceData: responseJson });
        const rate = responseJson.last_price;
        //new Slack("https://hooks.slack.com/services/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").post(`BCT：${rate}：${time}`, '#info_sakurai')
      })
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
