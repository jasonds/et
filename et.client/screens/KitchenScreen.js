import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-navigation';
import { TrackerHeader, TrackerList } from '../components';

export default class KitchenScreen extends React.Component {
  static navigationOptions = {
    header: null,
    // title: 'Kitchen',
  };

  render() {
    return (
      <>
        <TrackerHeader title="KITCHEN" />
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container}>
            <TrackerList icon={{ name: 'add' }}/>
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
