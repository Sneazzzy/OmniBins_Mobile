import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  ScrollView, useWindowDimensions, Modal
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Svg, { Path, Circle, Line } from 'react-native-svg';

// Mocking MaterialCommunityIcons using react-native-svg
const MaterialCommunityIcons = ({ name, size = 24, color = 'black' }) => {
  switch (name) {
    case 'trash-can':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <Line x1="10" y1="11" x2="10" y2="17" />
          <Line x1="14" y1="11" x2="14" y2="17" />
        </Svg>
      );
    case 'close':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </Svg>
      );
    case 'map-marker':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </Svg>
      );
    case 'clock-outline':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="12" r="10" />
          <Path d="M12 6v6l4 2" />
        </Svg>
      );
    case 'directions':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M9 10l-5 5 5 5" />
          <Path d="M20 4v7a4 4 0 0 1-4 4H4" />
        </Svg>
      );
    case 'arrow-down':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </Svg>
      );
    case 'road':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Line x1="8" y1="3" x2="8" y2="21" />
          <Line x1="16" y1="3" x2="16" y2="21" />
        </Svg>
      );
    case 'map-marker-check':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <Path d="M9 10l2 2 4-4" />
        </Svg>
      );
    case 'routes':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="6" cy="19" r="3" />
          <Circle cx="18" cy="5" r="3" />
          <Path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
        </Svg>
      );
    case 'navigation':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 11l19-9-9 19-2-8-8-2z" />
        </Svg>
      );
    case 'crosshairs-gps':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="12" r="7" />
          <Line x1="12" y1="2" x2="12" y2="5" />
          <Line x1="12" y1="19" x2="12" y2="22" />
          <Line x1="2" y1="12" x2="5" y2="12" />
          <Line x1="19" y1="12" x2="22" y2="12" />
        </Svg>
      );
    default:
      return <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size / 2 }} />;
  }
};

const binLocations = [
  {
    id: 'BIN-01',
    title: 'BIN-01',
    coordinate: { latitude: 10.2962, longitude: 123.8840 },
    address: 'Public Market, Argao',
    status: 'Normal',
    capacity: '15%',
    lastCollection: '8 hours ago',
  },
  {
    id: 'BIN-02',
    title: 'BIN-02',
    coordinate: { latitude: 10.2979, longitude: 123.8803 },
    address: 'Tulic, Argao',
    status: 'Near Full',
    capacity: '75%',
    lastCollection: '2 hours ago',
  },
  {
    id: 'BIN-03',
    title: 'BIN-03',
    coordinate: { latitude: 10.2988, longitude: 123.8852 },
    address: 'Brgy. Tugas, Argao',
    status: 'Full',
    capacity: '100%',
    lastCollection: '30 minutes ago',
  },
  {
    id: 'BIN-04',
    title: 'BIN-04',
    coordinate: { latitude: 10.2948, longitude: 123.8808 },
    address: 'Brgy. Hugpa, Argao',
    status: 'Normal',
    capacity: '25%',
    lastCollection: '5 hours ago',
  },
  {
    id: 'BIN-05',
    title: 'BIN-05',
    coordinate: { latitude: 10.2956, longitude: 123.8829 },
    address: 'Public Market Extension, Argao',
    status: 'Near Full',
    capacity: '80%',
    lastCollection: '1 hour ago',
  },
];

const binRoutes = {
  'BIN-01': [
    { latitude: 10.2960, longitude: 123.8835 },
    { latitude: 10.2961, longitude: 123.8838 },
  ],
  'BIN-02': [
    { latitude: 10.2965, longitude: 123.8840 },
    { latitude: 10.2972, longitude: 123.8820 },
    { latitude: 10.2977, longitude: 123.8810 },
  ],
  'BIN-03': [
    { latitude: 10.2968, longitude: 123.8845 },
    { latitude: 10.2974, longitude: 123.8850 },
    { latitude: 10.2980, longitude: 123.8851 },
  ],
  'BIN-04': [
    { latitude: 10.2955, longitude: 123.8825 },
    { latitude: 10.2950, longitude: 123.8815 },
    { latitude: 10.2949, longitude: 123.8810 },
  ],
  'BIN-05': [
    { latitude: 10.2960, longitude: 123.8830 },
    { latitude: 10.2958, longitude: 123.8832 },
  ],
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Normal':         return '#10B981';
    case 'Near Full':      return '#F59E0B';
    case 'Full':           return '#EF4444';
    case 'Not Full':       return '#22c55e';
    case 'Need Attention': return '#f59e0b';
    case 'In Progress':    return '#3b82f6';
    case 'Skipped':        return '#6b7280';
    default:               return '#6B7280';
  }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

