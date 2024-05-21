import { View, Text, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { format } from 'date-fns';

import { defaultStyles } from '@/constants/Styles';
import calls from '@/assets/data/calls.json';
import Colors from '@/constants/Colors';

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = () => {}
  return (
    <View style={{flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          // headerTitle: () => (
          //   <SegmentedControl
          //     options={['All', 'Missed']}
          //     selectedOption={selectedOption}
          //     onOptionPress={onSegmentChange}
          //   />
          // ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={defaultStyles.block}>
          <FlatList
            data={calls}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({item}) => (
              <View style={[defaultStyles.item, { paddingLeft: 20 }]}>
                <Image source={{ uri: item.img }} style={styles.avatar} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={{ fontSize: 18, color: item.missed ? Colors.red : "#000"  }}>{item.name}</Text>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons 
                      name={item.video ? "videocam" : "call"}
                      size={16}
                      color={Colors.gray}
                    />
                    <Text style={{ color: Colors.gray, flex: 1 }}>
                      {item.incoming ? "Incoming" : "Outgoing"}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                  <Text>{format(item.date, 'MM.dd.yy')}</Text>
                  <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Page;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  }
})