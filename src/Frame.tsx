import React, { useEffect } from "react";
import { View } from "react-native";

import { CustomAnimation } from "./scenarios/CustomAnimation";
import { SectionList } from "./scenarios/SectionList";
import { TouchableOpacity } from "./scenarios/TouchableOpacity";

import { Scenarios } from "../interface";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { globals } from "./styles";

const getComponent = (scenario: Scenarios) =>
  ({
    [Scenarios.TOUCHABLE_OPACITY]: TouchableOpacity,
    [Scenarios.SECTION_LIST]: SectionList,
    [Scenarios.CUSTOM]: CustomAnimation,
  }[scenario]);

export function Frame() {
  const { scenario } = useRoute<
    RouteProp<{
      params: {
        scenario: Scenarios;
      };
    }>
  >().params;

  const Component = getComponent(scenario);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: scenario,
    });
  }, []);

  return (
    <View style={[globals.container, globals.center]}>
      <Component />
    </View>
  );
}
