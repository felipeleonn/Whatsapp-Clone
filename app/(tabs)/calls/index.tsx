import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { CurvedTransition, FadeInUp, FadeOutUp, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';

import { defaultStyles } from '@/constants/Styles';
import calls from '@/assets/data/calls.json';
import Colors from '@/constants/Colors';
import { SegmentedControl } from '@/components/SegmentedControl';
import SwipeableRow from '@/components/SwipeableRow';

const transition = CurvedTransition.delay(100);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const Page = () => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [items, setItems] = useState(calls);
  const [isEditing, setIsEditing] = useState(false);
  const editing = useSharedValue(-30)

  const onEdit = () => {
    let editingNew = !isEditing;
    editing.value = editingNew ? 0 : -30;
    setIsEditing(editingNew);
  }

  const onSegmentChange = (option: string) => {
    setSelectedOption(option);
    if (option === 'All') {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  }

  const removeCall = (toDelete: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(items.filter((item) => item.id !== toDelete.id));
  };

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }]
  }));

  return (
    <View style={{flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={['All', 'Missed']}
              selectedOption={selectedOption}
              onOptionPress={onSegmentChange}
            />
          ),
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
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList
            //skipEntering.. para no que haga la animacion cuando carga por primera vez
            skipEnteringExitingAnimations
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            itemLayoutAnimation={transition}
            renderItem={({item, index}) => (
              <GestureHandlerRootView>
                <SwipeableRow onDelete={() => removeCall(item)}>
                  <Animated.View style={{ flexDirection: "row", alignItems: "center" }} entering={FadeInUp.delay(index * 20)} exiting={FadeOutUp}>
                    <AnimatedTouchableOpacity onPress={() => removeCall(item)} style={[animatedRowStyles, { paddingLeft: 8 }]}>
                      <Ionicons name="remove-circle" size={24} color={Colors.red}/>
                    </AnimatedTouchableOpacity>
                    <Animated.View style={[defaultStyles.item, animatedRowStyles, { paddingLeft: 20 }]}>
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
                    </Animated.View>
                  </Animated.View>
                </SwipeableRow>
              </GestureHandlerRootView>
            )}
          />
        </Animated.View>
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