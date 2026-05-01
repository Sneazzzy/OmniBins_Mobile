import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PRIMARY_GREEN = '#00a63e';

const AlertPage = () => {
  const [issueType, setIssueType] = useState('Overflowing Bin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const issueOptions = [
    'Overflowing Bin',
    'Damage Battery',
    'Neutralizer Needs Refill',
    'Sensor Malfunctions',
    'Overflowing Garbage',
  ];

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectIssue = (option) => {
    setIssueType(option);
    setIsDropdownOpen(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleSubmit = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/*
        DIM BACKDROP:
        When dropdown is open, this view covers the background and dims it.
      */}
      {isDropdownOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!isDropdownOpen}
      >
        {/* --- ISSUE TYPE --- */}
        <View style={[styles.inputGroup, { zIndex: isDropdownOpen ? 1000 : 1 }]}>
          <Text style={styles.label}>Issue Type</Text>
          <TouchableOpacity
            style={[styles.dropdown, isDropdownOpen && styles.dropdownActive]}
            onPress={toggleDropdown}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownText}>{issueType}</Text>
            <Text style={styles.chevron}>{isDropdownOpen ? '▴' : '▾'}</Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.optionsContainer}>
              {issueOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionItem,
                    index === issueOptions.length - 1 && { borderBottomWidth: 0 }
                  ]}
                  onPress={() => selectIssue(option)}
                >
                  <Text style={[
                    styles.optionText,
                    issueType === option && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* BACKGROUND CONTENT */}
        <View pointerEvents={isDropdownOpen ? 'none' : 'auto'}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Public Market, Aggao"
              placeholderTextColor="#a0a0a0"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Need ug extra bin"
              placeholderTextColor="#a0a0a0"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Photo <Text style={styles.optional}>(Optional)</Text></Text>
            <View style={styles.photoRow}>

              <TouchableOpacity style={styles.addPhotoBtn}>
                <Text style={styles.plusIcon}>+</Text>
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* --- SUCCESS MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.row}>
                <Image
                  source={require('../assets/reportbin.png')}
                  style={styles.modalImage}
                />
                <View style={styles.textColumn}>
                  <Text style={styles.thankYouText}>Thank you for the concern.</Text>
                  <Text style={styles.successText}>Report Submitted Successfully!</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.okButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  inputGroup: {
    marginBottom: 20,
    zIndex: 5,
    position: 'relative',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 8,
  },
  optional: {
    fontWeight: 'normal',
    color: '#717171',
    fontSize: 14,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  dropdownActive: {
    borderColor: PRIMARY_GREEN,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1c1c1c',
  },
  chevron: {
    fontSize: 18,
    color: '#717171',
    fontWeight: 'bold',
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: PRIMARY_GREEN,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#4a4a4a',
  },
  selectedOptionText: {
    color: PRIMARY_GREEN,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1c1c1c',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  photoRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  photoPreviewWrapper: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: '#f5f5f5',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoBtn: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  plusIcon: {
    fontSize: 30,
    color: '#1c1c1c',
    fontWeight: '300',
  },
  addPhotoText: {
    fontSize: 14,
    color: '#717171',
    fontWeight: '500',
    marginTop: 5,
  },
  submitBtn: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#f0f9f0',
    borderRadius: 25,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalContent: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginRight: 15,
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1c',
    marginBottom: 5,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1c',
  },
  okButton: {
    backgroundColor: '#00a63e',
    borderRadius: 15,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  okButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AlertPage;
