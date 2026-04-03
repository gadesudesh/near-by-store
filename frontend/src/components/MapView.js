import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Blue marker for shops
const shopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Red marker for user location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Green marker for selected/destination shop
const selectedShopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ==========================================
// YOUR GEOAPIFY API KEY
// ==========================================
const GEOAPIFY_KEY = '1fdc3523200949f58970d375dc9253e4';

// Component to recenter map
function RecenterMap({ lat, lng, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], zoom || 14);
    }
  }, [lat, lng, zoom, map]);
  return null;
}

// Component to fit map bounds to show route
function FitBounds({ bounds }) {
  const map = useMap();
  React.useEffect(() => {
    if (bounds && bounds.length >= 2) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

// ==========================================
// MAIN MAP COMPONENT
// ==========================================
const MapView = ({
  center,
  shops = [],
  userLocation,
  onShopClick,
  height = '400px',
  enableRouting = false,
}) => {
  const mapCenter = center || userLocation || { lat: 28.6280, lng: 77.2190 };

  // Routing state
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [fitBounds, setFitBounds] = useState(null);

  // ==========================================
  // GEOAPIFY ROUTING API CALL
  // ==========================================
  const fetchRoute = useCallback(async (fromLat, fromLng, toLat, toLng) => {
    setRouteLoading(true);
    setRouteError(null);
    setRouteCoords([]);
    setRouteInfo(null);

    try {
      // Geoapify Routing API
      // Docs: https://apidocs.geoapify.com/docs/routing/
      const url = `https://api.geoapify.com/v1/routing?waypoints=${fromLat},${fromLng}|${toLat},${toLng}&mode=drive&apiKey=${GEOAPIFY_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Routing API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const geometry = feature.geometry;

        // Geoapify returns coordinates as [lng, lat] — we need [lat, lng] for Leaflet
        let coordinates = [];

        if (geometry.type === 'MultiLineString') {
          // MultiLineString: array of arrays of [lng, lat]
          geometry.coordinates.forEach((line) => {
            line.forEach((coord) => {
              coordinates.push([coord[1], coord[0]]); // [lat, lng]
            });
          });
        } else if (geometry.type === 'LineString') {
          // LineString: array of [lng, lat]
          geometry.coordinates.forEach((coord) => {
            coordinates.push([coord[1], coord[0]]); // [lat, lng]
          });
        }

        // Get route distance and time
        const properties = feature.properties;
        const distanceKm = (properties.distance / 1000).toFixed(1);
        const timeMinutes = Math.round(properties.time / 60);

        setRouteCoords(coordinates);
        setRouteInfo({
          distance: distanceKm,
          time: timeMinutes,
        });

        // Fit map to show full route
        if (coordinates.length > 0) {
          setFitBounds([
            [fromLat, fromLng],
            [toLat, toLng],
          ]);
        }
      } else {
        setRouteError('No route found between these locations');
      }
    } catch (error) {
      console.error('Routing error:', error);
      setRouteError('Failed to fetch route. Please try again.');
    } finally {
      setRouteLoading(false);
    }
  }, []);

  // ==========================================
  // HANDLE SHOP MARKER CLICK
  // ==========================================
  const handleShopMarkerClick = (shop) => {
    // Always call the parent onShopClick if provided (for navigation)
    if (onShopClick) {
      onShopClick(shop._id);
    }

    // If routing is enabled and we have user location, fetch route
    if (enableRouting && userLocation) {
      const shopLat = shop.location.coordinates[1];
      const shopLng = shop.location.coordinates[0];

      setSelectedShopId(shop._id);
      fetchRoute(userLocation.lat, userLocation.lng, shopLat, shopLng);
    }
  };

  // ==========================================
  // CLEAR ROUTE
  // ==========================================
  const clearRoute = () => {
    setRouteCoords([]);
    setRouteInfo(null);
    setRouteError(null);
    setSelectedShopId(null);
    setFitBounds(null);
  };

  return (
    <div className="relative">
      {/* Route Info Bar */}
      {routeInfo && (
        <div className="absolute top-3 left-3 right-3 z-[1000] bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">🚗</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{routeInfo.distance} km</p>
                <p className="text-xs text-gray-500">distance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm">⏱️</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {routeInfo.time < 60
                    ? `${routeInfo.time} min`
                    : `${Math.floor(routeInfo.time / 60)}h ${routeInfo.time % 60}m`}
                </p>
                <p className="text-xs text-gray-500">drive time</p>
              </div>
            </div>
          </div>
          <button
            onClick={clearRoute}
            className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 font-medium transition-colors"
          >
            ✕ Clear
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {routeLoading && (
        <div className="absolute top-3 left-3 right-3 z-[1000] bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Finding best route...</span>
        </div>
      )}

      {/* Error message */}
      {routeError && (
        <div className="absolute top-3 left-3 right-3 z-[1000] bg-red-50 rounded-xl shadow-lg border border-red-200 p-3 flex items-center justify-between">
          <span className="text-sm text-red-600">⚠️ {routeError}</span>
          <button
            onClick={() => setRouteError(null)}
            className="text-red-400 hover:text-red-600 text-xs font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Routing hint */}
      {enableRouting && !routeInfo && !routeLoading && !routeError && (
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 px-3 py-2">
          <p className="text-xs text-gray-500">💡 Click a shop marker to see the route</p>
        </div>
      )}

      {/* THE MAP */}
      <div
        style={{ height }}
        className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
      >
        <MapContainer
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          {/* GEOAPIFY MAP TILES */}
          <TileLayer
            attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_KEY}`}
          />

          {/* Recenter map */}
          <RecenterMap lat={mapCenter.lat} lng={mapCenter.lng} />

          {/* Fit bounds when route is shown */}
          {fitBounds && <FitBounds bounds={fitBounds} />}

          {/* User location marker (RED) */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>
                <div className="text-center">
                  <strong>📍 Your Location</strong>
                  <br />
                  <span style={{ fontSize: '11px', color: '#666' }}>
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Shop markers */}
          {shops.map((shop) => {
            const isSelected = selectedShopId === shop._id;

            return (
              <Marker
                key={shop._id}
                position={[
                  shop.location.coordinates[1],
                  shop.location.coordinates[0],
                ]}
                icon={isSelected ? selectedShopIcon : shopIcon}
                eventHandlers={{
                  click: () => handleShopMarkerClick(shop),
                }}
              >
                <Popup>
                  <div style={{ minWidth: '200px', maxWidth: '250px' }}>
                    {shop.image && (
                      <img
                        src={shop.image}
                        alt={shop.shopName}
                        style={{
                          width: '100%',
                          height: '90px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '8px',
                        }}
                      />
                    )}
                    <strong style={{ fontSize: '14px' }}>{shop.shopName}</strong>
                    <br />
                    <span style={{ fontSize: '12px', color: '#666' }}>{shop.address}</span>
                    {shop.distance !== undefined && (
                      <>
                        <br />
                        <span
                          style={{
                            color: '#2563eb',
                            fontWeight: 600,
                            fontSize: '12px',
                          }}
                        >
                          📍 {shop.distance} km away
                        </span>
                      </>
                    )}
                    {enableRouting && userLocation && (
                      <>
                        <br />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShopMarkerClick(shop);
                          }}
                          style={{
                            marginTop: '6px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                          }}
                        >
                          🚗 Get Directions
                        </button>
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* ROUTE POLYLINE */}
          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              pathOptions={{
                color: '#2563eb',
                weight: 5,
                opacity: 0.8,
                dashArray: null,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          )}

          {/* Route shadow (thicker, lighter line behind main route) */}
          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              pathOptions={{
                color: '#93c5fd',
                weight: 10,
                opacity: 0.4,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;