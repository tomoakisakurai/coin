import React from 'react';
import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Slack from 'react-native-slack-webhook';
import moment from "moment";
import timer from 'react-native-timer'
import { Button } from "react-native-navitime-button";
import { StackNavigator } from 'react-navigation';

// 子コンポーネントをimport
import CustomButton from './CustomButton';
const { width, height, scale } = Dimensions.get('window');


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          data: 0
    };
	}

  async componentDidMount(){
    //const articleData = await this.fetchData();
    await this.fetchAllCoinsData();
    //console.log(articleData);
    // this.setState({ article: articleData.article, relatedSpots: ds.cloneWithRows(articleData.spots) });
  }

  componentWillMount(){
    // timer.setInterval('testInterval', () => {
    //   this.getRate();
    // }, 10000);
  }


    /**
   * 
   * key
   *
   */
  keyExtractor = (item, index) => item.currency_pair;

    /**
   * 
   * 関連スポットリスト
   *
   */
  renderItem = (item) => {
    const { navigate } = this.props.navigation;
    const data = item.item;
    const itemWidth = (Dimensions.get('window').width - 20 ) / 2;
    const viewStyle = { width: itemWidth, backgroundColor: "#ffffff" };
    console.log("renderItem")
    console.log(item)
    return (
      <TouchableOpacity onPress={ () => navigate('Price', {state: {...this.state}, item: item}) }>
        <View style={[ styles.spotListItemView, viewStyle ]}>
          { this.renderImage(itemWidth) }
          <View style={styles.spotListItemViewText}>
            <Text style={styles.spotListItemViewCategory}>{data.item_japanese}</Text>
            <Text style={styles.spotListItemViewName}>{data.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
     )
  }

  renderImage = (itemWidth) => {
    return(
      <Image source={require('./assets/btc.png')} style={[ {width: '100%', height: itemWidth / 1.5, resizeMode: Image.resizeMode.contain}, styles.spotListItemImage]} />
    )
  }

  // onPressCustomButton={ ()=> this.getRate() }で子コンポーネントでイベントを使えるように渡す
  render() {

    return (
      <View style={{paddingLeft: 10, paddingRight: 10, backgroundColor: "#ffffff"}}>
        <FlatList
          data={this.state.coins}
          renderItem={ (item) => this.renderItem(item) }
          keyExtractor={ (item) => this.keyExtractor(item) }
          onEndReachedThreshold={100}
          numColumns={2} />
      </View>
    );
  }

  getRate = () => {
    const time = moment().format('YYYY年MM月DD日 HH:mm:ss dddd');
    const url = `https://api.zaif.jp/api/1/last_price/btc_jpy`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({ data: responseJson });
        const rate = responseJson.last_price;
        //new Slack("https://hooks.slack.com/services/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").post(`BCT：${rate}：${time}`, '#info_sakurai')
      })
  }

  // fetchData = () => {
  //   const url = `https://api.zaif.jp/api/1/last_price/btc_jpy`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       // console.log(responseJson);
  //       this.setState({ data: responseJson });
  //   })
  // }

  fetchAllCoinsData = () => {
    const url = `https://api.zaif.jp/api/1/currency_pairs/all`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ coins: responseJson });
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
