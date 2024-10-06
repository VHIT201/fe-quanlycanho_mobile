// components/InfoSection.js
import React from 'react';
import { View, Text } from 'react-native';
import homeStyles from '../../features/home/homeStyles';
import colors from '../../values/colors';

const InfoSection = ({ data, style }) => {

    // example data
    // const infoData = [
    //     [
    //       { label: 'Số tòa nhà', value: '15' },
    //       { label: 'Số người thuê', value: '400' },
    //     ],
    //     [
    //       { label: 'Số phòng', value: '440' },
    //       { label: 'Số phòng trống', value: '25' },
    //     ],
    //   ];

  return (
    <View style={[homeStyles.container, style]}>
      {data.map((column, columnIndex) => (
        <View key={columnIndex} style={homeStyles.columnContainer}>
          {column.map((item, itemIndex) => (
            <View key={itemIndex} style={homeStyles.centeredTextContainer}>
              <Text style={{ fontWeight: "600", color: colors.primary_green }}>{item.label}</Text>
              <Text>{item.value}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default InfoSection;
