import React from 'react';
import {
  Image,
  FlatList,
  Linking,
  Modal,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { SearchBar } from 'react-native-elements';
// import firebase from '../components/Firebase';
import axios from 'axios';
const KEYS_TO_FILTERS = ['title', 'description'];
const API = 'https://newsapi.org/v2/top-headlines?country=';
const KEY = '&apiKey=5b068dbd57ef45d0a74f02312853d2f1';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
		super(props);

		this.state = {
			articles: [],
      search: '',
      visible: false,
      country: 'de',
		}
	}

  updateSearch = search => {
    this.setState({ search });
  };

  setModalVisible = visible => {
    this.setState({ visible });
  }

  setCountry = country => {
    this.setState({ country: country });
    axios.get(API + country + KEY)
     .then(response => this.setState({ articles: response.data.articles }))
     .catch(function () {
       console.log("Promise Rejected");
     })
  }

  componentDidMount() {
	  axios.get(API + this.state.country + KEY)
    .then(response => this.setState({ articles: response.data.articles }))
    .catch(function () {
      console.log("Promise Rejected");
    })
	}

  emptyImage(urlToImage) {
    let isEmpty = urlToImage;
    if (isEmpty !== null) {
       return isEmpty;
    }
    else {
      return ("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/dHnxL5V/world-global-news-background-backdrop-planet-earth-4k_4jqowtcn__F0000.png");
    }
  }

  render() {
      const { search, country } = this.state;
      const filteredArticles = this.state.articles.filter(createFilter(this.state.search, KEYS_TO_FILTERS))
      return (
      <View marginTop={40} style={styles.flexView}>
        <SearchBar
          placeholder="Search Articles Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}
          >
          <View style={{ marginTop: 22 }}>
            <View>
              <View style={{ flex:1, justifyContent:'space-around', padding:50 }}>
                <Picker
                  selectedValue={ this.state.country }
                  onValueChange={(itemValue, itemIndex) =>
                    {
                      this.setCountry(itemValue);
                      console.log('country', country);
                      this.setModalVisible(!this.state.visible);
                    }
                  }
                  >
                  <Picker.Item label="Choose a country.."/>
                  <Picker.Item label="Australia" value="au" />
                  <Picker.Item label="France" value="fr" />
                  <Picker.Item label="Germany" value="de" />
                  <Picker.Item label="Ireland" value="ie" />
                  <Picker.Item label="Russia" value="ru" />
                  <Picker.Item label="United Kingdom" value="gb" />
                  <Picker.Item label="United States" value="us" />

                </Picker>
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView style={styles.articleBackground} contentInset={{top: 0, left: 0, bottom: 50, right: 0}}>
          {filteredArticles.map(article => {
            return (
              <TouchableOpacity style={styles.articleBackground} key={article.title}>
                <View style={styles.articleBackground}>
                  <TouchableHighlight style={styles.articleBackground} useForeground onPress={() => Linking.openURL(article.url)}>
                    <View>
                      <Image style={styles.articleImage} source={{uri: this.emptyImage(article.urlToImage)}}/>
                      <Text style={styles.titleStyle}>{article.title}</Text>
                      <Text style={styles.descriptionStyle}>{article.description + '. Read More..'}</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <TouchableHighlight onPress={() => {
            this.setModalVisible(true);
            console.log('button press, current state:', this.state.country);
          }}>
          <View style={styles.chooseCountry}>
            <Text fontSize={20}>Choose your country....</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chooseCountry: {
    height: 72,
    paddingLeft: 20,
    backgroundColor: '#393e42',
    alignItems: 'center',
  },
  flexView: {
    flex: 1,
  },
  articleBackground: {
    backgroundColor: '#393e42',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  articleImage: {
    height: 200,
    width: 500,
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 20,
    lineHeight: 25,
    color: '#fff',
    fontWeight: '500',
  },
  descriptionStyle: {
    color: '#fff',
    fontWeight: '200',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
