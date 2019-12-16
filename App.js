import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";

import { Button } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

//
var itemArray = new Array(25).fill("empty");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reandomNumber: "",
      isScratched: false,
      count: 0,
      attemptRemaining: true,
      dollarFound: false
    };
  }

  componentDidMount() {
    this.setState({
      randomNumber: this.generateRandomNumber()
    });
  }

  generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 25);
    this.setState({ randomNumber: randomNumber, isScratched: true });
    return randomNumber;
  };

  scartchItem = itemNumber => {
    if (this.state.count < 5) {
      let count = this.state.count;
      count = count + 1;
      this.setState({
        count: count
      });
      if (this.state.randomNumber === itemNumber) {
        itemArray[itemNumber] = "lucky";
        // this.gameWon();

        // setTimeout(() => {
        //   this.gameWon();
        // }, 1000);
      } else {
        itemArray[itemNumber] = "unlucky";
      }
      this.forceUpdate();
    } else {
      console.log("exhaust");
      this.gameOver();
      // this.setState({
      //   attemptRemaining: false
      // });
    }

    // decide lucky or unlucky
  };

  scartchItemIcon = itemNumber => {
    if (itemArray[itemNumber] === "lucky") {
      this.setState({
        dollarFound: true
      });
      return "dollar";
    } else if (itemArray[itemNumber] === "unlucky") {
      return "frown-o";
    }
    return "circle";
    //TODO find write icon
  };

  scartchItemColor = itemNumber => {
    if (itemArray[itemNumber] === "lucky") {
      return "green";
    } else if (itemArray[itemNumber] === "unlucky") {
      return "red";
    }
    return "black";
    // TODO find rgiht color
  };

  showAllItem = () => {
    itemArray.fill("unlucky");
    itemArray[this.state.randomNumber] = "lucky";

    this.forceUpdate();
    //TODO Button - reveal all icon
  };

  resetGame = () => {
    // Alert.alert("running");
    this.setState(
      {
        randomNumber: this.generateRandomNumber(),
        count: 0
      },
      () => {
        itemArray.fill("empty");
        this.forceUpdate();
      }
    );
  };

  gameOver = () => {
    Alert.alert("Attempts Over! click on reset Game or Show All Coupons");
    // Alert.alert("attempts Over Click on reset Game", [
    //   {
    //     text: "OK",
    //     onPress: () => {
    //       this.resetGame();
    //     },
    //   }
    // ]);
  };

  gameWon = () => {
    var self = this;
    Alert.alert("you are lucky. Play Again");
    // Alert.alert(
    //   "You are lucky.",
    //   [
    //     { text: "Cancel", onPress: () => console.log("Cancel Pressed!") },
    //     {
    //       text: "OK",
    //       onPress: () => self.resetGame()
    //     }
    //   ],
    //   { cancelable: false }
    // );
    this.resetGame();
  };

  setModalVisible(visible) {
    this.setState({ dollarFound: visible });
  }
  render() {
    console.log(this.state.randomNumber);
    console.log("count", this.state.count);
    if (this.state.dollarFound === true) {
      // return <View>Alert.alert("you are lucky");</View>;
      return (
        <Modal isVisible={true} style={styles.modal}>
          <View style={{ flex: 1 }}>
            <Text>You are Lucky. Play Again...</Text>
          </View>
        </Modal>
        // <Modal
        //   style={styles.modal}
        //   animationType="slide"
        //   transparent={false}
        //   visible={this.state.dollarFound}
        //   onRequestClose={() => {
        //     Alert.alert("Modal has been closed.");
        //   }}
        // >
        //   <View style={{ flex: 1 }}>
        //     <Text>Hello World!</Text>

        //     <TouchableHighlight
        //       onPress={() => {
        //         this.setModalVisible(false);
        //         // this.setState({ dollarFound: false });
        //       }}
        //     >
        //       <Text>Hide Modal</Text>
        //     </TouchableHighlight>
        //   </View>
        // </Modal>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topText}>Scratch And Win Game</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.itemrow}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                this.scartchItem(0);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(0)}
                size={50}
                color={this.scartchItemColor(0)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                this.scartchItem(1);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(1)}
                size={50}
                color={this.scartchItemColor(1)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(2);
                else this.gameOver();
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(2)}
                size={50}
                color={this.scartchItemColor(2)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(3);
                else this.gameOver();
                // this.scartchItem(3);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(3)}
                size={50}
                color={this.scartchItemColor(3)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(4);
                else this.gameOver();
                // this.scartchItem(4);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(4)}
                size={50}
                color={this.scartchItemColor(4)}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.itemrow}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(5);
                else this.gameOver();
                // this.scartchItem(5);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(5)}
                size={50}
                color={this.scartchItemColor(5)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(6);
                else this.gameOver();
                // this.scartchItem(6);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(6)}
                size={50}
                color={this.scartchItemColor(6)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(7);
                else this.gameOver();
                // this.scartchItem(7);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(7)}
                size={50}
                color={this.scartchItemColor(7)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(8);
                else this.gameOver();
                // this.scartchItem(8);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(8)}
                size={50}
                color={this.scartchItemColor(8)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(9);
                else this.gameOver();
                // this.scartchItem(9);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(9)}
                size={50}
                color={this.scartchItemColor(9)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemrow}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(10);
                else this.gameOver();
                // this.scartchItem(10);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(10)}
                size={50}
                color={this.scartchItemColor(10)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(11);
                else this.gameOver();
                // this.scartchItem(11);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(11)}
                size={50}
                color={this.scartchItemColor(11)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(12);
                else this.gameOver();
                // this.scartchItem(12);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(12)}
                size={50}
                color={this.scartchItemColor(12)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(13);
                else this.gameOver();
                // this.scartchItem(13);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(13)}
                size={50}
                color={this.scartchItemColor(13)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(14);
                else this.gameOver();
                // this.scartchItem(14);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(14)}
                size={50}
                color={this.scartchItemColor(14)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemrow}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(15);
                else this.gameOver();
                // this.scartchItem(15);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(15)}
                size={50}
                color={this.scartchItemColor(15)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(16);
                else this.gameOver();
                // this.scartchItem(16);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(16)}
                size={50}
                color={this.scartchItemColor(16)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(17);
                else this.gameOver();
                // this.scartchItem(17);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(17)}
                size={50}
                color={this.scartchItemColor(17)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(18);
                else this.gameOver();
                // this.scartchItem(18);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(18)}
                size={50}
                color={this.scartchItemColor(18)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(19);
                else this.gameOver();
                // this.scartchItem(19);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(19)}
                size={50}
                color={this.scartchItemColor(19)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.itemrow}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(20);
                else this.gameOver();
                // this.scartchItem(20);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(20)}
                size={50}
                color={this.scartchItemColor(20)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(21);
                else this.gameOver();
                // this.scartchItem(21);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(21)}
                size={50}
                color={this.scartchItemColor(21)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(22);
                else this.gameOver();
                // this.scartchItem(22);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(22)}
                size={50}
                color={this.scartchItemColor(22)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(23);
                else this.gameOver();
                // this.scartchItem(23);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(23)}
                size={50}
                color={this.scartchItemColor(23)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (this.state.attemptRemaining) this.scartchItem(24);
                else this.gameOver();
                // this.scartchItem(24);
              }}
            >
              <FontAwesome
                name={this.scartchItemIcon(24)}
                size={50}
                color={this.scartchItemColor(24)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Button full success style={styles.button} onPress={this.showAllItem}>
          <Text style={styles.buttonText}>Show All Coupons</Text>
        </Button>
        <Button full primary style={styles.button} onPress={this.resetGame}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  grid: {},
  itemrow: {
    flexDirection: "row"
  },
  item: {
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#000",
    minWidth: 70
  },
  button: {
    marginVertical: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  },
  topBar: {
    backgroundColor: "#8B78E6",
    height: 50,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    marginVertical: 20
  },
  topText: {
    color: "#fff",
    textAlign: "center"
  },
  modal: {
    backgroundColor: "white",
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined
  }
});