const calculateEstimatedTime = (distanceKm) => {
  const avgSpeed = 30;
  const hours = Math.floor(distanceKm / avgSpeed);
  const minutes = Math.round(((distanceKm % avgSpeed) / avgSpeed) * 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const legendItems = [
  { label: 'Full',           color: '#ef4444' },
  { label: 'Not Full',       color: '#22c55e' },
  { label: 'Need Attention', color: '#f59e0b' },
  { label: 'In Progress',    color: '#3b82f6' },
  { label: 'Skipped',        color: '#6b7280' },
];

export default function MapPage({
  location = { latitude: 10.2962, longitude: 123.8840 },
  route = undefined,
  bins = [],
}) {
  const { width, height } = useWindowDimensions();
  const [selectedBin, setSelectedBin] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    if (route?.params?.selectedBinId) {
      const selected = (bins.length ? bins : binLocations).find(
        (bin) => bin.id === route.params.selectedBinId
      );
      if (selected) {
        setSelectedBin(selected);
        setShowDetails(true);
      }
    }
  }, [route?.params?.selectedBinId, bins]);

  const responsiveStyles = {
    paddingLarge: width < 360 ? 14 : 20,
    fontSize15: width < 360 ? 13 : 15,
    detailsPanelHeight: Math.min(height * 0.6, 600),
  };

  const mapData = bins.length ? bins : binLocations;

  const routeDistance = selectedBin
    ? calculateDistance(
        location.latitude,
        location.longitude,
        selectedBin.coordinate.latitude,
        selectedBin.coordinate.longitude
      )
    : null;

  const routeCoordinates = selectedBin
    ? [location, ...(binRoutes[selectedBin.id] || []), selectedBin.coordinate]
    : [];

  const region = selectedBin
    ? {
        latitude: (location.latitude + selectedBin.coordinate.latitude) / 2,
        longitude: (location.longitude + selectedBin.coordinate.longitude) / 2,
        latitudeDelta: Math.max(0.04, Math.abs(location.latitude - selectedBin.coordinate.latitude) * 2.5),
        longitudeDelta: Math.max(0.05, Math.abs(location.longitude - selectedBin.coordinate.longitude) * 2.5),
      }
    : {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      };

  return (
    <View style={styles.container}>

      {/* ── MAP ── */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        loadingEnabled={true}
      >

        {/* Bin Markers */}
        {mapData.map((bin) => (
          <Marker
            key={bin.id}
            coordinate={bin.coordinate}
            title={bin.id}
            onPress={() => {
              setSelectedBin(bin);
              setShowDetails(true);
            }}
          >
            <View style={[styles.markerContainer, { backgroundColor: getStatusColor(bin.status) }]}>
              <MaterialCommunityIcons name="trash-can" size={18} color="#FFFFFF" />
            </View>
          </Marker>
        ))}

        {/* Route Polyline */}
        {selectedBin && routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#2563EB"
            strokeWidth={4}
            lineDashPattern={[6, 4]}
          />
        )}

        {/* User Location Marker */}
        <Marker coordinate={location} title="Your Location">
          <View style={styles.gpsPulse}>
            <View style={styles.gpsMarker}>
              <MaterialCommunityIcons name="crosshairs-gps" size={16} color="#FFFFFF" />
            </View>
          </View>
        </Marker>

      </MapView>

      {/* ── LEGEND OVERLAY ── */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Bin Status</Text>
        {legendItems.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.statusDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* ── BIN DETAILS PANEL ── */}
      {selectedBin && showDetails && (
        <View
          style={[
            styles.detailsPanel,
            {
              maxHeight: responsiveStyles.detailsPanelHeight,
              paddingHorizontal: responsiveStyles.paddingLarge,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setShowDetails(false)}
            style={styles.closeButton}
          >
            <MaterialCommunityIcons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>

          <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>

            {/* Header */}
            <View style={styles.detailsHeader}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedBin.status) }]}>
                <Text style={styles.statusText}>{selectedBin.status}</Text>
              </View>
              <Text style={styles.binIdText}>{selectedBin.id}</Text>
            </View>

            {/* Address */}
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#6B7280" />
              <Text style={[styles.detailLabel, { fontSize: responsiveStyles.fontSize15 }]}>
                {selectedBin.address}
              </Text>
            </View>

            {/* Capacity */}
            <View style={styles.detailRow}>
              <Text style={styles.detailHeading}>Capacity</Text>
            </View>
            <Text style={[styles.detailValue, { fontSize: responsiveStyles.fontSize15 }]}>
              {selectedBin.capacity}
            </Text>

            {/* Distance */}
            <View style={[styles.detailRow, { justifyContent: 'space-between' }]}>
              <Text style={styles.detailHeading}>Distance</Text>
              <Text style={[styles.detailValue, { fontSize: responsiveStyles.fontSize15 }]}>
                {routeDistance} km
              </Text>
            </View>

            {/* Last Collection */}
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="clock-outline" size={14} color="#6B7280" />
              <Text style={styles.lastCollectionText}>
                Last collection: {selectedBin.lastCollection}
              </Text>
            </View>

            {/* Get Directions Button */}
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={() => setShowNavigation(true)}
            >
              <MaterialCommunityIcons name="directions" size={16} color="#FFFFFF" />
              <Text style={styles.directionsButtonText}>Get Directions</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      )}

      {/* ── NAVIGATION MODAL ── */}
      <Modal
        visible={showNavigation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNavigation(false)}
      >
        <View style={styles.navigationContainer}>

          {/* Nav Header */}
          <View style={styles.navigationHeader}>
            <TouchableOpacity
              onPress={() => setShowNavigation(false)}
              style={styles.navigationCloseButton}
            >
              <MaterialCommunityIcons name="arrow-down" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.navigationTitle}>{selectedBin?.id}</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Nav Map */}
          <View style={styles.navigationMap}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.navigationMapInner}
              region={region}
              loadingEnabled={true}
            >

              {selectedBin && routeCoordinates.length > 1 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor="#2563EB"
                  strokeWidth={5}
                  lineDashPattern={[6, 4]}
                />
              )}

              {mapData.map((bin) => (
                <Marker key={bin.id} coordinate={bin.coordinate}>
                  <View style={[styles.markerContainer, { backgroundColor: getStatusColor(bin.status) }]}>
                    <MaterialCommunityIcons name="trash-can" size={18} color="#FFFFFF" />
                  </View>
                </Marker>
              ))}

              <Marker coordinate={location} title="Your Location">
                <View style={styles.gpsPulse}>
                  <View style={styles.gpsMarker}>
                    <MaterialCommunityIcons name="crosshairs-gps" size={16} color="#FFFFFF" />
                  </View>
                </View>
              </Marker>

            </MapView>
          </View>

          {/* Nav Info */}
          <View style={styles.navigationInfo}>
            <View style={styles.navigationStats}>

              <View style={styles.navigationStatBox}>
                <MaterialCommunityIcons name="road" size={20} color="#2563EB" />
                <Text style={styles.navigationStatLabel}>Distance</Text>
                <Text style={styles.navigationStatValue}>{routeDistance} km</Text>
              </View>

              <View style={styles.navigationStatBox}>
                <MaterialCommunityIcons name="clock-outline" size={20} color="#2563EB" />
                <Text style={styles.navigationStatLabel}>Est. Time</Text>
                <Text style={styles.navigationStatValue}>
                  {calculateEstimatedTime(parseFloat(routeDistance))}
                </Text>
              </View>

              <View style={styles.navigationStatBox}>
                <MaterialCommunityIcons name="map-marker-check" size={20} color="#2563EB" />
                <Text style={styles.navigationStatLabel}>Destination</Text>
                <Text style={styles.navigationStatValue}>{selectedBin?.id}</Text>
              </View>

            </View>

            <TouchableOpacity style={styles.navigationStartButton}>
              <MaterialCommunityIcons name="navigation" size={18} color="#FFFFFF" />
              <Text style={styles.navigationStartButtonText}>Start Navigation</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // Legend
  legendContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    width: 160,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500',
  },

  // Markers
  markerContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  gpsPulse: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  gpsMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Details Panel
  detailsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  detailsContent: {
    paddingRight: 10,
  },
  detailsHeader: {
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  binIdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  detailLabel: {
    color: '#6B7280',
    marginLeft: 8,
  },
  detailHeading: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 14,
  },
  detailValue: {
    color: '#4B5563',
    marginBottom: 8,
  },
  lastCollectionText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  directionsButton: {
    backgroundColor: '#00a63e',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  directionsButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginLeft: 8,
  },

  // Navigation Modal
  navigationContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
  },
  navigationCloseButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  navigationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  navigationMap: {
    flex: 1,
  },
  navigationMapInner: {
    flex: 1,
  },
  navigationInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navigationStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  navigationStatBox: {
    alignItems: 'center',
  },
  navigationStatLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 4,
  },
  navigationStatValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 2,
  },
  navigationStartButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  navigationStartButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});