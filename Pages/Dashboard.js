import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { OrangeCleaningIcon, ClipboardCheckIcon } from '../Components/Icons';

const PRIMARY_GREEN = '#00a63e';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* --- WELCOME SECTION --- */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Good Morning, James! 👋</Text>
          <Text style={styles.welcomeSubtext}>Stay safe and keep the city clean.</Text>
        </View>

        {/* --- WEATHER CARD --- */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherLeft}>
            <View style={styles.weatherIconContainer}>
               <Text style={{fontSize: 40}}>☀️</Text>
               <View style={styles.cloudOverlay}>
                  <Text style={{fontSize: 30}}>☁️</Text>
               </View>
            </View>
            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>28°<Text style={styles.tempUnit}>C</Text></Text>
              <Text style={styles.weatherCondition}>Partly Cloudy</Text>
            </View>
          </View>
          <View style={styles.weatherRight}>
            <Text style={styles.weatherDetail}>Humidity: <Text style={styles.weatherDetailVal}>60%</Text></Text>
            <Text style={styles.weatherDetail}>Wind: <Text style={styles.weatherDetailVal}>12 km/h</Text></Text>
            <Text style={styles.weatherDetail}>Feels like: <Text style={styles.weatherDetailVal}>31°C</Text></Text>
          </View>
        </View>

        {/* --- TODAY'S SCHEDULE SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <Text style={styles.dateText}>May 20, 2024</Text>
        </View>

        <View style={styles.scheduleCard}>
          <View style={styles.scheduleInfo}>
            <Text style={styles.nextStopLabel}>Next Stop</Text>
            <Text style={styles.binId}>BIN-1047</Text>
            <Text style={styles.locationText}>Main St, Block 5</Text>
            <Text style={styles.timeText}>10:30 AM</Text>
          </View>
          <View style={styles.truckContainer}>
             <Image
              source={require('../assets/truck.png')}
              style={styles.truckImage}
             />
          </View>
        </View>

        {/* --- TASK STATUS SECTION --- */}
        <View style={styles.taskContainer}>
           <View style={[styles.taskCard, styles.completedCard]}>
              <View style={styles.taskIconWrapper}>
                 <ClipboardCheckIcon size={48} />
              </View>
              <View>
                <Text style={styles.taskLabel}>Completed</Text>
                <Text style={styles.taskCount}>12</Text>
                <Text style={styles.taskSub}>Tasks</Text>
              </View>
           </View>

           <View style={[styles.taskCard, styles.pendingCard]}>
              <View style={styles.taskIconWrapper}>
                 <OrangeCleaningIcon size={48} />
              </View>
              <View>
                <Text style={styles.taskLabel}>Pending</Text>
                <Text style={styles.taskCount}>8</Text>
                <Text style={styles.taskSub}>Tasks</Text>
              </View>
           </View>
        </View>

        {/* --- RECENT ALERTS --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.alertsList}>
          <View style={styles.alertItem}>
             <View style={[styles.alertDot, {backgroundColor: '#ef4444'}]} />
             <Text style={styles.alertText}>BIN-1047 is full</Text>
             <Text style={styles.alertTime}>10:15 AM</Text>
          </View>
          <View style={styles.alertItem}>
             <View style={[styles.alertDot, {backgroundColor: '#f59e0b'}]} />
             <Text style={styles.alertText}>BIN-1055 needs attention</Text>
             <Text style={styles.alertTime}>09:50 AM</Text>
          </View>
          <View style={styles.alertItem}>
             <View style={[styles.alertDot, {backgroundColor: '#3b82f6'}]} />
             <Text style={styles.alertText}>Route change on Main St</Text>
             <Text style={styles.alertTime}>09:30 AM</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fcfcfc' },
  scrollContent: { paddingBottom: 100 },
  welcomeSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#1c1c1c' },
  welcomeSubtext: { fontSize: 14, color: '#717171', marginTop: 4 },
  weatherCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  weatherLeft: { flexDirection: 'row', alignItems: 'center' },
  weatherIconContainer: { position: 'relative', marginRight: 15 },
  cloudOverlay: { position: 'absolute', bottom: -5, right: -5 },
  tempContainer: { justifyContent: 'center' },
  temperature: { fontSize: 34, fontWeight: 'bold', color: '#1c1c1c' },
  tempUnit: { fontSize: 20, color: '#717171' },
  weatherCondition: { fontSize: 14, color: '#717171', fontWeight: '500' },
  weatherRight: { justifyContent: 'center' },
  weatherDetail: { fontSize: 12, color: '#717171', marginBottom: 2 },
  weatherDetailVal: { fontWeight: 'bold', color: '#4a4a4a' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1c1c1c' },
  dateText: { fontSize: 13, color: '#717171' },
  scheduleCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  scheduleInfo: {
    flex: 3,
  },
  nextStopLabel: { fontSize: 14, color: PRIMARY_GREEN, fontWeight: 'bold', marginBottom: 8 },
  binId: { fontSize: 18, fontWeight: 'bold', color: '#1c1c1c' },
  locationText: { fontSize: 14, color: '#717171', marginTop: 4 },
  timeText: { fontSize: 14, color: '#1c1c1c', fontWeight: 'bold', marginTop: 6 },
  truckContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  truckImage: {
    width: 140,
    height: 100,
    resizeMode: 'contain',
  },
  taskContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  taskCard: {
    width: '48%',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  completedCard: { backgroundColor: '#f0fdf4', borderColor: '#dcfce7' },
  pendingCard: { backgroundColor: '#fffbeb', borderColor: '#fef3c7' },
  taskIconWrapper: { marginRight: 12 },
  taskLabel: { fontSize: 12, color: '#4a4a4a', fontWeight: '600' },
  taskCount: { fontSize: 22, fontWeight: 'bold', color: '#1c1c1c' },
  taskSub: { fontSize: 10, color: '#717171' },
  viewAllText: { fontSize: 14, color: PRIMARY_GREEN, fontWeight: 'bold' },
  alertsList: { paddingHorizontal: 20, marginTop: 5 },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  alertDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  alertText: { flex: 1, fontSize: 15, color: '#1c1c1c', fontWeight: '500' },
  alertTime: { fontSize: 12, color: '#717171' },
});

export default Dashboard;
