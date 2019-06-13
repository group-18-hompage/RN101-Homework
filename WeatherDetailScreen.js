import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // 헤더 부분
      title: `${navigation.getParam('city', 'Unknown')}`,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#99e7ff',
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city'); // 날짜 가져옴
    const apiKey = "2669204ce7477bd469eda923538153ee"

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>...Loading...</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15; // 현재온도
    let weatherCondition = this.state.weather[0].main; // 상태
    let windSpeed = this.state.wind.speed; // 풍속
    let celsiusMin = this.state.main.temp_min - 273.15; // 최저온도
    let celsiusMax = this.state.main.temp_max - 273.15; // 최고온도

    return (
      <View style={styles.container}>
        <View style={styles.viewStyle}>
          <Text style={styles.celsius}>{celsius.toFixed(1)}°</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.weatherMain}>{weatherCondition}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>최저온도 </Text>
          <Text style={styles.textStyle}>{celsiusMin.toFixed(1)}°</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>최고온도 </Text>
          <Text style={styles.textStyle}>{celsiusMax.toFixed(1)}°</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>풍속 </Text>
          <Text style={styles.textStyle}>{windSpeed}(m/s)</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { // 배경
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f4feff',
  },

  celsius: { // 현재온도
    color: '#08c9ff',
    fontSize: 110,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },

  weatherMain: { // 상태
    color: '#08deff',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  viewStyle: { // view
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 15,
  },

  textStyle: { // 글자
    color: '#111444',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
