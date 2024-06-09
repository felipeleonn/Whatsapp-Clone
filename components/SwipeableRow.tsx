import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Animated, StyleSheet, View, I18nManager } from 'react-native';

import { RectButton  } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

type SwipeableRowProps = {
  children: React.ReactNode;
  onDelete: () => void;
}

export default class SwipeableRow extends Component<SwipeableRowProps> {
  private renderRightAction = (
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <Ionicons
            name="trash"
            size={24}
            color={'#fff'}
          />
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 80,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {this.renderRightAction(Colors.red, 80, progress)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
    this.props.onDelete();
  };
  private onSwipeableOpen = () => {
    this.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        overshootRight={false}
        rightThreshold={20}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={this.onSwipeableOpen}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
