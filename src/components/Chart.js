import DefaultWrapper from "./DefaultWrapper";
import {Text, Dimensions, View} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import COLORS from "../utils/COLORS";
import {getRandomInt} from "../utils/randomGenerator";

const Chart = ({spot}) => {

    console.log()
    return (
        <DefaultWrapper>
            <View style={{
                //backgroundColor: 'red',
                marginHorizontal: 20,
                paddingTop: 10,
            }}>
                <View style={{
                    alignItems: 'flex-start',
                    //marginHorizontal: 30,
                    marginBottom: 20,
                    marginLeft: 20,
                }}>
                    <Text style={{
                        backgroundColor: COLORS.WHITE,
                        borderRadius: 13,
                        justifyContent: 'center',
                        paddingHorizontal: 25,
                        paddingVertical: 10,
                    }}>X{spot} hely értékváltozása</Text>
                </View>


                <LineChart
                    data={{
                        //labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: Array.apply(null, Array(10)).map(_ => getRandomInt(2, 16))
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width * 0.85} // from react-native
                    height={200}
                    yAxisSuffix=" DP"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        //backgroundColor: "#25218f",
                        //backgroundGradientFrom: "#fb8c00",
                        //backgroundGradientTo: "#ffa726",
                        backgroundGradientToOpacity: 0.,
                        backgroundGradientFromOpacity: 0.,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        //`rgb(194,41,41)`,
                        //color: (opacity = 1) => `rgba(194,41,41, ${opacity})`,
                        color: (opacity) => COLORS.BLUE,
                        labelColor: (opacity = 1) => COLORS.DARK_BLUE,
                        style: {
                        },
                        propsForDots: {
                            r: "0",

                        }
                    }}
                    bezier

                />
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 5,
                }}>
                    <Text style={{flex: 1, textAlign: 'center', color: COLORS.WHITE,
                        backgroundColor: COLORS.BLUE, borderRadius: 5, paddingVertical: 7
                    }}>1D</Text>
                    <Text style={{flex: 1, textAlign: 'center', color: COLORS.DARK_BLUE,
                        borderRadius: 5, paddingVertical: 7
                    }}>1W</Text>
                    <Text style={{flex: 1, textAlign: 'center', color: COLORS.DARK_BLUE,
                        borderRadius: 5, paddingVertical: 7
                    }}>1M</Text>
                    <Text style={{flex: 1, textAlign: 'center', color: COLORS.DARK_BLUE,
                        borderRadius: 5, paddingVertical: 7
                    }}>1Y</Text>
                    <Text style={{flex: 1, textAlign: 'center', color: COLORS.DARK_BLUE,
                        borderRadius: 5, paddingVertical: 7
                    }}>ALL</Text>

                </View>
            </View>

        </DefaultWrapper>
    )
}

export default Chart
