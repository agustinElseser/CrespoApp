import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleClick = e => {
    setSelectedLocation(e.latlng)
  }
  const position = [51.505, -0.09]

  return (
    //@ts-ignore
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>
            Ubicación seleccionada:
            <pre>{JSON.stringify(selectedLocation, null, 2)}</pre>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default MapComponent
