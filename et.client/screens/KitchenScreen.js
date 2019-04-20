import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { TrackerHeader, TrackerList } from '../components';
import Colors from '../constants/Colors';
import { connect } from "../services/BridgeService";

export default class KitchenScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    //connect();
  }

  render() {
    return (
      <>
        <TrackerHeader title="KITCHEN" />
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container}>
            <TrackerList icon={{ name: 'file-upload', color: Colors.tintColor  }}/>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
