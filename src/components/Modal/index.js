import React, { useCallback } from 'react';
import { View, Modal, Pressable, Text, ScrollView, Image } from 'react-native';
import modalStyles from './modalStyles';

const CustomModal = ({
  visible, 
  onClose, 
  titleHeader, 
  modalBackgroundStyle, 
  modalContainerStyle, 
  children,
  headerStyles,
  leftIconHeader,
  title,
  styleIconHeader,
  rightIconHeader,
  onLeftIconHeaderPress, 
  onRightIconHeaderPress,
  footer, // Prop cho footer
  footerStyle
}) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable style={[modalStyles.modalBackground, modalBackgroundStyle]} onPress={handleClose}>
        <View style={[modalStyles.modalContainer, modalContainerStyle]}>
          {title && (
            <View style={modalStyles.header}>
                <View style={{flex:1}}>
                    <Pressable onPress={onLeftIconHeaderPress}>
                      <Image source={leftIconHeader} style={styleIconHeader}/>
                    </Pressable>
                </View>
                <View style={{alignItems:"center",flex:5}}>
                  <Text style={modalStyles.headerTitle}>{title}</Text>
                </View>
                <View style={{flex:1}}>
                  <Pressable onPress={onRightIconHeaderPress}>
                    <Image source={rightIconHeader} style={styleIconHeader}/>
                  </Pressable>
                </View>
            </View>
          )}
          {!title && <View style={modalStyles.handleBar}></View>}
          <ScrollView style={modalStyles.scrollView} contentContainerStyle={modalStyles.scrollViewContent}>
            {children}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default React.memo(CustomModal);
