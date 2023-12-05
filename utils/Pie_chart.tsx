import { View } from "react-native-animatable";
import { ProgressChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native/Libraries/Utilities/Dimensions";




export default function Piechart({loadtime: number, size:sizeNum}) {

  function progresscolor(){
    if (number == 1){
      return (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    }
    if (number >= 0.75){
      return (opacity = 1) => `rgba(0, 128, 0, ${opacity})`
    }
    if (number >= 0.35){
      return (opacity = 1) => `rgba(255, 165, 0, ${opacity})`
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
          width={sizeNum*3}
          height={sizeNum*3}
          strokeWidth={6.5}
          radius={sizeNum}
          chartConfig={chartConfig}
          hideLegend={true}
          
        />
      </View>
    );
  };
   