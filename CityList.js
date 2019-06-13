import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

export default class CityList extends React.Component {
  static navigationOptions = {
    title: 'Cities',
    // 헤더 부분
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    headerStyle: {
      backgroundColor: '#99e7ff',
    },
    };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        this.setState({
          cities
        });
      });
  }

  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item}
                data={this.state.cities}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: { // 칸 배경
    flex: 1,
    backgroundColor: '#f4feff',
  },

  item: { // 한 칸 (선 부분)
    flex: 1,
    height: 60,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#99e7ff',
  },
  text: { // 글자
    fontSize: 25,
    textAlign: 'center',
    color:'#08c9ff',
    fontWeight:'bold',
  }
});
