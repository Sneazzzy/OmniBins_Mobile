import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import { CalendarIcon, SimpleBinIcon } from '../Components/Icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRIMARY_GREEN = '#00a63e';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SchedulePage = () => {
  // HOOKS - ALL AT THE TOP, UNCONDITIONAL
  const [selectedDate, setSelectedDate] = useState('Aug 17, 2025');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(7); // 0-indexed
  const [viewDay, setViewDay] = useState(17);
  const [viewYear, setViewYear] = useState(2025);
  const [currentView, setCurrentView] = useState('grid'); // 'grid', 'months', 'years'
  const [yearPageStart, setYearPageRange] = useState(2020);

  const scheduleData = [
    { id: 'BIN-01', location: 'Public Market, Argao', time: '10:30 AM', status: 'Pending' },
    { id: 'BIN-02', location: 'Public Market, Argao', time: '10:30 AM', status: 'Pending' },
    { id: 'BIN-04', location: 'Public Market, Argao', time: '10:30 AM', status: 'Pending' },
    { id: 'BIN-03', location: 'Public Market, Argao', time: '10:30 AM', status: 'Pending' },
  ];

  const toggleCalendar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCalendarOpen(!isCalendarOpen);
    setCurrentView('grid');
  };

  const navigateView = (delta) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (currentView === 'grid') {
      let newMonth = viewMonth + delta;
      let newYear = viewYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      setViewMonth(newMonth);
      setViewYear(newYear);
    } else if (currentView === 'months') {
      setViewYear(viewYear + delta);
    } else if (currentView === 'years') {
      setYearPageRange(yearPageStart + (delta * 12));
    }
  };

  const selectDayAndClose = (day) => {
    setViewDay(day);
    const dateString = `${MONTHS[viewMonth].substring(0, 3)} ${day}, ${viewYear}`;
    setSelectedDate(dateString);
    setIsCalendarOpen(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderCalendarBody = () => {
    if (currentView === 'months') {
      return (
        <View style={[styles.gridContainer, { paddingTop: 15 }]}>
          {MONTHS.map((m, idx) => (
            <TouchableOpacity key={m} style={styles.gridItemMonth} onPress={() => {
              setViewMonth(idx);
              setCurrentView('grid');
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }}>
              <View style={[styles.gridCell, viewMonth === idx && styles.activeGridCell]}>
                <Text style={[styles.gridText, viewMonth === idx && styles.activeGridText]}>{m.substring(0, 3)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (currentView === 'years') {
      const yearArr = Array.from({ length: 12 }, (_, i) => yearPageStart + i);
      return (
        <View style={[styles.gridContainer, { paddingTop: 15 }]}>
          {yearArr.map((y) => (
            <TouchableOpacity key={y} style={styles.gridItemYear} onPress={() => {
              setViewYear(y);
              setCurrentView('grid');
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }}>
              <View style={[styles.gridCell, viewYear === y && styles.activeGridCell]}>
                <Text style={[styles.gridText, viewYear === y && styles.activeGridText]}>{y}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    // Default: 'grid' (The Day Picker)
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.dayNamesRow}>
          {dayNames.map(name => <Text key={name} style={styles.dayNameLabel}>{name}</Text>)}
        </View>
        <View style={styles.daysGrid}>
          {emptySlots.map(i => <View key={`empty-${i}`} style={styles.emptyDay} />)}
          {daysArr.map(day => {
            const isSelected = selectedDate === `${MONTHS[viewMonth].substring(0, 3)} ${day}, ${viewYear}`;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayCell, isSelected && styles.selectedDayCell]}
                onPress={() => selectDayAndClose(day)}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isCalendarOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setIsCalendarOpen(false)}
        />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!isCalendarOpen}
      >
        <View style={[styles.searchSection, { zIndex: isCalendarOpen ? 1000 : 1 }]}>
          <Text style={styles.searchLabel}>Search:</Text>
          <View style={styles.dateInputContainer}>
            <TouchableOpacity
              style={styles.dateInputWrapper}
              onPress={toggleCalendar}
              activeOpacity={0.8}
            >
              <Text style={styles.dateText}>{selectedDate}</Text>
              <CalendarIcon size={20} color={isCalendarOpen ? PRIMARY_GREEN : '#636e72'} />
            </TouchableOpacity>

            {isCalendarOpen && (
              <View style={styles.calendarContainer}>
                {/* HEADER */}
                <View style={styles.calHeader}>
                  <View style={styles.calDropdowns}>
                    {/* MONTH SELECTION */}
                    <TouchableOpacity
                      style={[styles.headerBox, currentView === 'months' && styles.activeHeaderBox]}
                      onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setCurrentView(currentView === 'months' ? 'grid' : 'months');
                      }}
                    >
                      <Text style={styles.headerSelText}>{MONTHS[viewMonth]}</Text>
                      <Text style={styles.smallChevron}>▾</Text>
                    </TouchableOpacity>

                    {/* DAY SELECTION (Main Grid) */}
                    <TouchableOpacity
                      style={[styles.headerBox, { marginLeft: 6 }, currentView === 'grid' && styles.activeHeaderBox]}
                      onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setCurrentView('grid');
                      }}
                    >
                      <Text style={styles.headerSelText}>{viewDay}</Text>
                      <Text style={styles.smallChevron}>▾</Text>
                    </TouchableOpacity>

                    {/* YEAR SELECTION */}
                    <TouchableOpacity
                      style={[styles.headerBox, { marginLeft: 6 }, currentView === 'years' && styles.activeHeaderBox]}
                      onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setCurrentView(currentView === 'years' ? 'grid' : 'years');
                        setYearPageRange(Math.floor(viewYear / 12) * 12);
                      }}
                    >
                      <Text style={styles.headerSelText}>{viewYear}</Text>
                      <Text style={styles.smallChevron}>▾</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.calArrows}>
                    <TouchableOpacity style={styles.arrowBtn} onPress={() => navigateView(-1)}>
                      <Text style={styles.arrowText}>‹</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.arrowBtn, { marginLeft: 10 }]} onPress={() => navigateView(1)}>
                      <Text style={styles.arrowText}>›</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* CONTENT */}
                <View style={styles.calendarBody}>
                  {renderCalendarBody()}
                </View>
              </View>
            )}
          </View>
        </View>

        <View pointerEvents={isCalendarOpen ? 'none' : 'auto'}>
          <View style={styles.tableHeader}>
            <View style={{ flex: 2.5 }}><Text style={styles.headerCol}>Bin #</Text></View>
            <View style={{ flex: 0.5, alignItems: 'center' }}><Text style={styles.headerCol}>Time</Text></View>
            <View style={{ flex: 1.5, alignItems: 'flex-end' }}><Text style={styles.headerCol}>Status</Text></View>
          </View>

          {scheduleData.map((item, index) => (
            <View key={index} style={styles.scheduleItem}>
              <View style={styles.binInfoContainer}>
                <SimpleBinIcon size={32} color={PRIMARY_GREEN} />
                <View style={styles.binTextContainer}>
                  <Text style={styles.binId}>{item.id}</Text>
                  <Text style={styles.binLocation} numberOfLines={1}>{item.location}</Text>
                </View>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.binTime}>{item.time}</Text>
              </View>
              <View style={styles.statusContainer}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)', zIndex: 999 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  searchSection: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20, position: 'relative' },
  searchLabel: { fontSize: 18, fontWeight: 'bold', color: '#2d3436', marginRight: 10 },
  dateInputContainer: { flex: 1, position: 'relative' },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  dateText: { color: '#2d3436', fontSize: 16 },

  calendarContainer: {
    position: 'absolute',
    top: '110%',
    left: -60,
    width: SCREEN_WIDTH - 40,
    height: 380,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  calHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  calDropdowns: { flexDirection: 'row', alignItems: 'center' },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  activeHeaderBox: {
    borderColor: PRIMARY_GREEN,
    backgroundColor: '#ffffff'
  },
  headerSelText: { fontSize: 14, fontWeight: 'bold', color: '#1c1c1c' },
  smallChevron: { fontSize: 10, color: '#717171', marginLeft: 4, marginTop: 2 },

  calArrows: { flexDirection: 'row', alignItems: 'center' },
  arrowBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  arrowText: { fontSize: 24, color: '#1c1c1c', fontWeight: '400', marginTop: -4 },

  calendarBody: { flex: 1 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 5 },
  gridItemMonth: { width: '31%', marginBottom: 20 },
  gridItemYear: { width: '31%', marginBottom: 20 },
  gridCell: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  activeGridCell: {
    backgroundColor: PRIMARY_GREEN,
    borderColor: PRIMARY_GREEN,
  },
  activeGridText: { color: '#ffffff', fontWeight: 'bold' },

  dayNamesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dayNameLabel: { width: '14.28%', textAlign: 'center', color: '#b2bec3', fontSize: 12, fontWeight: '500' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  emptyDay: { width: '14.28%', height: 40 },
  dayText: { fontSize: 16, color: '#2d3436', fontWeight: '500' },
  selectedDayCell: { backgroundColor: PRIMARY_GREEN, borderRadius:12 },
  selectedDayText: { color: '#ffffff', fontWeight: 'bold' },

  tableHeader: { flexDirection: 'row', marginBottom: 15, paddingHorizontal: 15 },
  headerCol: { fontSize: 16, fontWeight: 'bold', color: '#1c1c1c' },
  scheduleItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 15, marginBottom: 12,
    borderWidth: 1, borderColor: '#f0f0f0', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8,
  },
  binInfoContainer: { flex: 2.5, flexDirection: 'row', alignItems: 'center' },
  binTextContainer: { marginLeft: 12, flex: 1 },
  binId: { fontSize: 16, fontWeight: 'bold', color: '#1c1c1c' },
  binLocation: { fontSize: 12, color: '#717171', marginTop: 2 },
  timeContainer: { flex: 1.5, alignItems: 'center' },
  binTime: { fontSize: 14, color: '#1c1c1c', fontWeight: '500' },
  statusContainer: { flex: 1.2, alignItems: 'flex-end' },
  statusBadge: { backgroundColor: '#fffbeb', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#fef3c7' },
  statusText: { color: '#b45309', fontSize: 12, fontWeight: 'bold' },
});

export default SchedulePage;
