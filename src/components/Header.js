import {Button, Platform, StyleSheet, Text, TouchableOpacity, View, StatusBar, SafeAreaView} from 'react-native';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import COLORS from "../utils/COLORS";

const HeaderContainerPadding = 30
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: COLORS.BLUE,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,

    },
    headerName: {
        padding: HeaderContainerPadding,
        justifyContent:'center',
 //       paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + HeaderContainerPadding : HeaderContainerPadding
    },
    headerText: {
        color: COLORS.WHITE,
        fontFamily: 'Helvetica Neue LT',
        fontSize: 25,
        textAlign: 'center',
    },
    hamburgerBg: {
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginLeft: 20,
    }

});


const Header = ({navigation}) => {
    return (
        <View style={styles.headerContainer}>
            <SafeAreaView style={{
                flex: 1,
                marginTop: Platform.OS === 'android' ? StatusBar.currentHeight  : 0,

            }}>
                <View>
                    <View style={styles.headerName}>
                        <Text style={styles.headerText}>K&H parkURmoney</Text>
                    </View>

                    <View style={styles.hamburgerBg}>
                        <TouchableOpacity onPress={() => {
                            navigation.openDrawer()
                        }} style={{
                            backgroundColor: COLORS.WHITE,
                            width: 37,
                            height: 37,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View>
                                <View style={{
                                    width:20,
                                    height:3,
                                    backgroundColor: '#8d8d8d',
                                    borderRadius: 10,
                                    marginBottom: 3,
                                }}/>
                                <View style={{
                                    width:15,
                                    height:3,
                                    backgroundColor: '#8d8d8d',
                                    borderRadius: 10,
                                    marginBottom: 3,
                                }}/>
                                <View style={{
                                    width:10,
                                    height:3,
                                    backgroundColor: '#8d8d8d',
                                    borderRadius: 10,
                                }}/>


                            </View>


                        </TouchableOpacity>
                    </View>
                </View>


            </SafeAreaView>
            <ExpoStatusBar/>

        </View>
    )
}


export default Header


/*
<View style={{
                            backgroundColor: '#888888',
                            width: '70%',
                            height: 3,
                            borderRadius: 10,
                            marginBottom: 3,
                            position: 'relative',
                        }}/>




 */
