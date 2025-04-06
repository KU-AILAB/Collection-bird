import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaCrow } from 'react-icons/fa';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

const birdIcon = L.divIcon({
  html: ReactDOMServer.renderToString(<FaCrow size={30} color="purple" />),
  className: '', // default marker stilini o‘chirish
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});


const Map = () => {
  return (
    <MapContainer center={[41.3111, 69.2797]} zoom={13} style={{ height: '210px', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <Marker position={[41.3111, 69.2797]} icon={birdIcon}>
      <Popup>
        Bu yerda <b>qushcha</b> bor 🐦
      </Popup>
    </Marker>
  </MapContainer>
  );
};

export default Map;
