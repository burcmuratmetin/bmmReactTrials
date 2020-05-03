import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const Header = props => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>POMODORO TIMER</Text>
            <Text style={styles.subtitle}>This is {props.timer} time!</Text>
        </View>
    );
};

Header.propTypes = {
    timer: PropTypes.string.isRequired 
};

const styles = StyleSheet.create ({
    headerContainer: {
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 30
    }
});

export default Header;