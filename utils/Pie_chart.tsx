import { View } from "react-native-animatable";
import { ProgressChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";




export default function Piechart() {

  const data = {
    labels: ["Swim"], // optional
    data: [0.1]
  };
  
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
  };
  
 
    return (
      <View >
        <ProgressChart
          data={data}
          width={50}
          height={50}
          strokeWidth={6.5}
          radius={20}
          chartConfig={chartConfig}
          hideLegend={true}
          
        />
      </View>
    );
  };
   