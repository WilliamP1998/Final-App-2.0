import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { navigate } from "../navigationRef";
import { ListItem } from "react-native-elements";
import { soundArray } from "./CreateRecord";
import { AsyncStorage } from "react-native";

const BACKGROUND_COLOR = "#FFFFFF";

export default class RecordingList extends React.Component {
  state = {
    sounds: []
  };

  constructor() {
    super();
    this.retrievedSounds = [];
  }

  componentDidMount() {
    // this.getSounds().then(sounds => {
    //   this.setState({
    //     sounds: sounds
    //   });
    // });
  }

  getSounds = () =>
    new Promise(function(resolve) {
      AsyncStorage.getItem("soundArray").then(val => {
        let retrievedSoundArray = JSON.parse(val);
        return resolve(retrievedSoundArray);
      });
    });

  _retrieveData = async () => {
    try {
      let val = AsyncStorage.getItem("soundArray").then(result => {
        let retrievedSoundArray = JSON.parse(val);
        // console.log(retrievedSoundArray);
        this.retrievedSounds = retrievedSoundArray;
        // console.log(this.retrievedSounds);
        return retrievedSoundArray;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  render() {
    return (
      <View style={styles.background}>
        <Text>List Records</Text>
        <FlatList
          keyExtractor={item => item.id}
          data={soundArray}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigate("CurrentRecord", { id: item.id })}
              >
                <ListItem chevron title={item.name} description={item.desc} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  }
});
