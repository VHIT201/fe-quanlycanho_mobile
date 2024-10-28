import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { HelperText } from 'react-native-paper';
import colors from '../../values/colors';
import { fontFamily } from '../../assets/fonts/useFont';

const TextInputComponent = ({
  placeholder,
  style,
  placeholderTextColor,
  keyboardType,
  autoCapitalize,
  onChangeText,
  onBlur,
  value,
  errors,
  rightIcon,
  onPressRightIcon,
  leftIcon,
  onPressLeftIcon,
  styleAreaInput,
  secureTextEntry,
  label,
  require,
  styleLabel,
  maxLength,
  onFocus,
  disable,
  noBorder,
  autoCompleteType,
  borderColor,
  type,
  multiline,
  numberOfLines,
  onContentSizeChange,
  borderRadius
}) => {
  const [isFocused, setIsFocused] = useState(false); // Trạng thái focus

  return (
    <View style={stylesTextInput.container}>
      {label && (
        <View style={stylesTextInput.containerLabel}>
          <Text
            children={`${label}`}
            style={[stylesTextInput.textLabel, styleLabel]}
          />
          {require && <Text children={' *'} style={{ color: colors.red }} />}
        </View>
      )}
      <View
        style={[
          noBorder
            ? stylesTextInput.containerAreaInputNoBorder
            : [stylesTextInput.containerAreaInput, { borderRadius: borderRadius }],
          styleAreaInput,
          { borderColor: isFocused ? colors.primary_green : borderColor }, // Thay đổi màu viền
        ]}>
        {leftIcon && (
          <TouchableOpacity
            onPress={() => {
              onPressLeftIcon && onPressLeftIcon();
            }}
            style={stylesTextInput.leftIcon}>
            <Image source={leftIcon} style={stylesTextInput.icon} />
          </TouchableOpacity>
        )}
        <TextInput
          style={[stylesTextInput.textInput, { fontFamily: fontFamily.regular }, style]} // Thêm fontFamily
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? colors.grayC4}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false); // Đặt trạng thái không focus khi mất focus
            onBlur && onBlur();
          }}
          value={value}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)} // Đặt trạng thái focus khi được focus
          editable={!disable}
          autoComplete={autoCompleteType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onContentSizeChange={onContentSizeChange}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={() => {
              onPressRightIcon && onPressRightIcon();
            }}>
            <Image source={rightIcon} style={stylesTextInput.icon} />
          </TouchableOpacity>
        )}
      </View>
      {errors && (
        <HelperText type="error" visible={Boolean(errors)}>
          {'Vui lòng nhập đầy đủ !!!'}
        </HelperText>
      )}
    </View>
  );
};

const stylesTextInput = StyleSheet.create({
  container: {
    width: '100%',
  },
  containerAreaInput: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 8,
    paddingRight: 12,
    borderColor: colors.black1,
    borderWidth: 1,
  },
  containerAreaInputNoBorder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 8,
    paddingRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    color: colors.black,
    height: 40,
  },
  textLabel: {
    color: colors.black1,
    fontSize: 16,
    fontFamily: fontFamily.regular
  },
  leftIcon: {
    height: 50,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TextInputComponent;
