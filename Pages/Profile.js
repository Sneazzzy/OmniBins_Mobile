import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ChevronRightIcon } from '../Components/Icons';

const PRIMARY_GREEN = '#00a63e';

const ProfilePage = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* --- PROFILE HEADER CARD --- */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../assets/logo_bg.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraBtn}>
               <Text style={styles.cameraIcon}>📷</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>James Pestañas</Text>
            <Text style={styles.profileRole}>Garbage Collector</Text>
          </View>
        </View>

        {/* --- ACCOUNT DETAILS SECTION --- */}
        <Text style={styles.sectionTitle}>Account Details</Text>
        <View style={styles.detailsGroup}>
          <TouchableOpacity style={styles.detailItem}>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>09123456781</Text>
            </View>
            <ChevronRightIcon />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.detailItem}>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Email Address</Text>
              <Text style={styles.detailValue} style={styles.emailText}>jamespestanas@gmail.com</Text>
            </View>
            <ChevronRightIcon />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.detailItem}>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Employee ID</Text>
              <Text style={styles.detailValue}>LGU-GC1</Text>
            </View>
            <ChevronRightIcon />
          </TouchableOpacity>
        </View>

        {/* --- SECURITY SECTION --- */}
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.detailsGroup}>
          <TouchableOpacity style={styles.detailItem}>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Change Password</Text>
              <Text style={styles.detailSubLabel}>Update your password</Text>
            </View>
            <ChevronRightIcon />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.detailItem}>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>Two-Factor Authentication</Text>
              <Text style={styles.detailSubLabel}>Add extra security to your account.</Text>
            </View>
            <ChevronRightIcon />
          </TouchableOpacity>
        </View>

        {/* --- LOGOUT BUTTON --- */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#d1d1d1',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: PRIMARY_GREEN,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  cameraIcon: {
    fontSize: 14,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1c',
  },
  profileRole: {
    fontSize: 16,
    color: '#33803f',
    fontWeight: '500',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 10,
  },
  detailsGroup: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  detailTextContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1c1c1c',
  },
  detailValue: {
    fontSize: 14,
    color: '#717171',
    marginTop: 2,
  },
  detailSubLabel: {
    fontSize: 13,
    color: '#717171',
    marginTop: 2,
  },
  emailText: {
    textDecorationLine: 'underline',
    color: '#717171',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
  },
  logoutBtn: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
