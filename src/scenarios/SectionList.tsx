import React from "react";
import {
  SectionListData,
  SectionList as RNSectionList,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const generateData = (): { id: number; name: string }[] =>
  Array.from({ length: 100 }).map((_, index) => ({
    id: index + 1,
    name: ((index + 1) * 1000000).toString(36).toUpperCase(),
  }));

const DATA: SectionListData<{
  id: number;
  name: string;
}>[] = [
  {
    title: "Section 1",
    data: generateData(),
  },
  {
    title: "Section 2",
    data: generateData(),
  },
  {
    title: "Section 3",
    data: generateData(),
  },
];

export function SectionList() {
  return (
    <RNSectionList
      style={styles.wrapper}
      sections={DATA}
      keyExtractor={(item, index) => (item.id + index).toString()}
      ListHeaderComponentStyle={styles.header}
      stickySectionHeadersEnabled
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      renderItem={(item) => (
        <Pressable
          onPress={() => {
            Alert.alert(`Hi I am ${item.item.name}!`);
          }}
          style={[styles.item, item.index % 2 ? styles.itemOdd : styles.itemEven]}
        >
          <Text>{item.item.name}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "gray",
    color: "white",
  },
  item: {
    padding: 10,
  },
  itemOdd: {
    backgroundColor: '#DDDDDD'
  },
  itemEven: {
    backgroundColor: '#EEEEEE'
  }
});
