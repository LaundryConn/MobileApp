import { View } from "react-native-animatable";
import { ProgressChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";




export default function Piechart({loadtime: number}) {

  function progresscolor(){
    if (number == 1){
      return (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    }
    if (number >= 0.75){
      return (opacity = 1) => `rgba(0, 128, 0, ${opacity})`
    }
    else {
      return (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
    }
  }

  const data = {
    data: [number]
  };
  
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    color: progresscolor(),
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
   